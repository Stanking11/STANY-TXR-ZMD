const config = require('../config')
const { cmd, commands } = require('../command');
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "menu",
    alias: "allmenu",
    desc: "menu the bot",
    category: "menu2",
    react: "👊",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
━〔 STANY TXR ZMD〕────
🔥───────────────
> ◈┃• Owner : *${config.OWNER_NAME}*
> ◈┃• Baileys : *Multi Device*
> ◈┃• Type : *NodeJs*
> ◈┃• Platform : *Heroku*
> ◈┃• Mode : *[${config.MODE}]*
> ◈┃• Prifix : *[${config.PREFIX}]*
> ◈┃• Version : *1.0.0*
 ────────────────
─────────────────

───〔 *Download Menu* 〕┈⊷
🔥───────────────
> ◈┃ facebook
> ◈┃ mediafire
> ◈┃ tiktok
> ◈┃ twitter
> ◈┃ Insta
> ◈┃ apk
> ◈┃ img
> ◈┃ tt2
> ◈┃ git
> ◈┃ spotify
> ◈┃ play
> ◈┃ play2
> ◈┃ play3
> ◈┃ audio
> ◈┃ video
> ◈┃ video2
> ◈┃ ytmp3
> ◈┃ ytmp4
> ◈┃ song
> ◈┃ darama
> ◈┃ gdrive
> ◈┃ smovie
> ◈┃ baiscope 
> ◈┃ ginisilia 
 ───────────────
 

───〔 *Group Menu* 〕───
🔥───────────────
> ◈┃ grouplink
> ◈┃ kickall
> ◈┃ kickall2
> ◈┃ kickall3
> ◈┃ add
> ◈┃ remove
> ◈┃ kick
> ◈┃ promote 
> ◈┃ demote
> ◈┃ dismiss 
> ◈┃ revoke
> ◈┃ setgoodbye
> ◈┃ setwelcome
> ◈┃ delete 
> ◈┃ getpic
> ◈┃ ginfo
> ◈┃ delete 
> ◈┃ disappear on
> ◈┃ disappear off
> ◈┃ disappear 7D,24H
> ◈┃ allreq
> ◈┃ updategname
> ◈┃ updategdesc
> ◈┃ joinrequests
> ◈┃ senddm
> ◈┃ nikal
> ◈┃ mute
> ◈┃ unmute
> ◈┃ lockgc
> ◈┃ unlockgc
> ◈┃ invite
> ◈┃ tag
> ◈┃ hidetag
> ◈┃ tagall
> ◈┃ tagadmins
 ───────────────


───〔 *Owner Menu* 〕───
🔥───────────────
> ◈┃ owner
> ◈┃ menu
> ◈┃ menu2
> ◈┃ vv2
> ◈┃ listcmd
> ◈┃ allmenu
> ◈┃ repo
> ◈┃ block
> ◈┃ unblock
> ◈┃ fullpp
> ◈┃ setpp
> ◈┃ restart
> ◈┃ shutdown
> ◈┃ updatecmd
> ◈┃ alive
> ◈┃ ping 
> ◈┃ gjid
> ◈┃ jid
 ───────────────

───〔 *Fun Menu* 〕━───
🔥───────────────
> ◈┃ insult
> ◈┃ hack
> ◈┃ ship
> ◈┃ character
> ◈┃ pickup 
> ◈┃ joke
> ◈┃ hrt
> ◈┃ hpy
> ◈┃ syd
> ◈┃ anger
> ◈┃ shy
> ◈┃ kiss
> ◈┃ mon
> ◈┃ cunfuzed
> ◈┃ setpp
> ◈┃ hand
> ◈┃ nikal
> ◈┃ hold
> ◈┃ hug
> ◈┃ nikal
> ◈┃ hifi
> ◈┃ poke
 ───────────────

───〔  Convert Menu 〕───
🔥───────────────
> ◈┃ sticker
> ◈┃ sticker2
> ◈┃ fancy
> ◈┃ take
> ◈┃ tomp3
> ◈┃ tts
> ◈┃ trt
 ───────────────


───〔 *Ai Menu* 〕━────
🔥───────────────
> ◈┃ ai
> ◈┃ gpt
> ◈┃ meta
> ◈┃ blackbox
> ◈┃ gpt4
> ◈┃ bing
> ◈┃ copilot
 ───────────────

───〔 *Main Menu* 〕━───
🔥───────────────
> ◈┃ ping
> ◈┃ ping2
> ◈┃ speed
> ◈┃ live 
> ◈┃ alive
> ◈┃ runtime
> ◈┃ uptime 
> ◈┃ repo
> ◈┃ owner
> ◈┃ menu
> ◈┃ menu2
> ◈┃ restart
 ───────────────

───〔 *Anime Menu* 〕━──
🔥───────────────
> ◈┃ fack
> ◈┃ dog
> ◈┃ awoo
> ◈┃ garl
> ◈┃ waifu
> ◈┃ neko
> ◈┃ megnumin
> ◈┃ neko
> ◈┃ maid
> ◈┃ loli
> ◈┃ animegirl
> ◈┃ animegirl
> ◈┃ animegirl1
> ◈┃ animegirl2
> ◈┃ animegirl3
> ◈┃ animegirl4
> ◈┃ animegirl5
> ◈┃ anime1
> ◈┃ anime1
> ◈┃ anime2
> ◈┃ anime3
> ◈┃ anime4
> ◈┃ anime5
> ◈┃ animenews
> ◈┃ foxgirl
> ◈┃ naruto
 ───────────────

───〔  Other Menu 〕────
🔥───────────────
> ◈┃ fact
> ◈┃ pair
> ◈┃ pair2
> ◈┃ fancy
> ◈┃ logo <text>
> ◈┃ define
> ◈┃ news
> ◈┃ movie
> ◈┃ weather
> ◈┃ srepo
> ◈┃ insult
> ◈┃ save
> ◈┃ wikipedia
> ◈┃ gpass
> ◈┃ githubstalk
> ◈┃ yts
> ◈┃ ytv
 ───────────────
> ©𝚂𝚃𝙰𝙽𝚈 𝚃𝚇𝚁 𝚉𝙼𝙳 `;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/7jle25.jpg` },
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
            audio: { url: 'https://files.catbox.moe/9z10rw.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
