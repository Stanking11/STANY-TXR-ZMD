const { delay } = require('@whiskeysockets/baileys');
const fs = require('fs-extra');
const moment = require('moment');
const config = require('./config');

module.exports = {
    // Message processing utilities
    processMessage: async (m, conn) => {
        try {
            const content = JSON.stringify(m.message);
            const isCommand = content.startsWith(config.PREFIX);
            const isGroup = m.key.remoteJid.endsWith('@g.us');
            const sender = m.key.participant || m.key.remoteJid;

            return {
                body: content,
                command: isCommand ? content.split(' ')[0].slice(config.PREFIX.length) : null,
                args: isCommand ? content.split(' ').slice(1) : [],
                isGroup,
                sender,
                isAdmin: isGroup ? await conn.groupMetadata(m.key.remoteJid).then(md => 
                    md.participants.find(p => p.id === sender)?.admin
                ) : false
            };
        } catch (error) {
            console.error('Message Processing Error:', error);
            return null;
        }
    },

    // Security system handlers
    securityHandler: {
        antiCall: async (call, conn) => {
            if (config.ANTICALL === '1') {
                await conn.rejectCall(call.id, call.from);
                await conn.sendMessage(
                    call.from, 
                    { text: `🚫 Calls not allowed! Contact owner: ${config.OWNER_NUMBER}` }
                );
            }
        },

        antiDelete: async (update, conn) => {
            if (config.ANTIDELETE === '1') {
                const deletedMsg = await conn.loadMessage(
                    update.key.remoteJid, 
                    update.key.id
                );
                
                const content = deletedMsg?.message?.conversation || 
                              deletedMsg?.message?.extendedTextMessage?.text || 
                              '[Media Message]';
                
                await conn.sendMessage(
                    update.key.remoteJid,
                    `⚠️ Deleted message: "${content}"`
                );
            }
        },

        antiLink: async (m, conn) => {
            if (config.ANTILINK === '1') {
                const urlRegex = /(https?:\/\/[^\s]+)/g;
                if (urlRegex.test(m.body)) {
                    await conn.sendMessage(m.key.remoteJid, { delete: m.key });
                    await conn.sendMessage(
                        m.key.remoteJid,
                        `🚫 Links not allowed ${m.sender.split('@')[0]}!`,
                        { mentions: [m.sender] }
                    );
                }
            }
        },

        antiBadWord: async (m, conn) => {
            if (config.ANTIBADWORD === '1') {
                const badWords = config.BAD_WORDS_LIST.split(',');
                const foundWord = badWords.find(word => 
                    m.body.toLowerCase().includes(word.toLowerCase())
                );

                if (foundWord) {
                    await conn.sendMessage(m.key.remoteJid, { delete: m.key });
                    await conn.sendMessage(
                        m.key.remoteJid,
                        `❌ Inappropriate language detected ${m.sender.split('@')[0]}!`,
                        { mentions: [m.sender] }
                    );
                }
            }
        }
    },

    // Bot presence management
    presenceManager: {
        setPresence: (conn) => {
            const modes = {
                '1': 'composing',
                '2': 'recording',
                '3': 'available'
            };

            if (config.PRESENCE_MODE in modes) {
                setInterval(async () => {
                    await conn.sendPresenceUpdate(modes[config.PRESENCE_MODE]);
                }, 60000);
            }
        }
    },

    // Auto-read messages handler
    autoReadHandler: async (m, conn) => {
        if (config.AUTO_READ === '1') {
            await conn.readMessages([m.key]);
        }
    },

    // Command system utilities
    commandHandler: {
        helpMenu: (sender) => {
            const features = [
                config.ANTICALL === '1' && 'Anti-Call',
                config.ANTIDELETE === '1' && 'Anti-Delete',
                config.ANTILINK === '1' && 'Anti-Link',
                config.ANTIBADWORD === '1' && 'Bad Word Filter'
            ].filter(Boolean);

            return `🛠️ *${config.BOT_NAME} Help*\n\n` +
                   `Prefix: ${config.PREFIX}\n` +
                   `Active Features: ${features.join(', ')}\n\n` +
                   `📚 Commands:\n` +
                   `${config.PREFIX}ping - Check bot status\n` +
                   `${config.PREFIX}help - Show this menu\n` +
                   `${config.PREFIX}owner - Contact owner`;
        },

        statusInfo: () => {
            return `🤖 *${config.BOT_NAME} Status*\n\n` +
                   `🕒 Uptime: ${moment.duration(process.uptime(), 'seconds').humanize()}\n` +
                   `📶 Connection: Stable\n` +
                   `🛡️ Protected Features: ${this.commandHandler.getActiveFeatures()}`;
        },

        getActiveFeatures: () => {
            return [
                config.ANTICALL === '1' && '• Anti-Call',
                config.ANTIDELETE === '1' && '• Anti-Delete',
                config.ANTILINK === '1' && '• Anti-Link',
                config.ANTIBADWORD === '1' && '• Bad Word Filter'
            ].filter(Boolean).join('\n');
        }
    },

    // System utilities
    systemUtils: {
        handleReconnect: async (conn) => {
            console.log('⚡ Attempting reconnect...');
            await delay(5000);
            conn.ws.reconnect();
        },

        sendOwnerNotification: async (conn) => {
            await conn.sendMessage(
                config.OWNER_NUMBER, 
                `✅ ${config.BOT_NAME} connected!\n` +
                `🕒 Started at: ${moment().format('YYYY-MM-DD HH:mm:ss')}`
            );
        }
    }
};
