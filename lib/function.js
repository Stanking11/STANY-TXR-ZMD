const { delay } = require('@whiskeysockets/baileys');
const fs = require('fs-extra');
const moment = require('moment');
const config = require('./config');
const msgLib = require('./messageLib');

module.exports = {
    // ======================
    // CORE MESSAGE PROCESSOR
    // ======================
    processMessage: async (m, conn) => {
        try {
            const messageType = Object.keys(m.message)[0];
            const body = m.message.conversation || 
                        m.message.extendedTextMessage?.text || 
                        m.message.imageMessage?.caption || 
                        '[Media Message]';
            
            return {
                type: messageType,
                body: body,
                from: m.key.remoteJid,
                sender: m.key.participant || m.key.remoteJid,
                isGroup: m.key.remoteJid.endsWith('@g.us'),
                isCommand: body.startsWith(config.PREFIX),
                mentionedJid: m.message.extendedTextMessage?.contextInfo?.mentionedJid || []
            };
        } catch (error) {
            this.logError('Message Processing', error);
            return null;
        }
    },

    // ======================
    // SECURITY SYSTEM HANDLERS
    // ======================
    security: {
        handleAntiCall: async (call, conn) => {
            if (config.ANTICALL === '1') {
                await conn.rejectCall(call.id, call.from);
                await this.sendMessage(
                    conn,
                    call.from,
                    msgLib.security.antiCall,
                    [call.from]
                );
            }
        },

        handleAntiDelete: async (update, conn) => {
            if (config.ANTIDELETE === '1') {
                const deletedMsg = await conn.loadMessage(
                    update.key.remoteJid, 
                    update.key.id
                );
                const content = this.getMessageContent(deletedMsg);
                const user = update.key.participant?.split('@')[0] || 'Unknown';
                
                await this.sendMessage(
                    conn,
                    update.key.remoteJid,
                    msgLib.security.antiDelete(user, content),
                    [update.key.participant]
                );
            }
        },

        handleAntiLink: async (m, conn) => {
            if (config.ANTILINK === '1' && this.containsLinks(m.body)) {
                await conn.sendMessage(m.from, { delete: m.key });
                await this.sendMessage(
                    conn,
                    m.from,
                    msgLib.security.antiLink(this.formatMention(m.sender)),
                    [m.sender]
                );
            }
        },

        handleAntiBadWord: async (m, conn) => {
            if (config.ANTIBADWORD === '1' && this.containsBadWords(m.body)) {
                await conn.sendMessage(m.from, { delete: m.key });
                await this.sendMessage(
                    conn,
                    m.from,
                    msgLib.security.antiBadWord(this.formatMention(m.sender)),
                    [m.sender]
                );
            }
        },

        handleAntiTag: async (m, conn) => {
            if (config.ANTITAG === '1' && m.mentionedJid.includes(conn.user.id)) {
                await this.sendMessage(
                    conn,
                    m.from,
                    msgLib.security.antiTag(this.formatMention(m.sender)),
                    [m.sender]
                );
            }
        }
    },

    // ======================
    // BOT PRESENCE MANAGER
    // ======================
    presence: {
        setPresence: (conn) => {
            const presenceMap = {
                '1': 'composing',
                '2': 'recording',
                '3': 'available'
            };

            if (presenceMap[config.PRESENCE_MODE]) {
                setInterval(async () => {
                    await conn.sendPresenceUpdate(presenceMap[config.PRESENCE_MODE]);
                }, 30000);
            }
        }
    },

    // ======================
    // COMMAND HANDLER
    // ======================
    commands: {
        execute: async (m, conn) => {
            const [cmd, ...args] = m.body.slice(config.PREFIX.length).split(/ +/);
            
            switch(cmd.toLowerCase()) {
                case 'ping':
                    await this.sendMessage(conn, m.from, '🏓 Pong!');
                    break;

                case 'help':
                    await this.showHelpMenu(conn, m.from);
                    break;

                case 'status':
                    await this.showBotStatus(conn, m.from);
                    break;

                case 'owner':
                    await this.sendMessage(
                        conn,
                        m.from,
                        msgLib.commands.owner,
                        [config.OWNER_NUMBER]
                    );
                    break;
            }
        },

        showHelpMenu: async (conn, jid) => {
            const features = this.getActiveFeatures();
            await this.sendMessage(
                conn,
                jid,
                msgLib.commands.help(config.PREFIX, features)
            );
        },

        showBotStatus: async (conn, jid) => {
            const uptime = moment.duration(process.uptime(), 'seconds').humanize();
            await this.sendMessage(
                conn,
                jid,
                msgLib.commands.status(uptime)
            );
        }
    },

    // ======================
    // UTILITY FUNCTIONS
    // ======================
    sendMessage: async (conn, jid, text, mentions = []) => {
        try {
            await conn.sendMessage(jid, { 
                text, 
                mentions: mentions.map(m => m.includes('@') ? m : `${m}@s.whatsapp.net`)
            });
        } catch (error) {
            this.logError('Message Sending', error);
        }
    },

    containsLinks: (text) => {
        return /(https?:\/\/|www\.)/i.test(text);
    },

    containsBadWords: (text) => {
        const badWords = config.BAD_WORDS_LIST.split(',').map(w => w.trim().toLowerCase());
        return badWords.some(word => text.toLowerCase().includes(word));
    },

    formatMention: (jid) => jid.split('@')[0],

    getActiveFeatures: () => {
        return [
            config.ANTICALL === '1' && '• Anti-Call',
            config.ANTIDELETE === '1' && '• Anti-Delete',
            config.ANTILINK === '1' && '• Link Protection',
            config.ANTIBADWORD === '1' && '• Bad Word Filter'
        ].filter(Boolean).join('\n');
    },

    handleReconnect: async (conn) => {
        console.log(msgLib.system.reconnect);
        await delay(5000);
        conn.ws.reconnect();
    },

    logError: (context, error) => {
        console.error(`[${moment().format('HH:mm:ss')}] ${context} Error:`, error);
    },

    notifyOwner: async (conn) => {
        await this.sendMessage(
            conn,
            config.OWNER_NUMBER,
            msgLib.greetings.ownerNotice
        );
    }
};
