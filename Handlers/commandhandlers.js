// handlers/commandHandler.js
module.exports = {
  handleCommand: (bot, msg, cmd, args, isGroup, user, config) => {
    const commands = {
      ping: async () => {
        const start = Date.now();
        await bot.sendMessage(msg.key.remoteJid, { text: 'Pong! 🏓' });
        const latency = Date.now() - start;
        await bot.sendMessage(msg.key.remoteJid, { text: `⚡ Latency: ${latency}ms` });
      },
      help: async () => {
        const features = [
          `*${config.session.browser[0]} Features*`,
          '• Anti-spam System',
          '• Auto-moderation',
          '• Media Tools',
          '• Downloaders',
          '• Game System',
          '• AI Features'
        ].join('\n');
        await bot.sendMessage(msg.key.remoteJid, { text: features });
      },
      owner: async () => {
        await bot.sendMessage(msg.key.remoteJid, { text: `👑 Owner: ${config.owner.number}` });
      }
    };

    if (commands[cmd]) commands[cmd]();
  }
};
