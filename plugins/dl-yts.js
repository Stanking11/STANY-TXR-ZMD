import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) throw '✳️ What do you want me to search for on YouTube?'
  await m.react('⏳'); // React with a loading emoji

  try {
    const query = encodeURIComponent(text)
    const response = await axios.get(`https://weeb-api.vercel.app/ytsearch?query=${query}`)
    const results = response.data

    if (results.length === 0) {
      throw 'No results found for the given query.'
    }

    // Get at least 10 results, but if there are fewer, use all of them
    const resultsToSend = results.slice(0, 10)

    let message = 'Here are the top results:\n\n'
    resultsToSend.forEach((result, index) => {
      message += `
乂 ${index + 1}. ${result.title}
乂 *Link* : ${result.url}
乂 *Duration* : ${result.timestamp}
乂 *Published* : ${result.ago}
乂 *Views:* ${result.views}

      `
    })
    await m.react('✅'); // React with a done emoji

    // Send the message along with the thumbnail of the first result
    conn.sendFile(m.chat, resultsToSend[0].thumbnail, 'yts.jpeg', message, m)

  } catch (error) {
    console.error(error)
    throw 'An error occurred while searching for YouTube videos.'
  }
}

handler.help = ['ytsearch']
handler.tags = ['downloader']
handler.command = ['ytsearch', 'yts']

export default handler
