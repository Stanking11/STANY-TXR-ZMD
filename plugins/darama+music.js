const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')
cmd({
    pattern: "play3",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please give me a url or title")  
const search = await yts(q)
const data = search.videos[0];
const url = data.url
    
    
let desc = `
*⫷⦁STANY TXR ZMD MUSⵊC DOWNLOADⵊNG⦁⫸*

🎵 *MUSⵊC FOUND!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎧 *ENJOY THE MUSIC BROUGHT TO YOU!*

> *STANY TXR ZMD WHATSAPP BOT* 

> *© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ©𝚂𝚃𝙰𝙽𝚈 𝚃𝚇𝚁 𝚉𝙼𝙳* 
`

await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download audio

let down = await fg.yta(url)
let downloadUrl = down.dl_url

//send audio message
await conn.sendMessage(from,{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"audio/mpeg",fileName:data.title + ".mp3",caption:"*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ STANY TXR ZMD*"},{quoted:mek})

}catch(e){
console.log(e)
  reply(`_Hi ${pushname} retry later_`)
}
})

//====================video_dl=======================

cmd({
    pattern: "darama",
    alias: ["video2"],
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please give me a url or title")  
const search = await yts(q)
const data = search.videos[0];
const url = data.url
    
    
let desc = `
*⫷⦁STANY TXR ZMD VⵊDEO DOWNLOADⵊNG⦁⫸*

🎥 *VⵊDEO FOUND!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎬 *ENJOY THE VIDEO BROUGHT TO YOU!*

> *STANY TXR ZMD WHATSAPP BOT* 

> *© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ©𝚂𝚃𝙰𝙽𝚈 𝚃𝚇𝚁 𝚉𝙼𝙳*
`

await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download video

let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video message
await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"video/mp4",fileName:data.title + ".mp4",caption:"*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ©𝚂𝚃𝙰𝙽𝚈 𝚃𝚇𝚁 𝚉𝙼𝙳*"},{quoted:mek})

}catch(e){
console.log(e)
  reply(`_Hi ${pushname} retry later_`)
}
})
//
