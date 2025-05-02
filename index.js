const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  fetchLatestBaileysVersion,
  Browsers
} = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const P = require('pino');
const config = require('./config');
const { getBuffer, getGroupAdmins, runtime, sms, downloadMediaMessage } = require('./lib/functions');
const express = require("express");
const app = express();
const port = process.env.PORT || 9090;

// Initialize sessions directory
const sessionsDir = path.join(__dirname, 'sessions');
if (!fs.existsSync(sessionsDir)) {
  fs.mkdirSync(sessionsDir, { recursive: true });
}

// Session authentication
if (!fs.existsSync(path.join(sessionsDir, 'creds.json'))) {
  if (!config.SESSION_ID) {
    console.error('Please add your session ID to SESSION_ID in config!');
    process.exit(1);
  }
  
  try {
    const sessdata = config.SESSION_ID.replace(/'/g, '');
    const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
    filer.download((err, data) => {
      if (err) throw err;
      fs.writeFileSync(path.join(sessionsDir, 'creds.json'), data);
      console.log("Session downloaded successfully ✅");
    });
  } catch (e) {
    console.error('Session download failed:', e);
    process.exit(1);
  }
}

// WhatsApp connection
async function connectToWA() {
  console.log("Connecting to WhatsApp...");
  
  try {
    const { state, saveCreds } = await useMultiFileAuthState(sessionsDir);
    const { version } = await fetchLatestBaileysVersion();

    const conn = makeWASocket({
      logger: P({ level: 'silent' }),
      printQRInTerminal: true,
      browser: Browsers.macOS("Firefox"),
      auth: state,
      version
    });

    // Connection events
    conn.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;
      
      if (connection === 'close') {
        if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {
          console.log('Reconnecting...');
          setTimeout(connectToWA, 5000);
        }
      } else if (connection === 'open') {
        console.log('Successfully connected ✅');
        
        // Load plugins
        const pluginPath = path.join(__dirname, 'plugins');
        fs.readdirSync(pluginPath).forEach(file => {
          if (path.extname(file).toLowerCase() === '.js') {
            require(path.join(pluginPath, file));
          }
        });
        console.log('Plugins loaded successfully');

        // Send connection message
        const statusMessage = `
*${config.BOT_NAME} Connected Successfully!*

╭───━━━━───━━━━──┉┈⚆
│• Prefix: ${config.PREFIX}
│• Mode: ${config.MODE}
│• Version: 1.0
┗───━━━━───━━━━──┉┈⚆
        `.trim();

        await conn.sendMessage(
          conn.user.id, 
          { 
            image: { url: config.BANNER_URL || 'https://example.com/default-banner.jpg' },
            caption: statusMessage 
          }
        );
      }
    });

    // Creds update handler
    conn.ev.on('creds.update', saveCreds);

    // Message handling
    conn.ev.on('messages.upsert', async ({ messages }) => {
      const m = messages[0];
      if (!m.message) return;

      // Message processing logic
      const messageType = getContentType(m.message);
      const from = m.key.remoteJid;
      const isGroup = from.endsWith('@g.us');
      const sender = m.key.fromMe ? conn.user.id : m.key.participant || from;
      const senderNumber = sender.split('@')[0];
      const isOwner = config.OWNERS.includes(senderNumber);
      
      // Mark messages as read
      if (config.READ_MESSAGES) {
        await conn.readMessages([m.key]);
      }

      // Reaction handling
      if (config.AUTO_REACT && !m.key.fromMe) {
        const reactions = config.CUSTOM_REACT_EMOJIS 
          ? config.CUSTOM_REACT_EMOJIS.split(',') 
          : ['👍', '❤️', '🔥', '👀', '😄'];
        
        const reaction = reactions[Math.floor(Math.random() * reactions.length)];
        await conn.sendMessage(from, { react: { text: reaction, key: m.key }});
      }

      // Command handling
      const body = (m.message.conversation || m.message.extendedTextMessage?.text || '').trim();
      if (body.startsWith(config.PREFIX)) {
        const [cmd, ...args] = body.slice(config.PREFIX.length).split(' ');
        const commandHandler = require('./command').commands.find(c => 
          c.name === cmd || (c.aliases && c.aliases.includes(cmd))
        );

        if (commandHandler) {
          try {
            await commandHandler.execute({
              conn,
              m,
              args,
              isGroup,
              isOwner,
              sender,
              senderNumber
            });
          } catch (e) {
            console.error('Command error:', e);
            await conn.sendMessage(from, { 
              text: `Error executing command: ${e.message}`
            });
          }
        }
      }
    });

  } catch (error) {
    console.error('Connection error:', error);
    setTimeout(connectToWA, 10000);
  }
}

// Web server
app.get("/", (req, res) => res.send(`${config.BOT_NAME} is running ✅`));
app.listen(port, () => console.log(`Server running on port ${port}`));

// Start WhatsApp connection
setTimeout(connectToWA, 2000);
