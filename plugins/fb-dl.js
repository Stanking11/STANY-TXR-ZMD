const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fbdl",
  alias: ["facebook", "fb"],
  react: '⏰',
  desc: "Download videos from Facebook.",
  category: "download",
  use: ".fbdl <Facebook video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    // Check if the user provided a Facebook video URL
    const fbUrl = args[0];
    if (!fbUrl || !fbUrl.includes("facebook.com")) {
      return reply('*𝐏ℓєαʂє 𝐏ɼ๏νιɖє 𝐀 fb҇ 𝐕ιɖє๏ ๏ɼ ɼєєℓ 𝐔ɼℓ..*');
    }

    // Add a reaction to indicate processing
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Prepare the API URL
    const apiUrl = `https://apis.davidcyriltech.my.id/facebook2?url=${encodeURIComponent(fbUrl)}`;

    // Call the API using GET
    const response = await axios.get(apiUrl);

    // Check if the API response is valid
    if (!response.data || !response.data.status || !response.data.video) {
      return reply('❌ Unable to fetch the video. Please check the URL and try again.');
    }

    // Extract the video details
    const { title, thumbnail, downloads } = response.data.video;

    // Get the highest quality download link (HD or SD)
    const downloadLink = downloads.find(d => d.quality === "HD")?.downloadUrl || downloads[0].downloadUrl;

    // Inform the user that the video is being downloaded
   // await reply('```Downloading video... Please wait.📥```');

    // Download the video
    const videoResponse = await axios.get(downloadLink, { responseType: 'arraybuffer' });
    if (!videoResponse.data) {
      return reply('❌ Failed to download the video. Please try again later.');
    }

    // Prepare the video buffer
    const videoBuffer = Buffer.from(videoResponse.data, 'binary');

    // Send the video with details
    await conn.sendMessage(from, {
      video: videoBuffer,
      caption: `*STANY TXR ZMD*\n\n` +
        `🔖 *TITLE*: ${title}\n` +
        `📏 *QUALITY*: ${downloads.find(d => d.quality === "HD") ? "HD" : "SD"}\n\n` +
        `> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ©𝚂𝚃𝙰𝙽𝚈 𝚃𝚇𝚁 𝚉𝙼𝙳*`,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: false,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363318387454868@newsletter',
          newsletterName: '『 𝐀ɭīī 𝐌Ɗ 𝐅𝐁 𝐃𝐋 』',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

    // Add a reaction to indicate success
    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('Error downloading video:', error);
    reply('❌ Unable to download the video. Please try again later.');

    // Add a reaction to indicate failure
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});

        
