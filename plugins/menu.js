const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
    pattern: "txr",
    desc: "menu the bot",
    category: "menu",
    react: "☠️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
━★╭──────────────
┃★│ Owner : *${config.BOT_NAME}*
┃★│ Baileys : *Multi Device*
┃★│ Type : *NodeJs*
┃★│ Platform : *Heroku*
┃★│ Mode : *[${config.MODE}]*
┃★│ Prifix : *[${config.PREFIX}]*
┃★│ Version : *v 1.0.0*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
*╭━━〔 Menu List 〕━━┈⊷*
*┃◈╭─────────────·๏*
*┃◈┃• ❤️‍🔥aimenu❤️‍🔥*
*┃◈┃• 🫀anmiemenu🫀*
*┃◈┃• 👥convertmenu👥*
*┃◈┃• 🤹🏻funmenu🤹🏻*
*┃◈┃• 📸dlmenu📸*
*┃◈┃• 👻listcmd👻*
*┃◈┃• 🤌🏻mainmenu🤌🏻*
*┃◈┃• 🧑🏻groupmenu🧒🏻*
*┃◈┃• 👑allmenu👑*
*┃◈┃• 💀ownermenu💀*
*┃◈┃• 🌐othermenu🌐*
*┃◈┃• ✅repo✅*
*┃◈└───────────┈⊷*
*╰──────────────┈⊷*
> ©𝚂𝚃𝙰𝙽𝚈 𝚃𝚇𝚁 𝚉𝙼𝙳 `;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/xmo2xp.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363352087070233@newsletter',
                        newsletterName: '💫 Vᴏʀᴛᴇx xᴍᴅ 💫',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/o3dyfy.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


// dlmenu

cmd({
    pattern: "dlmenu",
    desc: "menu the bot",
    category: "menu",
    react: "💚",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
🔥───〔 *Download Menu* 〕─┈⊷
🔥───────────────
> ◈┃• facebook
> ◈┃• mediafire
> ◈┃• tiktok
> ◈┃• twitter
> ◈┃• Insta
> ◈┃• apk
> ◈┃• img
> ◈┃• spotify
> ◈┃• play
> ◈┃• play2
> ◈┃• play3
> ◈┃• tt2
> ◈┃• audio
> ◈┃• video
> ◈┃• video2
> ◈┃• ytmp3
> ◈┃• ytmp4
> ◈┃• song
> ◈┃• darama
> ◈┃• git
> ◈┃• gdrive
> ◈┃• smovie
> ◈┃• baiscope 
> ◈┃• ginisilia 
 ───────────────
> 574N6T3CH`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://github.com/Mrhanstz/VORTEX-XMD/raw/refs/heads/main/HansTz/HansTz.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363352087070233@newsletter',
                        newsletterName: '💫 Vᴏʀᴛᴇx xᴍᴅ 💫',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// group menu

