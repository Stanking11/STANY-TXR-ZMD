// utils/config.js
module.exports = {
  session: {
    id: process.env.SESSION_ID,
    browser: [process.env.BOT_NAME || '𝚂𝚃𝙰𝙽𝚈-𝚃𝚇𝚁-𝚉𝙼𝙳', 'Chrome', '121.0.6167.160'],
    options: {
      printQRInTerminal: false,
      markOnlineOnConnect: true
    }
  },
  features: {
    prefix: process.env.PREFIX || '.',
    presence: ['typing', 'recording', 'online'][Number(process.env.PRESENCE_MODE || '1') - 1],
    autoRead: process.env.AUTO_READ === '1',
    mode: process.env.MODE === '1' ? 'public' : 'private'
  },
  security: {
    antiCall: process.env.ANTICALL === '1',
    antiLink: {
      enabled: process.env.ANTILINK === '1',
      kick: process.env.ANTILINK_KICK === '1'
    },
    antiBadWord: {
      enabled: process.env.ANTIBADWORD === '1',
      kick: process.env.ANTIBADWORD_KICK === '1',
      list: (process.env.BAD_WORDS_LIST || 'nude,sex,porn,fuck,bitch').split(',').map(w => w.trim().toLowerCase())
    },
    antiSticker: {
      enabled: process.env.ANTISTICKER === '1',
      kick: process.env.ANTISTICKER_KICK === '1'
    },
    antiDelete: process.env.ANTIDELETE === '1',
    antiBot: {
      enabled: process.env.ANTIBOT === '1',
      kick: process.env.ANTIBOT_KICK === '1'
    }
    security: {
  // ...
  cooldown: 3000 // 3 second cooldown
  },
  owner: {
    number: process.env.OWNER_NUMBER,
    alive: {
      image: process.env.ALIVE_IMG,
      message: process.env.LIVE_MSG || '> STANY-TXR AM ONLINE BY MY HANDSOME CREATOR⚡'
    }
  }
};
