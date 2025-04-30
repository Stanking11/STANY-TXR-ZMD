// handlers/commandHandler.js
const { getCommand, getCommandsByCategory } = require('../utils/command');
const config = require('../utils/config');
const { antiSpam } = require('./antiSpam');
const strings = require('../utils/strings');

module.exports = {
  handleCommand: async (bot, msg) => {
    try {
      const { key, message } = msg;
      const text = message?.conversation || message?.extendedTextMessage?.text || '';
      const prefix = config.features.prefix;
      
      if (!text.startsWith(prefix)) return;
      
      // Extract command and arguments
      const [cmdName, ...args] = text.slice(prefix.length).trim().split(/ +/);
      const command = getCommand(cmdName);
      
      if (!command) return;
      
      // Context information
      const context = {
        chatId: key.remoteJid,
        userId: key.participant || key.remoteJid,
        isGroup: key.remoteJid.endsWith('@g.us'),
        args,
        text: args.join(' '),
        reply: (content, options) => 
          bot.sendMessage(key.remoteJid, { text: content, ...options }, { quoted: msg }),
        react: (emoji) => 
          bot.sendMessage(key.remoteJid, { react: { text: emoji, key: key } })
      };

      // Security checks
      if (!(await checkPrivileges(bot, context, command))) return;
      if (antiSpam.check(context.userId)) return context.reply(strings.ANTI_SPAM);

      // Execute command
      try {
        await command.handler(bot, msg, context);
        antiSpam.add(context.userId);
      } catch (error) {
        handleCommandError(error, context);
      }
    } catch (error) {
      console.error('Command handler error:', error);
    }
  },

  generateHelp: (category) => {
    const commands = getCommandsByCategory()[category] || getCommandsByCategory();
    let helpText = `*${config.identity.name} Command List*\n\n`;
    
    Object.entries(commands).forEach(([cat, cmds]) => {
      if (category && cat !== category) return;
      helpText += `*${cat.toUpperCase()}*\n`;
      cmds.forEach(cmd => {
        helpText += `➤ *${config.features.prefix}${cmd.pattern}* ${cmd.alias?.length ? `(${cmd.alias.join(', ')})` : ''}\n`;
        helpText += `   ↳ ${cmd.desc}\n`;
        helpText += `   Usage: ${config.features.prefix}${cmd.pattern} ${cmd.use}\n\n`;
      });
    });
    
    return helpText;
  }
};

async function checkPrivileges(bot, context, command) {
  // Owner check
  if (command.ownerOnly && context.userId !== config.owner.number) {
    await context.reply(strings.OWNER_ONLY);
    return false;
  }

  // Group check
  if (command.groupOnly && !context.isGroup) {
    await context.reply(strings.GROUP_ONLY);
    return false;
  }

  // Admin check
  if (command.adminOnly && context.isGroup) {
    const metadata = await bot.groupMetadata(context.chatId);
    const isAdmin = metadata.participants.find(p => p.id === context.userId)?.admin;
    if (!isAdmin) {
      await context.reply(strings.ADMIN_ONLY);
      return false;
    }
  }

  return true;
}

function handleCommandError(error, context) {
  console.error(`Command error in ${context.chatId}:`, error);
  const errorMessage = error.response?.data?.error || error.message;
  
  context.reply(`${strings.ERROR_HEADER}\n` +
    `*Error:* ${errorMessage}\n` +
    `${strings.ERROR_FOOTER}`);
}
