const { delay } = require('@whiskeysockets/baileys');
const config = require('./config');

// Utility to format uptime
function formatUptime() {
    const seconds = Math.floor(process.uptime());
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
}

// Process incoming messages
async function processMessage(message, conn) {
    if (!message.message || message.key.fromMe) return null;
    
    const m = {
        key: message.key,
        sender: message.key.remoteJid,
        isGroup: message.key.remoteJid?.endsWith('@g.us'),
        body: '',
        mentionedJid: [],
        isCommand: false,
        command: '',
        args: []
    };

    // Extract message content
    if (message.message.conversation) {
        m.body = message.message.conversation.trim();
    } else if (message.message.extendedTextMessage) {
        m.body = message.message.extendedTextMessage.text?.trim() || '';
        m.mentionedJid = message.message.extendedTextMessage.contextInfo?.mentionedJid || [];
    }

    // Check for commands
    if (m.body.startsWith(config.PREFIX)) {
        const [cmd, ...args] = m.body.slice(config.PREFIX.length).split(/ +/);
        m.isCommand = true;
        m.command = cmd.toLowerCase();
        m.args = args;
    }

    return m;
}

// Security handlers
const security = {
    handleAntiLink: async (m, conn) => {
        if (!config.ANTILINK) return;
        const linkRegex = /https?:\/\/[^\s]+/gi;
        if (linkRegex.test(m.body)) {
            await conn.sendMessage(m.sender, { delete: m.key });
            await conn.sendMessage(m.sender, { 
                text: `⚠️ Links are not allowed here, @${m.sender.split('@')[0]}!`,
                mentions: [m.sender]
            });
        }
    },

    handleAntiBadWord: async (m, conn) => {
        if (!config.ANTIBADWORD) return;
        const badWords = config.BAD_WORDS || [];
        const found = badWords.some(word => 
            m.body.toLowerCase().includes(word.toLowerCase())
        );
        if (found) {
            await conn.sendMessage(m.sender, { delete: m.key });
            await conn.sendMessage(m.sender, {
                text: `🚫 Inappropriate language detected, @${m.sender.split('@')[0]}!`,
                mentions: [m.sender]
            });
        }
    },

    handleAntiTag: async (m, conn) => {
        if (!config.ANTITAG) return;
        const botJid = conn.user.id;
        if (m.mentionedJid.includes(botJid)) {
            await conn.sendMessage(m.sender, {
                text: `🔔 Please don't tag the bot, @${m.sender.split('@')[0]}!`,
                mentions: [m.sender]
            });
        }
    },

    handleAntiCall: async (call, conn) => {
        if (!config.ANTICALL) return;
        console.log(`📵 Blocking call from ${call.from}`);
        await conn.rejectCall(call.id, call.from);
        await conn.sendMessage(call.from, {
            text: `🚫 Bot calls disabled. Contact owner: ${config.OWNER_NUMBER}`
        });
    },

    handleAntiDelete: async (update, conn) => {
        if (!config.ANTIDELETE || update.update.messageStubType !== 0) return;
        
        try {
            const deletedMsg = await conn.store.loadMessage(
                update.key.remoteJid, 
                update.key.id
            );
            const user = update.key.fromMe ? 
                'You' : 
                `@${update.key.participant?.split('@')[0] || 'unknown'}`;
            
            let content = '';
            if (deletedMsg?.message?.conversation) {
                content = deletedMsg.message.conversation;
            } else if (deletedMsg?.message?.imageMessage?.caption) {
                content = deletedMsg.message.imageMessage.caption;
            } else {
                content = '[Media Message]';
            }
            
            await conn.sendMessage(update.key.remoteJid, {
                text: `⚠️ ${user} deleted a message:\n"${content}"`,
                mentions: [update.key.participant]
            });
        } catch (error) {
            console.error('Anti-Delete Error:', error);
        }
    }
};

// Presence management
const presence = {
    setPresence: (conn) => {
        conn.sendPresenceUpdate('available');
        setInterval(() => {
            conn.sendPresenceUpdate('available');
        }, 60000); // Refresh every minute
    }
};

// Command handlers
const commands = {
    execute: async (m, conn) => {
        const helpText = `
🛠️ *${config.BOT_NAME} Commands*
• ${config.PREFIX}ping - Check bot latency
• ${config.PREFIX}help - Show command list
• ${config.PREFIX}status - View bot status
• ${config.PREFIX}owner - Contact owner

🔒 *Active Security*
${config.ANTICALL ? '• Anti-Call 📵\n' : ''}\
${config.ANTIDELETE ? '• Anti-Delete 🗑️\n' : ''}\
${config.ANTILINK ? '• Anti-Link 🔗\n' : ''}\
${config.ANTITAG ? '• Anti-Tag 🏷️\n' : ''}\
${config.ANTIBADWORD ? '• Profanity Filter 🚫' : ''}
        `.trim();

        const statusText = `
🤖 *${config.BOT_NAME} Status*
⏳ Uptime: ${formatUptime()}
📡 Connection: Stable
🛡️ Security Features: 
${config.ANTICALL ? '• Call Blocking\n' : ''}\
${config.ANTIDELETE ? '• Delete Detection\n' : ''}\
${config.ANTILINK ? '• Link Prevention\n' : ''}\
${config.ANTITAG ? '• Tag Protection\n' : ''}\
${config.ANTIBADWORD ? '• Content Filter' : ''}
        `.trim();

        switch(m.command) {
            case 'ping':
                await conn.sendMessage(m.sender, { text: '🏓 Pong!' });
                break;

            case 'help':
                await conn.sendMessage(m.sender, { text: helpText });
                break;

            case 'status':
                await conn.sendMessage(m.sender, { text: statusText });
                break;

            case 'owner':
                await conn.sendMessage(m.sender, { 
                    text: `📞 Contact owner: ${config.OWNER_NUMBER}`,
                    mentions: [config.OWNER_NUMBER]
                });
                break;

            default:
                await conn.sendMessage(m.sender, {
                    text: `❌ Invalid command! Use ${config.PREFIX}help for assistance.`
                });
        }
    }
};

// Notify owner on startup
async function notifyOwner(conn) {
    if (config.OWNER_NUMBER) {
        await conn.sendMessage(config.OWNER_NUMBER, {
            text: `✅ *${config.BOT_NAME}* connected!\n🕒 ${new Date().toLocaleString()}`
        });
    }
}

// Reconnection handler
async function handleReconnect() {
    console.log('⏳ Attempting reconnect in 5 seconds...');
    await delay(5000);
}

module.exports = {
    processMessage,
    security,
    presence,
    commands,
    notifyOwner,
    handleReconnect
};
