const { URL_REGEX, SHORTENER_REGEX } = require('../utils/patterns')
const violationTracker = new Map()

module.exports = (client) => {
  client.ev.on('messages.upsert', async ({ messages }) => {
    if (!config.features.antiLink) return
    
    try {
      const msg = messages[0]
      if (msg.key.fromMe || config.owner.includes(msg.key.participant)) return

      // Check if group and get metadata
      const isGroup = msg.key.remoteJid.endsWith('@g.us')
      let groupMetadata = null
      if (isGroup) {
        groupMetadata = await client.groupMetadata(msg.key.remoteJid)
      }

      // Check user privileges
      const userStatus = groupMetadata?.participants.find(
        p => p.id === msg.key.participant
      )?.admin || 'member'

      if (config.antiLinkSettings.checkAdmins && ['admin', 'superadmin'].includes(userStatus)) return

      // Detect links
      const text = msg.message?.conversation || 
                   msg.message?.extendedTextMessage?.text || ''
      const urls = [
        ...(text.match(URL_REGEX) || []),
        ...(text.match(SHORTENER_REGEX) || [])
      ]

      if (urls.length > 0) {
        const hasAllowed = urls.some(url => 
          config.antiLinkSettings.allowedDomains.some(domain => url.includes(domain))
        
        if (!hasAllowed) {
          const userId = msg.key.participant
          const violations = violationTracker.get(userId) || 0

          // Handle actions
          switch(config.antiLinkSettings.action) {
            case 'warn':
              await handleWarn(client, msg, userId, violations)
              break
            
            case 'delete':
              await client.sendMessage(msg.key.remoteJid, { delete: msg.key })
              break
            
            case 'kick':
              await handleKick(client, msg, userId)
              break
          }
        }
      }
    } catch (error) {
      console.error('AntiLink error:', error)
    }
  })
}

async function handleWarn(client, msg, userId, violations) {
  const { antiLinkSettings } = config
  const newViolations = violations + 1

  violationTracker.set(userId, newViolations)
  
  await client.sendMessage(msg.key.remoteJid, {
    text: `${antiLinkSettings.warnMessage} (${newViolations}/${antiLinkSettings.maxWarnings})`,
    mentions: [msg.key.participant]
  })

  if (newViolations >= antiLinkSettings.maxWarnings) {
    await handleKick(client, msg, userId)
    violationTracker.delete(userId)
  }
}

async function handleKick(client, msg, userId) {
  const isGroup = msg.key.remoteJid.endsWith('@g.us')
  
  if (isGroup) {
    try {
      await client.groupParticipantsUpdate(
        msg.key.remoteJid,
        [userId],
        'remove'
      )
      await client.sendMessage(msg.key.remoteJid, {
        text: `${config.antiLinkSettings.kickMessage} @${userId.split('@')[0]}`,
        mentions: [userId]
      })
    } catch (kickError) {
      console.error('Kick failed:', kickError)
      await client.sendMessage(msg.key.remoteJid, {
        text: "⚠️ Failed to remove user. Make sure I'm admin!"
      })
    }
  } else {
    await client.sendMessage(userId, {
      text: config.antiLinkSettings.kickMessage
    })
    await client.updateBlockStatus(userId, 'block')
  }
}
