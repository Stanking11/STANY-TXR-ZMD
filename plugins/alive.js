const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `   ©𝗦𝗧𝗔𝗡𝗬-𝗧𝗫𝗥-𝗭𝗠𝗗™
        
> ╭─────────────·๏
> ┃• *⏳Uptime*:  ${runtime(process.uptime())} 
> ┃• *📟 Ram usage*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
> ┃• *⚙️ HostName*: ${os.hostname()}
> ┃• *👨‍💻 Owner*:©𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷™
> ┃• *🧬 Version*: 1.0.0
> └───────────┈⊷
> ╰──────────────┈⊷
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ©𝚂𝚃𝙰𝙽𝚈 𝚃𝚇𝚁 𝚉𝙼𝙳 ™`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/7jle25.jpg` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: false,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363297843078852@newsletter',
                    newsletterName: '𝙱.𝙼.𝙱-𝚇𝙼𝙳™',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
