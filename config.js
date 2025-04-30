module.exports = {
  name: 'Stany Tech',
  version: '3.1.0',
  prefix: '#',
  owner: ['255615490076'], // Your number with country code
  
  features: {
    antiCall: true,
    antiDelete: true,
    antiTag: true,
    antiSticker: true,
    antiLink: true
  },

  antiLink: {
    allowedDomains: ['wa.me', 'stanytech.com'],
    action: 'warn', // warn | delete | kick
    warnMessage: "⚠️ *Warning*: Links are not allowed here!",
    kickMessage: "🚫 User removed for sending links",
    maxWarnings: 3,
    checkAdmins: true,
    exemptGroups: ['12036300000-1581234@g.us'] // Group IDs
  },

  antiTag: {
    maxTags: 3,
    deleteMessage: true,
    warnMessage: "⚠️ Please don't tag the bot unnecessarily!"
  },

  antiSticker: {
    deleteSticker: true,
    warnMessage: "⚠️ Stickers are not allowed here!"
  }
}
