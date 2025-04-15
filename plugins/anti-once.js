const { cmd } = require("../command");

cmd({
  pattern: "vv2",
  alias: ["wah", "ohh", "oho", "🙂", "nice", "ok"],
  desc: "Owner Only - retrieve quoted message back to user",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from, isOwner }) => {
  try {
    if (!isOwner) return;

    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "*🍁 Please reply to a view once message!*"
      }, { quoted: message });
    }

    const buffer = await match.quoted.download();
    const mtype = match.quoted.mtype;
    const options = { quoted: message };

    let messageContent = {};

    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: "🖼️ Here is your image opened by * ©𝚂𝚃𝙰𝙽𝚈 𝚃𝚉𝚁 𝚉𝙼𝙳*",
          mimetype: match.quoted.mimetype || "image/jpeg"
        };
        break;

      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: "🎥 Here is your video opened by * ©𝚂𝚃𝙰𝙽𝚈 𝚃𝚉𝚁 𝚉𝙼𝙳*",
          mimetype: match.quoted.mimetype || "video/mp4"
        };
        break;

      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: match.quoted.ptt || false,
          caption: "🎧 Here is your audio opened by * ©𝚂𝚃𝙰𝙽𝚈 𝚃𝚉𝚁 𝚉𝙼𝙳*" // Note: audio doesn't support caption on all clients
        };
        break;

      default:
        return await client.sendMessage(from, {
          text: "❌ Only image, video, and audio messages are supported"
        }, { quoted: message });
    }

    // Send back to the same chat
    await client.sendMessage(message.chat, messageContent, options);

  } catch (error) {
    console.error("vv Error:", error);
    await client.sendMessage(from, {
      text: "❌ Error fetching vv message:\n" + error.message
    }, { quoted: message });
  }
});
