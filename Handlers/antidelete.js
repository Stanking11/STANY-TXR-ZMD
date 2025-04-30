module.exports = (client) => {
  client.ev.on('messages.delete', async (deleteData) => {
    if (!config.features.antiDelete) return
    try {
      const message = await client.loadMessage(deleteData.id)
      const sender = message.key.fromMe ? 'You' : message.pushName
      
      await client.sendMessage(deleteData.id.remote, {
        text: `⚠️ ${sender} deleted a message!\n` +
              `Content: ${message.message?.conversation || 'Media message'}`
      })
    } catch (error) {
      console.error('AntiDelete error:', error)
    }
  })
}
