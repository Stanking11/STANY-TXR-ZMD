const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "menu",
    alias: ["help", "commands", "botmenu"],
    desc: "Displays the list of available commands",
    category: "main",
    react: "📜",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Menu content
        const menuText = `
╭━━〔 *𝚂𝚃𝙰𝙽𝚈-𝚃𝚇𝚁-𝚉𝙼𝙳* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *📝 Commands*:
┃◈┃  1. *alive* - Check bot uptime and system status
┃◈┃  2. *help* - Display this menu
┃◈┃  3. *status* - View bot status
┃◈┃  4. *runtime* - Show bot runtime
┃◈┃  5. *uptime* - View bot uptime
┃◈┃  6. *info* - Show bot information
┃◈┃• *👨‍💻 Owner*: ©𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷™
┃◈┃• *🧬 Version*: 1.0.0 BETA
┃◈└───────────┈⊷
╰──────────────┈⊷
> Powered by 𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷™`;

        // Send the menu with an image
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/0ydsic.jpeg` },  // Image URL for the menu
            caption: menuText,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '@newsletter',
                    newsletterName: '𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷™',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in menu command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
