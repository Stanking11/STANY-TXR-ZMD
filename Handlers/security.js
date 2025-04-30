module.exports = {
    verifyMessage: async (client, msg, context) => {
        try {
            // Anti-Bot Tag Protection
            if (context.isGroup && config.security.antiBotTag) {
                const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
                if (mentions.includes(context.botJid)) {
                    await client.sendMessage(context.jid, { 
                        text: config.messages.botTagWarning,
                        delete: msg.key
                    });
                    return false;
                }
            }

            // Anti-Link Protection
            if (config.security.antiLink) {
                const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
                if (linkRegex.test(JSON.stringify(context.content))) {
                    await client.sendMessage(context.jid, { 
                        text: config.messages.linkWarning,
                        delete: msg.key
                    });
                    if (config.security.antiLinkKick) {
                        await client.groupParticipantsUpdate(context.jid, [context.user], 'remove');
                    }
                    return false;
                }
            }

            // Anti-Sticker Protection
            if (config.security.antiSticker && context.content.stickerMessage) {
                await client.sendMessage(context.jid, { delete: msg.key });
                return false;
            }

            return true;

        } catch (error) {
            console.error('Security verification error:', error);
            return false;
        }
    }
};
