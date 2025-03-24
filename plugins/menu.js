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
╭━━━○𝐒𝐓𝐀𝐍𝐘 𝐓𝐗𝐑 𝐙𝐌𝐃○━━━┈⊷
┃❍⁠⁠⁠⁠╭──────────────
┃❍⁠⁠⁠⁠│ *Usᴇʀ* : ${config.OWNER_NAME}
┃❍⁠⁠⁠⁠│ *ʙᴀɪʟᴇʏs* : 𝐌𝐮𝐥𝐭𝐢 𝐝𝐞𝐯𝐢𝐜𝐞
┃❍⁠⁠⁠⁠│ *ᴛʏᴘᴇ* : 𝐍𝐨𝐝𝐞𝐣𝐬
┃❍⁠⁠⁠⁠│ *ᴘʟᴀᴛғᴏʀᴍ* : 𝐇𝐞𝐫𝐨𝐤𝐮
┃❍⁠⁠⁠⁠│ *ᴍᴏᴅᴇ* : [${config.MODE}]
┃❍⁠⁠⁠⁠│ *ᴘʀᴇғɪx* : [${config.PREFIX}]
┃❍⁠⁠⁠⁠│ *ᴠᴇʀsɪᴏɴ* : 1.0.0
┃❍⁠⁠⁠⁠╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
╭━━〔 *𝐌𝐄𝐍𝐔𝐋𝐈𝐒𝐓* 〕━━┈⊷
┃❍╭─────────────·
┃❍┃• *prαчєrtímє*
┃❍┃• *qurαnmєnu*
┃❍┃• *αímєnu*
┃❍┃• *αnímєmєnu*
┃❍┃• *cσnvєrtmєnu*
┃❍┃• *funmєnu*
┃❍┃• *dlmєnu*
┃❍┃• *lístmєnu*
┃❍┃• *mαínmєnu*
┃❍┃• *grσupmєnu*
┃❍┃• *αllmєnu*
┃❍┃• *вíвlєlíѕt*
┃❍┃• *σwnєrmєnu*
┃❍┃• *σthєrmєnu*
┃❍┃• *lσgσ <𝙩𝙚𝙭𝙩>*
┃❍┃• *rєpσ*
┃❍└───────────┈⊷
╰──────────────┈⊷

        // Send the menu with an image
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/rmxujw.jpeg` },  // Image URL for the menu
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
