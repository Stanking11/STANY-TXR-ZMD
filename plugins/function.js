


const { cmd } = require('../command')
const fs = require('fs');
const path = require('path');
const config = require('../config')
// List of bad words to check against
 // Replace with actual words
cmd({
  on: "body"
},
async (conn,mek, m, { from, body, isGroup, isAdmins, isBotAdmins, reply, sender }) => {
    try {
    
        const badWords = ["wtf", "mia", "xxx","fuck","sex","huththa","pakaya","ponnaya","hutto"]
        if (!isGroup || isAdmins || !isBotAdmins) return; // Skip if not in group, or sender is admin, or bot is not admin
      
        const lowerCaseMessage = body.toLowerCase();
        const containsBadWord = badWords.some(word => lowerCaseMessage.includes(word));
        
        if (containsBadWord & config.ANTI_BAD_WORD === 'true') {
          await conn.sendMessage(from, { delete: mek.key }, { quoted: mek });
          await conn.sendMessage(from, {
        'text': `*⚠️𝐖αʀɴιɴg 𝐏σʀи,𝐁α∂ 𝐖σʀ∂,𝐍υ∂є 𝐏ι¢ 𝐀ɴ∂.@${sender.split('@')[0]} 𝐕ι∂єσѕ 𝐍σт 𝐀ℓℓσωє∂ 𝐇єʀє📛*`,
        'mentions': [sender]
      }, { 'quoted': m });
        }
    } catch (error) {
        console.error(error)
        reply("An error occurred while processing the message.")
    }
})


const linkPatterns = [
    /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,   // WhatsApp group or chat links
    /wa\.me\/\S+/gi,                                      // wa.me links without https
    /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,           // Telegram links
    /https?:\/\/(?:www\.)?\.com\/\S+/gi,         // channel links
    /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,           // Twitter links
    /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,          // LinkedIn links
    /https?:\/\/(?:whatsapp\.com|channel\.me)\/\S+/gi,          // Snapchat links
    /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,            // Reddit links
    /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,           // Discord links
    /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,             // Twitch links
    /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,             // Vimeo links
    /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,       // Dailymotion links
    /https?:\/\/(?:www\.)?medium\.com\/\S+/gi             // Medium links
];

cmd({
  on: 'body'
}, async (conn, m, store, {
  from,
  body,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins
}) => {
  try {
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }

    const containsLink = linkPatterns.some(pattern => pattern.test(body));

    if (containsLink && config.DELETE_LINK === 'true') {
      await conn.sendMessage(from, { 'delete': m.key }, { 'quoted': m });
      await conn.sendMessage(from, {
        'text': `*⚠️𝐋ιɴкѕ 𝐀ʀє 𝐍σт 𝐀ℓℓσωє∂ 𝐈ɴ 𝐓нιѕ 𝐆ʀσυρ.@${sender.split('@')[0]} 𝐏ℓєαѕє 𝐀νσι∂ 𝐒єɴ∂ιиg 𝐋ιɴкѕ.📛*`,
        'mentions': [sender]
      }, { 'quoted': m });
    }
  } catch (error) {
    console.error(error);
  }
});
