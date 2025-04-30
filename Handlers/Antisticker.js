module.exports = (client) => {
  client.ev.on('messages.upsert', async ({ messages }) => {
    if (!config.features.antiSticker) return
    try {
      const msg = messages[0]
      if (msg.message?.stickerMessage) {
        await client.sendMessage(msg.key.remoteJid, {
          text: `⚠️ Stickers are not allowed here!`,
          mentions: [msg.key.participant || msg.key.remoteJid]
        })
        await client.sendMessage(msg.key.remoteJid, { delete: msg.key })
      }
    } catch (error) {
      console.error('AntiSticker error:', error)
    }
  })
}
