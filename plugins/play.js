const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");

cmd({
  pattern: "play",
  alias: ["yta2", "ytplay2"],
  react: '⏳',
  desc: "Download audio from YouTube by searching for keywords.",
  category: "music",
  use: ".playx <keywords>",
  filename: __filename
}, async (conn, m, text, { from, args, reply }) => {
  try {
    const searchQuery = args.join(" ");
    if (!searchQuery) {
      return reply("*Please provide an audio title or URL.*");
    }

    reply(">©𝚂𝚃𝙰𝙽𝚈 𝚃𝚇𝚁 𝚉𝙼𝙳 ɢᴇɴᴇʀᴀᴛɪɴɢ sᴏɴɢ 𝚃𝙾 𝚈𝙾𝚄🤩 ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ...");

    const searchResult = await yts(searchQuery);
    if (!searchResult.videos || searchResult.videos.length === 0) {
      return reply(`❌ No results found for "${searchQuery}".`);
    }

    const video = searchResult.videos[0];
    const videoUrl = video.url;

    const apiUrl = `https://apis.davidcyriltech.my.id/play?query=${videoUrl}`;
    const { data } = await axios.get(apiUrl);

    if (!data.success) {
      return reply(`❌ Failed to fetch audio for "${searchQuery}".`);
    }

    const { download_url } = data.result;

    await conn.sendMessage(from, {
      audio: { url: download_url },
      mimetype: "audio/mp4",
      ptt: false
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    reply("❌ An error occurred while processing your request.");
  }
});
