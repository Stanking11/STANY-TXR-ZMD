module.exports = (client) => {
  client.ev.on('messages.upsert', async ({ messages }) => {
    if (!config.features.antiTag) return
    try {
      const msg = messages[0]
      if (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.includes(client.user.id)) {
        await client.sendMessage(msg.key.remoteJid, {
          text: `⚠️ Please don't tag the group!`,
          mentions: [msg.key.participant || msg.key.remoteJid]
        })
        await client.sendMessage(msg.key.remoteJid, { delete: msg.key })
      }
    } catch (error) {
      console.error('AntiTag error:', error)
    }
  })
}
