module.exports = {
    meta: {
        name: process.env.BOT_NAME || 'STANY-TXR-ZMD',
        version: process.env.BOT_VERSION || '1.0.0',
        browser: [process.env.BOT_NAME || 'SecureBot', 'Chrome', '121.0.6167.160'],
        owner: process.env.OWNER_NUMBER || '1234567890'
    },
    session: {
        id: process.env.SESSION_ID,
        encryption: process.env.SESSION_ENCRYPTION || 'md_aes'
    },
    behavior: {
        presence: process.env.PRESENCE_MODE || 'online',
        prefix: process.env.PREFIX || '.',
        autoRead: process.env.AUTO_READ === 'true',
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 15 // MB
    },
    security: {
        antiCall: process.env.ANTICALL === 'true',
        antiLink: process.env.ANTILINK === 'true',
        antiSticker: process.env.ANTISTICKER === 'true',
        antiBotTag: process.env.ANTI_BOT_TAG === 'true',
        maxMentions: parseInt(process.env.MAX_MENTIONS) || 3
    },
    messages: {
        antiCall: '🚫 Voice calls are not permitted!',
        botTagWarning: '⚠️ Bot tagging is prohibited!',
        linkWarning: '🔗 Links are not allowed here!'
    },
    debug: {
        qr: process.env.DEBUG_QR === 'true',
        logging: process.env.DEBUG_LOG === 'true'
    },
    validateEnvironment: () => {
        return !!process.env.SESSION_ID && !!process.env.OWNER_NUMBER;
    }
};
