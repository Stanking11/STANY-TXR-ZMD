// utils/command.js
const bot = { plugins: {} };
const commands = new Map();
const categories = new Set();

function cmd(config, handler) {
    // Validate command configuration
    if (!config.pattern) throw new Error('Command pattern is required');
    if (!handler) throw new Error('Command handler is required');
    
    // Default configuration
    const command = {
        pattern: config.pattern.toLowerCase(),
        alias: config.alias || [],
        desc: config.desc || 'No description provided',
        category: config.category || 'general',
        react: config.react || '✨',
        use: config.use || '',
        filename: config.filename || 'unknown',
        cooldown: config.cooldown || 3000,
        adminOnly: config.adminOnly || false,
        groupOnly: config.groupOnly || false,
        ownerOnly: config.ownerOnly || false,
        handler
    };

    // Register main command
    commands.set(command.pattern, command);
    
    // Register aliases
    command.alias.forEach(alias => {
        commands.set(alias.toLowerCase(), { ...command, isAlias: true });
    });

    // Register category
    categories.add(command.category);

    // Add to plugin system
    bot.plugins[command.category] = bot.plugins[command.category] || {};
    bot.plugins[command.category][command.pattern] = command;
}

function getCommand(pattern) {
    return commands.get(pattern.toLowerCase());
}

function getCommandsByCategory() {
    const categorized = {};
    categories.forEach(category => {
        categorized[category] = Array.from(commands.values())
            .filter(cmd => cmd.category === category && !cmd.isAlias);
    });
    return categorized;
}

function generateHelp(config) {
    const categorized = getCommandsByCategory();
    let helpText = `*${config.botName} Command List*\n\n`;
    
    Object.entries(categorized).forEach(([category, cmds]) => {
        helpText += `*${category.toUpperCase()}*\n`;
        cmds.forEach(cmd => {
            helpText += `➤ *${config.prefix}${cmd.pattern}* ${cmd.alias.length ? `(${cmd.alias.join(', ')})` : ''}\n`;
            helpText += `   ↳ ${cmd.desc}\n`;
            helpText += `   Usage: ${config.prefix}${cmd.pattern} ${cmd.use}\n\n`;
        });
    });
    
    return helpText;
}

module.exports = {
    cmd,
    getCommand,
    getCommandsByCategory,
    generateHelp,
    commands,
    categories,
    bot
};