cmd({
    pattern: "groupmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🥰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try
       {
        let dec = `
🔥───〔 *Group Menu* 〕─┈⊷
🔥───────────────
> ◈┃• grouplink
> ◈┃• kickall
> ◈┃• kickall2
> ◈┃• kickall3
> ◈┃• add
> ◈┃• remove
> ◈┃• kick
> ◈┃• promote 
> ◈┃• demote
> ◈┃• dismiss 
> ◈┃• revoke
> ◈┃• setgoodbye
> ◈┃• setwelcome
> ◈┃• delete 
> ◈┃• getpic
> ◈┃• ginfo
> ◈┃• delete 
> ◈┃• disappear on
> ◈┃• disappear off
> ◈┃• disappear 7D,24H
> ◈┃• allreq
> ◈┃• updategname
> ◈┃• updategdesc
> ◈┃• joinrequests
> ◈┃• senddm
> ◈┃• nikal
> ◈┃• mute
> ◈┃• unmute
> ◈┃• lockgc
> ◈┃• unlockgc
> ◈┃• invite
> ◈┃• tag
> ◈┃• hidetag
> ◈┃• tagall
> ◈┃• tagadmins
 ───────────────
> 574N6T3CH`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://github.com/Mrhanstz/VORTEX-XMD/raw/refs/heads/main/HansTz/HansTz.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363352087070233@newsletter',
                        newsletterName: '💫 Vᴏʀᴛᴇx xᴍᴅ 💫',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// fun menu

cmd({
    pattern: "funmenu",
    desc: "menu the bot",
    category: "menu",
    react: "😎",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

        let dec = `
🔥───〔 *Fun Menu* 〕─┈⊷
🔥──────────────
> ◈┃• insult
> ◈┃• pickup
> ◈┃• ship
> ◈┃• character
> ◈┃• hack
> ◈┃• joke
> ◈┃• hrt
> ◈┃• hpy
> ◈┃• syd
> ◈┃• anger
> ◈┃• shy
> ◈┃• kiss
> ◈┃• mon
> ◈┃• cunfuzed
> ◈┃• setpp
> ◈┃• hand
> ◈┃• nikal
> ◈┃• hold
> ◈┃• hug
> ◈┃• nikal
> ◈┃• hifi
> ◈┃• poke
 ───────────────
> 574N6T3CH`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://github.com/Mrhanstz/VORTEX-XMD/raw/refs/heads/main/HansTz/HansTz.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363352087070233@newsletter',
                        newsletterName: '💫 Vᴏʀᴛᴇx xᴍᴅ 💫',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// other menu

cmd({
    pattern: "othermenu",
    desc: "menu the bot",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
🔥───〔 *Other Menu* 〕─┈⊷
🔥───────────────
> ◈┃• vv/vv2
> ◈┃• pair
> ◈┃• pair2
> ◈┃• fact
> ◈┃• font
> ◈┃• define
> ◈┃• news
> ◈┃• movie
> ◈┃• weather
> ◈┃• srepo
> ◈┃• insult
> ◈┃• save
> ◈┃• wikipedia
> ◈┃• gpass
> ◈┃• githubstalk
> ◈┃• yts
> ◈┃• ytv
 ───────────────
> 574N6T3CH`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://github.com/Mrhanstz/VORTEX-XMD/raw/refs/heads/main/HansTz/HansTz.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363352087070233@newsletter',
                        newsletterName: '💫 Vᴏʀᴛᴇx xᴍᴅ 💫',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// main menu

cmd({
    pattern: "mainmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🗿",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
🔥───〔 *Main Menu* 〕─┈⊷
🔥───────────────
> ◈┃• ping
> ◈┃• live 
> ◈┃• alive
> ◈┃• runtime
> ◈┃• uptime 
> ◈┃• repo
> ◈┃• owner
> ◈┃• menu
> ◈┃• menu2
> ◈┃• restart
 ───────────────
> 574N6T3CH`;

        await conn.sendMessage(
            from,
            {
               image: { url: `https://github.com/Mrhanstz/VORTEX-XMD/raw/refs/heads/main/HansTz/HansTz.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363352087070233@newsletter',
                        newsletterName: '💫 Vᴏʀᴛᴇx xᴍᴅ 💫',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// owner menu

cmd({
    pattern: "ownermenu",
    desc: "menu the bot",
    category: "menu",
    react: "🔰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
🔥───〔 *Owner Menu* 〕─┈⊷
🔥───────────────
> ◈┃• owner
> ◈┃• menu
> ◈┃• menu2
> ◈┃• listcmd
> ◈┃• allmenu
> ◈┃• repo
> ◈┃• block
> ◈┃• unblock
> ◈┃• fullpp
> ◈┃• setpp
> ◈┃• restart
> ◈┃• shutdown
> ◈┃• updatecmd
> ◈┃• alive
> ◈┃• ping 
> ◈┃• gjid
> ◈┃• jid
 ───────────────
> 574N6T3CH`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://github.com/Mrhanstz/VORTEX-XMD/raw/refs/heads/main/HansTz/HansTz.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363352087070233@newsletter',
                        newsletterName: '💫 Vᴏʀᴛᴇx xᴍᴅ 💫',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// convert menu

cmd({
    pattern: "convertmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🥀",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
 🔥──〔 *Convert Menu* 〕─┈⊷
 🔥──────────────
> ◈┃• sticker
> ◈┃• sticker2
> ◈┃• fancy
> ◈┃• take
> ◈┃• tomp3
> ◈┃• tts
> ◈┃• trt
 ───────────────
> 574N6T3CH`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://github.com/Mrhanstz/VORTEX-XMD/raw/refs/heads/main/HansTz/HansTz.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363352087070233@newsletter',
                        newsletterName: '💫 Vᴏʀᴛᴇx xᴍᴅ 💫',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


// anmie menu 

cmd({
    pattern: "animemenu",
    desc: "menu the bot",
    category: "menu",
    react: "🧚",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
          let dec = `
🔥━━〔 *Anime Menu* 〕─┈⊷
🔥──────────────
> ◈┃• fack
> ◈┃• dog
> ◈┃• awoo
> ◈┃• garl
> ◈┃• waifu
> ◈┃• neko
> ◈┃• megnumin
> ◈┃• neko
> ◈┃• maid
> ◈┃• loli
> ◈┃• animegirl
> ◈┃• animegirl
> ◈┃• animegirl1
> ◈┃• animegirl2
> ◈┃• animegirl3
> ◈┃• animegirl4
> ◈┃• animegirl5
> ◈┃• anime1
> ◈┃• anime1
> ◈┃• anime2
> ◈┃• anime3
> ◈┃• anime4
> ◈┃• anime5
> ◈┃• animenews
> ◈┃• foxgirl
> ◈┃• naruto
 ───────────────
> 574N6T3CH`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://github.com/Mrhanstz/VORTEX-XMD/raw/refs/heads/main/HansTz/HansTz.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363352087070233@newsletter',
                        newsletterName: '💫 Vᴏʀᴛᴇx xᴍᴅ 💫',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


// ai menu 

cmd({
    pattern: "aimenu",
    desc: "menu the bot",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
🔥━━〔 *Ai Menu* 〕─┈⊷
🔥────────────
> ◈┃• ai
> ◈┃• gpt
> ◈┃• meta
> ◈┃• blackbox
> ◈┃• gpt4
> ◈┃• bing
> ◈┃• copilot
 ─────────────
> 574N6T3CH`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://github.com/Mrhanstz/VORTEX-XMD/raw/refs/heads/main/HansTz/HansTz.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363352087070233@newsletter',
                        newsletterName: '💫 Vᴏʀᴛᴇx xᴍᴅ 💫',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

