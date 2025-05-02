const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // Core Settings
    SESSION_ID: process.env.SESSION_ID || "",
    PREFIX: process.env.PREFIX || ".",
    BOT_NAME: process.env.BOT_NAME || "✦ CASEYRHODES ✦ XMD ✦",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254112192119",
    OWNER_NAME: process.env.OWNER_NAME || "✦ CASEYRHODES ✦ XMD ✦",
    DESCRIPTION: process.env.DESCRIPTION || "*© ✦ CASEYRHODES ✦ XMD ✦*",
    
    // Security Features
    ANTI_DELETE: convertToBool(process.env.ANTI_DELETE || "true"),
    ANTI_CALL: convertToBool(process.env.ANTI_CALL || "true"),
    ANTI_STATUS_TAG: convertToBool(process.env.ANTI_STATUS_TAG || "true"),
    ANTI_STICKER: convertToBool(process.env.ANTI_STICKER || "true"),
    KICK_STICKER_USERS: convertToBool(process.env.KICK_STICKER_USERS || "true"),
    DELETE_STICKERS: convertToBool(process.env.DELETE_STICKERS || "true"),
    MAX_MENTIONS: process.env.MAX_MENTIONS || 5,
    BLOCK_BOTS: convertToBool(process.env.BLOCK_BOTS || "true"),
    
    // Security Messages
    STICKER_WARNING: process.env.STICKER_WARNING || "❌ Stickers are prohibited!",
    CALL_BLOCK_MESSAGE: process.env.CALL_BLOCK_MESSAGE || "📵 Calls not allowed!",
    TAG_WARNING: process.env.TAG_WARNING || "⚠️ Max 5 mentions allowed!",
    DELETE_WARNING: process.env.DELETE_WARNING || "🗑️ Deletion detected!",
    
    // Media & Appearance
    ALIVE_IMG: process.env.ALIVE_IMG || "https://i.imgur.com/PEZ5QL2.jpeg",
    LIVE_MSG: process.env.LIVE_MSG || "> SILVA SPARK IS SPARKING ACTIVE AND ALIVE\n\n\nKEEP USING CASEYRHODES XMD FROM CASEYRHODES TECH INC⚡",
    
    // Automation Features
    READ_MESSAGE: convertToBool(process.env.READ_MESSAGE || "false"),
    AUTO_REACT: convertToBool(process.env.AUTO_REACT || "false"),
    AUTO_STATUS_SEEN: convertToBool(process.env.AUTO_STATUS_SEEN || "true"),
    AUTO_STATUS_REPLY: convertToBool(process.env.AUTO_STATUS_REPLY || "true"),
    AUTO_STATUS__MSG: process.env.AUTO_STATUS__MSG || "*🎉👀 Seen by CASEYRHODES XMD 🚀🔥*",
    AUTO_VOICE: convertToBool(process.env.AUTO_VOICE || "false"),
    AUTO_STICKER: convertToBool(process.env.AUTO_STICKER || "false"),
    AUTO_REPLY: convertToBool(process.env.AUTO_REPLY || "false"),
    
    // Reaction Controls
    CUSTOM_REACT: convertToBool(process.env.CUSTOM_REACT || "false"),
    CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🔥,❤️‍🩹,❤️,🩷,🧡,💛,💚,💙,🩵,💜,🤎,🖤,🤍",
    HEART_REACT: convertToBool(process.env.HEART_REACT || "false"),
    OWNER_REACT: convertToBool(process.env.OWNER_REACT || "true"),
    
    // Mode Settings
    MODE: process.env.MODE || "public",
    ANTI_LINK: convertToBool(process.env.ANTI_LINK || "true"),
    ALWAYS_ONLINE: convertToBool(process.env.ALWAYS_ONLINE || "true"),
    PUBLIC_MODE: convertToBool(process.env.PUBLIC_MODE || "true"),
    
    // UI Features
    AUTO_TYPING: convertToBool(process.env.AUTO_TYPING || "true"),
    AUTO_RECORDING: convertToBool(process.env.AUTO_RECORDING || "false")
};
