module.exports = {
  name: 'Stany Tech',
  version: '2.0.1',
  prefix: '#',
  owner: ['255612285041'], // STANY-TXR-ZMD 
  allowedGroups: [], // Add group IDs if needed
  maxTagLimit: 5,
  features: {
    antiCall: true,
    antiDelete: true,
    antiTag: true,
    antiSticker: true
  module.exports = {
  // ... previous config
  features: {
    // ... existing features
    antiLink: true,
  },
  antiLinkSettings: {
    allowedDomains: ['wa.me', 'stanytech.com'],
    action: 'warn', // warn | delete | kick
    warnMessage: "⚠️ Links are not allowed!",
    kickMessage: "🚫 Removed for sending links",
    maxWarnings: 3,
    exemptRoles: ['admin', 'owner'],
    checkAdmins: true
  }
  }
