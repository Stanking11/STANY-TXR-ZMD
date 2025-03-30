import pkg from 'api-qasim'
const { xdown } = pkg;

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) throw `✳️ You need to provide the URL of any X (Twitter) video, post, reel, or image.`;

  await m.react('⏳'); // React with a loading emoji

  let res;
  try {
    res = await xdown(text); // Get the download link from the API
  } catch (error) {
    throw `❌ An error occurred while fetching the media: ${error.message}`;
  }

  // Check if response contains media
  if (!res || !res.media || res.media.length === 0) {
    throw '❌ No media found for the provided URL.';
  }

  // Process the media array
  const mediaArray = res.media;

  for (const mediaData of mediaArray) {
    const mediaType = mediaData.type;
    const mediaURL = mediaData.url;

    let caption = `Here is the ${mediaType.toUpperCase()}\n\n*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 ©𝚂𝚃𝙰𝙽𝚈 𝚃𝚇𝚁 𝚉𝙼𝙳 *`;

    // Send media based on type
    if (mediaType === 'video') {
      await conn.sendFile(m.chat, mediaURL, 'x.mp4', caption, m);
    } else if (mediaType === 'image') {
      await conn.sendFile(m.chat, mediaURL, 'x.jpg', caption, m);
    } else {
      // If the media type is unknown
      await m.reply(`❌ Unsupported media type: ${mediaType}`);
    }
  }

  await m.react('✅'); // React with a success emoji
};

handler.help = ['Twitter', 'xdl'];
handler.tags = ['downloader'];
handler.command = /^(twitter|xdl)$/i;

export default handler;
