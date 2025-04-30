const { Boom } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const cron = require('node-cron');
const config = require('./utils/config');
const { handleAntiFeatures } = require('./handlers/antiFeatures');
const { handleCommand } = require('./handlers/commandHandler');

async function startBot() {
  const bot = Boom({
    sessionId: config.session.id,
    printQRInTerminal: config.session.options.printQRInTerminal,
    browser: config.session.browser,
    markOnlineOnConnect: config.session.options.markOnlineOnConnect
  });

  // Connection handlers
  bot.ev.on('connection.update', ({ connection, qr }) => {
    if (connection === 'open') {
      bot.sendPresenceUpdate(config.features.presence);
      console.log(`${config.session.browser[0]} is now ${config.features.presence}!`);
    }
    if (qr) qrcode.generate(qr, { small: true });
    if (connection === 'close') startBot().catch(console.error);
  });

  // Message handler
  bot.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const chat = await bot.getChatById(msg.key.remoteJid);
    const isGroup = chat.isGroup;
    const user = msg.key.participant || msg.key.remoteJid;

    if (config.features.autoRead) await bot.readMessages([msg.key]);
    
    await handleAntiFeatures(bot, msg, isGroup, user, config);
    
    const body = (msg.message.conversation || '').toLowerCase();
    if (body.startsWith(config.features.prefix)) {
      const [cmd, ...args] = body.slice(config.features.prefix.length).split(' ');
      handleCommand(bot, msg, cmd, args, isGroup, user, config);
    }
  });

  // Anti-call handler
  if (config.security.antiCall) {
    bot.ev.on('call', async (call) => {
      await bot.sendMessage(call.from, { text: '🚫 Calls are not allowed!' });
      await bot.rejectCall(call.id);
    });
  }

  console.log(`${config.session.browser[0]} initialized successfully!`);
}

// Validation
if (!config.session.id || !config.owner.number) {
  console.error('Missing required environment variables!');
  process.exit(1);
}

// Keep-alive and startup
cron.schedule('*/5 * * * *', () => {
  axios.get('https://api.heroku.com/apps')
    .then(() => console.log('Keep-alive ping sent'))
    .catch(() => console.log('Keep-alive ping failed'));
});

startBot().catch(err => {
  console.error('Bot startup error:', err);
  process.exit(1);
});
// Environment variables from your app.json
const {
  SESSION_ID,
  OWNER_NUMBER,
  PREFIX = '.',
  PRESENCE_MODE = '1',
  AUTO_READ = '1',
  ANTICALL = '1',
  ANTILINK = '1',
  ANTILINK_KICK = '2',
  ANTIBADWORD = '1',
  ANTIBADWORD_KICK = '2',
  ANTIDELETE = '1',
  ANTITAG = '1',
  ANTISTICKER = '1',
  ANTISTICKER_KICK = '2',
  ANTIBOT = '1',
  ANTIBOT_KICK = '1',
  BOT_NAME = '𝚂𝚃𝙰𝙽𝚈-𝚃𝚇𝚁-𝚉𝙼𝙳',
  ALIVE_IMG,
  LIVE_MSG,
  MODE = '1',
  BAD_WORDS_LIST = 'nude,sex,porn,fuck,bitch'
} = process.env

const badWords = BAD_WORDS_LIST.split(',').map(word => word.trim().toLowerCase())
const presenceStatus = ['typing', 'recording', 'online'][Number(PRESENCE_MODE) - 1] || 'typing'

