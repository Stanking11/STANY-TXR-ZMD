module.exports = (client) => {
  client.ev.on('call', async (call) => {
    if (!config.features.antiCall) return
    try {
      await client.sendMessage(call.from, { 
        text: `⚠️ Calls are not allowed!`
      })
      await client.updateBlockStatus(call.from, 'block')
    } catch (error) {
      console.error('AntiCall error:', error)
    }
  })
}
