// handlers/antiFeatures.js
module.exports = {
  handleAntiFeatures: async (bot, msg, isGroup, user, config) => {
    const message = msg.message;
    const content = JSON.stringify(message).toLowerCase();

    // Anti Link
    if (config.security.antiLink.enabled && /https?:\/\/[^\s]+/gi.test(content)) {
      await bot.sendMessage(msg.key.remoteJid, { delete: msg.key });
      if (config.security.antiLink.kick && isGroup) {
        await bot.groupParticipantsUpdate(msg.key.remoteJid, [user], 'remove');
      }
    }

    // Anti Bad Word
    if (config.security.antiBadWord.enabled && config.security.antiBadWord.list.some(word => content.includes(word))) {
      await bot.sendMessage(msg.key.remoteJid, { delete: msg.key });
      if (config.security.antiBadWord.kick && isGroup) {
        await bot.groupParticipantsUpdate(msg.key.remoteJid, [user], 'remove');
      }
    }

    // Anti Sticker
    if (config.security.antiSticker.enabled && message.stickerMessage) {
      await bot.sendMessage(msg.key.remoteJid, { delete: msg.key });
      if (config.security.antiSticker.kick && isGroup) {
        await bot.groupParticipantsUpdate(msg.key.remoteJid, [user], 'remove');
      }
    }

    // Anti Delete
    if (config.security.antiDelete && message.protocolMessage?.type === 7) {
      await bot.sendMessage(msg.key.remoteJid, { text: '⚠️ Message deletion detected!' });
    }
  }
};
