const { cmd, commands } = require('../command');
const config = require('../config');

// repo info
cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Info about the bot repository",
    category: "main",
    react: "👨‍💻",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `*Hello there this is STANY TRX NEW BOT by 𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷™👋🏻* 

> Simple , Straight Forward But Loaded With Features 🎊, Meet STANY-TECH TRX WhatsApp Bot.

*Thanks for using STANY-TRX🇹🇿* 

> Don't forget to frok the repo ⤵️

https://github.com/Stanking11/STANY-TXR-ZMD;

        // Send image with caption
        await conn.sendMessage(from, { 
            image: { url: "https://files.catbox.moe/cpja3j.jpg" 
            caption: dec, 
            contextInfo: { 
                mentionedJid: [m.sender], 
                forwardingScore: 999, 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: '120363297843078852@newsletter', 
                    newsletterName: '𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷™', 
                    serverMessageId: 143 
                } 
            } 
        }, { quoted: mek });

        // Send audio with contextInfo
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/JawadYTX/KHAN-DATA/raw/refs/heads/main/autovoice/repo.m4a' },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: { 
                mentionedJid: [m.sender], 
                forwardingScore: 999, 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: '120363297843078852@newsletter', 
                    newsletterName: '𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷™', 
                    serverMessageId: 143 
                } 
            }
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
