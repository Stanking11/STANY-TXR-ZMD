const config = require('./config');

module.exports = {
    // General responses
    greetings: {
        welcome: (name) => `👋 Hello ${name}! I'm *${config.BOT_NAME}*\n` +
                  `Type ${config.PREFIX}help for my commands list`,
        ownerNotice: `🚀 Bot successfully connected!\n` +
                     `🕒 Started at: ${new Date().toLocaleString()}`
    },

    // Command responses
    commands: {
        help: (prefix, features) => `
🛠️ *${config.BOT_NAME} Help Menu*

📚 Available Commands:
• ${prefix}ping - Check bot responsiveness
• ${prefix}help - Show this menu
• ${prefix}status - System status
• ${prefix}owner - Contact owner

🔒 Active Security Features:
${features}
        `.trim(),

        status: (uptime) => `
🤖 *System Status*
🕒 Uptime: ${uptime}
📶 Connection: Stable
💾 Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
        `.trim(),

        owner: `👑 *Owner Information*\n` +
               `Contact: ${config.OWNER_NUMBER}\n` +
               `Powered by ©𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷`
    },

    // Security system messages
    security: {
        antiCall: `📵 Calls not allowed!\n` +
                  `Contact owner: ${config.OWNER_NUMBER}`,

        antiDelete: (user, content) => 
            `⚠️ @${user} deleted message:\n"${content}"`,

        antiLink: (user) => 
            `🔗 Link detected! Message removed @${user}`,

        antiBadWord: (user) => 
            `❌ Inappropriate content @${user}!`,

        antiTag: (user) => 
            `🚫 Please don't tag the bot @${user}!`
    },

    // Error messages
    errors: {
        general: `❌ Error processing request\n` +
                 `Contact ${config.OWNER_NUMBER} for support`,

        command: `⚠️ Invalid command!\n` +
                 `Use ${config.PREFIX}help for commands list`,

        adminOnly: `🔒 This command requires admin privileges!`
    },

    // System messages
    system: {
        reconnect: `⚡ Attempting reconnect...`,
        connected: `✅ Successfully connected to WhatsApp!`,
        authFailed: `🔒 Authentication failed!\n` +
                    `Delete session files and rescan QR`
    },

    // Utility functions
    format: {
        mention: (jid) => `@${jid.split('@')[0]}`,
        time: () => new Date().toLocaleTimeString(),
        date: () => new Date().toLocaleDateString()
    },

    // Interactive messages
    interactive: {
        buttonExample: {
            text: "Choose an option:",
            footer: config.BOT_NAME,
            buttons: [
                { buttonId: `${config.PREFIX}help`, buttonText: { displayText: "Help" }, type: 1 },
                { buttonId: `${config.PREFIX}status`, buttonText: { displayText: "Status" }, type: 1 }
            ]
        }
    }
};