async function startBot() {
  const bot = Boom({
    sessionId: SESSION_ID,
    printQRInTerminal: false,
    browser: [BOT_NAME, 'Chrome', '121.0.6167.160'],
    markOnlineOnConnect: true
  })

  // Presence Update
  bot.ev.on('connection.update', ({ connection }) => {
    if (connection === 'open') {
      bot.sendPresenceUpdate(presenceStatus)
      console.log(`${BOT_NAME} is now ${presenceStatus}!`)
    }
  })

  // QR Code Handler
  bot.ev.on('connection.update', (update) => {
    if (update.qr) qrcode.generate(update.qr, { small: true })
    if (update.connection === 'close') startBot().catch(console.error)
  })

  // Message Processing
  bot.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const chat = await bot.getChatById(msg.key.remoteJid)
    const isGroup = chat.isGroup
    const user = msg.key.participant || msg.key.remoteJid

    // Auto-read messages
    if (AUTO_READ === '1') {
      await bot.readMessages([msg.key])
    }

    // Anti Features
    await handleAntiFeatures(bot, msg, isGroup, user)

    // Command Handler
    const body = (msg.message.conversation || '').toLowerCase()
    if (body.startsWith(PREFIX)) {
      const [cmd, ...args] = body.slice(PREFIX.length).split(' ')
      handleCommand(bot, msg, cmd, args, isGroup, user)
    }
  })

  // Anti-Call Handler
  if (ANTICALL === '1') {
    bot.ev.on('call', async (call) => {
      await bot.sendMessage(call.from, { 
        text: `🚫 Calls are not allowed!` 
      })
      await bot.rejectCall(call.id)
    })
  }

  console.log(`${BOT_NAME} initialized successfully!`)
}

async function handleAntiFeatures(bot, msg, isGroup, user) {
  const message = msg.message
  const content = JSON.stringify(message).toLowerCase()

  // Anti Link
  if (ANTILINK === '1' && /https?:\/\/[^\s]+/gi.test(content)) {
    await bot.sendMessage(msg.key.remoteJid, {
      delete: msg.key
    })
    if (ANTILINK_KICK === '1' && isGroup) {
      await bot.groupParticipantsUpdate(msg.key.remoteJid, [user], 'remove')
    }
  }

  // Anti Bad Word
  if (ANTIBADWORD === '1' && badWords.some(word => content.includes(word))) {
    await bot.sendMessage(msg.key.remoteJid, {
      delete: msg.key
    })
    if (ANTIBADWORD_KICK === '1' && isGroup) {
      await bot.groupParticipantsUpdate(msg.key.remoteJid, [user], 'remove')
    }
  }

  // Anti Sticker
  if (ANTISTICKER === '1' && message.stickerMessage) {
    await bot.sendMessage(msg.key.remoteJid, {
      delete: msg.key
    })
    if (ANTISTICKER_KICK === '1' && isGroup) {
      await bot.groupParticipantsUpdate(msg.key.remoteJid, [user], 'remove')
    }
  }

  // Anti Delete
  if (ANTIDELETE === '1' && message.protocolMessage?.type === 7) {
    await bot.sendMessage(msg.key.remoteJid, {
      text: `⚠️ Message deletion detected!`
    })
  }
}

function handleCommand(bot, msg, cmd, args, isGroup, user) {
  const commands = {
    ping: async () => {
      const start = Date.now()
      await bot.sendMessage(msg.key.remoteJid, { text: 'Pong! 🏓' })
      const latency = Date.now() - start
      await bot.sendMessage(msg.key.remoteJid, {
        text: `⚡ Latency: ${latency}ms`
      })
    },

    help: async () => {
      const features = [
        `*${BOT_NAME} Features*`,
        `• Anti-spam System`,
        `• Auto-moderation`,
        `• Media Tools`,
        `• Downloaders`,
        `• Game System`,
        `• AI Features`
      ].join('\n')
      await bot.sendMessage(msg.key.remoteJid, { text: features })
    },

    owner: async () => {
      await bot.sendMessage(msg.key.remoteJid, {
        text: `👑 Owner: ${OWNER_NUMBER}`
      })
    }
  }

  if (commands[cmd]) commands[cmd]()
}

// Start bot with error handling
startBot().catch(err => {
  console.error('Bot startup error:', err)
  process.exit(1)
})

// Keep alive for Heroku
cron.schedule('*/5 * * * *', () => {
  axios.get('https://api.heroku.com/apps')
    .then(() => console.log('Keep-alive ping sent'))
    .catch(() => console.log('Keep-alive ping failed'))
})

// Validate required env variables
if (!SESSION_ID || !OWNER_NUMBER) {
  console.error('Missing required environment variables!')
  process.exit(1)
}
