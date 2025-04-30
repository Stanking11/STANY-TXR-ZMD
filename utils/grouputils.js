module.exports = {
  isAdmin: async (client, groupJid, userJid) => {
    try {
      const metadata = await client.groupMetadata(groupJid)
      const participant = metadata.participants.find(p => p.id === userJid)
      return participant?.admin === 'admin' || participant?.admin === 'superadmin'
    } catch {
      return false
    }
  }
}
