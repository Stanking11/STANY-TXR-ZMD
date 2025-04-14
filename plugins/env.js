const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

function isEnabled(value) {
    // Function to check if a value represents a "true" boolean state
    return value && value.toString().toLowerCase() === "true";
}

cmd({
    pattern: "env",
    alias: ["setting", "allvar"],
    desc: "Settings of bot",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Define the settings message with the correct boolean checks
        let envSettings = `╭━━━〔 *STANY TXR ZMD* 〕━━┈⊷
┃▸╭───────────···๏
┃▸├❒ *⚙️ENV SETTINGS⚙️*
┃▸└───────────···๏
╰────────────────┈⊷
╭━━〔 *Enabled Disabled* 〕━┈⊷
├❒ *Status View:* ${isEnabled(config.AUTO_STATUS_SEEN) ? "Enabled ✅" : "Disabled ❌"}
├❒ *Status Reply:* ${isEnabled(config.AUTO_STATUS_REPLY) ? "Enabled ✅" : "Disabled ❌"}
├❒ *Auto Reply:* ${isEnabled(config.AUTO_REPLY) ? "Enabled ✅" : "Disabled ❌"}
├❒ *Auto Sticker:* ${isEnabled(config.AUTO_STICKER) ? "Enabled ✅" : "Disabled ❌"}
├❒ *Auto Voice:* ${isEnabled(config.AUTO_VOICE) ? "Enabled ✅" : "Disabled ❌"}
├❒ *Custom Reacts:* ${isEnabled(config.CUSTOM_REACT) ? "Enabled ✅" : "Disabled ❌"}
├❒ *Auto React:* ${isEnabled(config.AUTO_REACT) ? "Enabled ✅" : "Disabled ❌"}
├❒ *Anti-Link:* ${isEnabled(config.ANTI_LINK) ? "Enabled ✅" : "Disabled ❌"}
├❒ *Anti-Bad Words:* ${isEnabled(config.ANTI_BAD) ? "Enabled ✅" : "Disabled ❌"}
├❒ *Auto Typing:* ${isEnabled(config.AUTO_TYPING) ? "Enabled ✅" : "Disabled ❌"}
├❒ *Auto Recording:* ${isEnabled(config.AUTO_RECORDING) ? "Enabled ✅" : "Disabled ❌"}
├❒ *Always Online:* ${isEnabled(config.ALWAYS_ONLINE) ? "Enabled ✅" : "Disabled ❌"}
├❒ *Status React:* ${isEnabled(config.AUTO_STATUS_REACT) ? "Enabled ✅" : "Disabled ❌"}
├❒ *Public Mode:* ${isEnabled(config.PUBLIC_MODE) ? "Enabled ✅" : "Disabled ❌"}
├❒ *Read Message:* ${isEnabled(config.READ_MESSAGE) ? "Enabled ✅" : "Disabled ❌"}
╰━━━━━━━━━━━━──┈⊷
> ${config.DESCRIPTION}`;

        // Send message with an image
        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/7jle25.jpg' }, // Image URL
                caption: envSettings,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '1236330029VJ3@newsletter',
                        newsletterName: "☇ STANY TECH⃪🤖͎᪳᪳𝆺𝅥",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

               // Send an audio file
        await conn.sendMessage(from, {
            audio: { url: 'https://cdn.ironman.my.id/i/hmxjch.mp4' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.log(error);
        reply(`Error: ${error.message}`);
    }
});


   
