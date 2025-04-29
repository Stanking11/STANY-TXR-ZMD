const {
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    delay,
    Browsers
} = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const P = require('pino');
const config = require('./config');

class StanyTechBot {
    constructor() {
        this.initialize();
    }

    async initialize() {
        try {
            // Create sessions directory if not exists
            if (!fs.existsSync('sessions')) {
                fs.mkdirSync('sessions');
            }

            // Load authentication state
            const { state, saveCreds } = await useMultiFileAuthState('sessions');
            this.saveCreds = saveCreds;

            // Create socket connection
            this.conn = makeWASocket({
                logger: P({ level: 'silent' }),
                printQRInTerminal: true,
                auth: state,
                browser: Browsers.custom('Stany Tech', 'Bot', '1.0.0')
            });

            this.setupEventHandlers();
            this.initializeStore();

        } catch (error) {
            console.error('Initialization Error:', error);
            this.handleReconnect();
        }
    }

    setupEventHandlers() {
        // Connection updates
        this.conn.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update;
            
            if (connection === 'close') {
                if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                    console.log('⚡ Reconnecting Stany Tech Bot...');
                    this.handleReconnect();
                }
            } else if (connection === 'open') {
                console.log('✅ STANY TECH BOT Connected!');
                this.sendOwnerNotification();
            }
        });

        // Credentials update
        this.conn.ev.on('creds.update', this.saveCreds);

        // Anti-Call System
        this.conn.ev.on('call', async (call) => {
            if (config.ANTICALL) {
                await this.handleAntiCall(call);
            }
        });

        // Message Handler
        this.conn.ev.on('messages.upsert', async ({ messages }) => {
            try {
                const m = messages[0];
                if (!m.message) return;

                await this.handleSecurityFeatures(m);
                await this.handleCommands(m);
            } catch (error) {
                console.error('Message Handling Error:', error);
            }
        });

        // Anti-Delete System
        this.conn.ev.on('messages.update', async (updates) => {
            if (config.ANTIDELETE) {
                for (const update of updates) {
                    await this.handleAntiDelete(update);
                }
            }
        });
    }

    async handleSecurityFeatures(m) {
        const sender = m.key.remoteJid;
        const user = m.key.participant || sender;
        const botJid = this.conn.user.id;

        // Anti-Tag System
        if (config.ANTITAG && m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.includes(botJid)) {
            await this.sendMessage(
                sender,
                `🚫 @${user.split('@')[0]} Please don't tag *Stany Tech Bot*!`,
                [user]
            );
        }

        // Anti-Sticker System
        if (config.ANTISTICKER && m.message.stickerMessage) {
            await this.conn.sendMessage(sender, { delete: m.key });
            await this.sendMessage(
                sender,
                `❌ Stickers are not allowed here!`,
                [user]
            );
        }
    }

    async handleAntiCall(call) {
        console.log(`📵 Blocking call from ${call.from}`);
        await this.conn.rejectCall(call.id, call.from);
        await this.sendMessage(
            call.from,
            `🚫 *Stany Tech Bot* doesn't accept calls!\nContact owner: ${config.OWNER_NUMBER}`
        );
    }

    async handleAntiDelete(update) {
        if (update.update.messageStubType === 0) {
            const deletedMsg = await this.conn.loadMessage(
                update.key.remoteJid, 
                update.key.id
            );
            
            const user = update.key.fromMe ? 
                'You' : 
                `@${update.key.participant?.split('@')[0] || 'Unknown'}`;

            const content = deletedMsg?.message?.conversation || 
                           deletedMsg?.message?.imageMessage?.caption || 
                           '[Media Message]';

            await this.sendMessage(
                update.key.remoteJid,
                `⚠️ ${user} deleted a message:\n"${content}"`,
                [update.key.participant]
            );
        }
    }

    async handleCommands(m) {
        const body = m.message.conversation || 
                    m.message.extendedTextMessage?.text || '';
        const sender = m.key.remoteJid;

        if (!body.startsWith(config.PREFIX)) return;

        const [cmd, ...args] = body.slice(config.PREFIX.length).trim().split(/ +/);

        switch(cmd.toLowerCase()) {
            case 'ping':
                await this.sendMessage(sender, '🏓 Pong!');
                break;

            case 'help':
                await this.showHelpMenu(sender);
                break;

            case 'status':
                await this.showBotStatus(sender);
                break;

            case 'owner':
                await this.sendMessage(
                    sender,
                    `📞 *Contact Owner:* ${config.OWNER_NUMBER}`,
                    [config.OWNER_NUMBER]
                );
                break;
        }
    }

    async showHelpMenu(sender) {
        const helpText = `
🛠️ *Stany Tech Bot Commands*
• ${config.PREFIX}ping - Check bot responsiveness
• ${config.PREFIX}help - Show this help menu
• ${config.PREFIX}status - Show bot status
• ${config.PREFIX}owner - Contact owner

🔒 *Active Security Features*
${this.getActiveFeatures()}
        `.trim();

        await this.sendMessage(sender, helpText);
    }

    async showBotStatus(sender) {
        const statusText = `
🤖 *Stany Tech Bot Status*
🕒 Uptime: ${this.formatUptime()}
📶 Connection: Stable
🛡️ Protected Features:
${this.getActiveFeatures()}
        `.trim();

        await this.sendMessage(sender, statusText);
    }

    getActiveFeatures() {
        return [
            config.ANTICALL && '• Anti-Call System 📵',
            config.ANTIDELETE && '• Anti-Delete Protection 🗑️',
            config.ANTITAG && '• Anti-Tag Defense 🔖',
            config.ANTISTICKER && '• Anti-Sticker Filter 🎴'
        ].filter(Boolean).join('\n');
    }

    async sendMessage(chatId, text, mentions = []) {
        await this.conn.sendMessage(chatId, {
            text,
            mentions
        });
    }

    async sendOwnerNotification() {
        await this.sendMessage(
            config.OWNER_NUMBER,
            '🚀 *Stany Tech Bot* has successfully connected!\n' +
            `🕒 Started at: ${new Date().toLocaleString()}`
        );
    }

    formatUptime() {
        const seconds = Math.floor(process.uptime());
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${days}d ${hours}h ${minutes}m`;
    }

    initializeStore() {
        this.store = {
            messages: {},
            loadMessage: async (jid, id) => {
                return this.store.messages[jid]?.[id] || null;
            }
        };
    }

    async handleReconnect() {
        console.log('⚡ Attempting reconnect in 5 seconds...');
        await delay(5000);
        this.initialize().catch(console.error);
    }
}

// Error Handling
process.on('uncaughtException', (err)
