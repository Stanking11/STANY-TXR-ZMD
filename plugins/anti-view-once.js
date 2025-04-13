const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');


/*
cmd({
    pattern: "vv",
    react : "🦠",
    alias: ['retrive', "viewonce"],
    desc: "Fetch and resend a ViewOnce message content (image/video/voice).",
    category: "misc",
    use: '<query>',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const quotedMessage = m.msg.contextInfo.quotedMessage; // Get quoted message

        if (quotedMessage && quotedMessage.viewOnceMessageV2) {
            const quot = quotedMessage.viewOnceMessageV2;
            if (quot.message.imageMessage) {
                let cap = quot.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.imageMessage);
                return conn.sendMessage(from, { image: { url: anu }, caption: cap }, { quoted: mek });
            }
            if (quot.message.videoMessage) {
                let cap = quot.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.videoMessage);
                return conn.sendMessage(from, { video: { url: anu }, caption: cap }, { quoted: mek });
            }
            if (quot.message.audioMessage) {
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.audioMessage);
                return conn.sendMessage(from, { audio: { url: anu } }, { quoted: mek });
            }
        }

        // If there is no quoted message or it's not a ViewOnce message
        if (!m.quoted) return reply("Please reply to a ViewOnce message.");
        if (m.quoted.mtype === "viewOnceMessage") {
            if (m.quoted.message.imageMessage) {
                let cap = m.quoted.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.imageMessage);
                return conn.sendMessage(from, { image: { url: anu }, caption: cap }, { quoted: mek });
            }
            else if (m.quoted.message.videoMessage) {
                let cap = m.quoted.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.videoMessage);
                return conn.sendMessage(from, { video: { url: anu }, caption: cap }, { quoted: mek });
            }
        } else if (m.quoted.message.audioMessage) {
            let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.audioMessage);
            return conn.sendMessage(from, { audio: { url: anu } }, { quoted: mek });
        } else {
            return reply("> *This is not a ViewOnce message.*");
        }
    } catch (e) {
        console.log("Error:", e);
        reply("An error occurred while fetching the ViewOnce message.");
    }
});
*/
/*cmd({
  'pattern': 'vv',
  'alias': ['retrive', 'viewonce'],
  'desc': "Fetch and resend a ViewOnce message content (image/video/voice).",
  'category': 'misc',
  'use': "<query>",
  'filename': __filename
}, async (_0x5a104f, _0x1d2e0c, _0x1759df, {
  from: _0x4d7a74,
  reply: _0x5545e9
}) => {
  try {
    const _0x1c9e5c = _0x1759df.msg.contextInfo.quotedMessage;
    if (_0x1c9e5c && _0x1c9e5c.viewOnceMessageV2) {
      const _0x3798cf = _0x1c9e5c.viewOnceMessageV2;
      if (_0x3798cf.message.imageMessage) {
        let _0x18b540 = _0x3798cf.message.imageMessage.caption;
        let _0x345d25 = await _0x5a104f.downloadAndSaveMediaMessage(_0x3798cf.message.imageMessage);
        return _0x5a104f.sendMessage(_0x4d7a74, {
          'image': {
            'url': _0x345d25
          },
          'caption': _0x18b540
        }, {
          'quoted': _0x1d2e0c
        });
      }
      if (_0x3798cf.message.videoMessage) {
        let _0x4fb901 = _0x3798cf.message.videoMessage.caption;
        let _0x2e752e = await _0x5a104f.downloadAndSaveMediaMessage(_0x3798cf.message.videoMessage);
        return _0x5a104f.sendMessage(_0x4d7a74, {
          'video': {
            'url': _0x2e752e
          },
          'caption': _0x4fb901
        }, {
          'quoted': _0x1d2e0c
        });
      }
      if (_0x3798cf.message.audioMessage) {
        let _0x137019 = await _0x5a104f.downloadAndSaveMediaMessage(_0x3798cf.message.audioMessage);
        return _0x5a104f.sendMessage(_0x4d7a74, {
          'audio': {
            'url': _0x137019
          }
        }, {
          'quoted': _0x1d2e0c
        });
      }
    }
    if (!_0x1759df.quoted) {
      return _0x5545e9("Please reply to a ViewOnce message.");
    }
    if (_0x1759df.quoted.mtype === "viewOnceMessage") {
      if (_0x1759df.quoted.message.imageMessage) {
        let _0x4e23b1 = _0x1759df.quoted.message.imageMessage.caption;
        let _0x14d7c9 = await _0x5a104f.downloadAndSaveMediaMessage(_0x1759df.quoted.message.imageMessage);
        return _0x5a104f.sendMessage(_0x4d7a74, {
          'image': {
            'url': _0x14d7c9
          },
          'caption': _0x4e23b1
        }, {
          'quoted': _0x1d2e0c
        });
      } else {
        if (_0x1759df.quoted.message.videoMessage) {
          let _0x4cf2b0 = _0x1759df.quoted.message.videoMessage.caption;
          let _0x5655fd = await _0x5a104f.downloadAndSaveMediaMessage(_0x1759df.quoted.message.videoMessage);
          return _0x5a104f.sendMessage(_0x4d7a74, {
            'video': {
              'url': _0x5655fd
            },
            'caption': _0x4cf2b0
          }, {
            'quoted': _0x1d2e0c
          });
        }
      }
    } else {
      if (_0x1759df.quoted.message.audioMessage) {
        let _0x5dfa37 = await _0x5a104f.downloadAndSaveMediaMessage(_0x1759df.quoted.message.audioMessage);
        return _0x5a104f.sendMessage(_0x4d7a74, {
          'audio': {
            'url': _0x5dfa37
          }
        }, {
          'quoted': _0x1d2e0c
        });
      } else {
        return _0x5545e9("> *This is not a ViewOnce message.*");
      }
    }
  } catch (_0x23e307) {
    console.log('Error:', _0x23e307);
    _0x5545e9("An error occurred while fetching the ViewOnce message.");
  }
});*/

cmd({
  'pattern': 'vv',
  'alias': ['retrive', 'viewonce'],
  'desc': "Fetch and resend a ViewOnce message content (image/video/voice).",
  'category': 'misc',
  'use': "<query>",
  'filename': __filename
}, async (client, message, args, { from, reply }) => {
  try {
    console.log("Received message:", message);

    // Vérifier si un message cité est présent
    const quotedMessage = message.msg?.contextInfo?.quotedMessage || message.quoted?.message;
    if (!quotedMessage) {
      return reply("⚠️ Please reply to a message *ViewOnce*.");
    }

    console.log("Quoted message found:", quotedMessage);

    // Vérifier si c'est un message ViewOnce
    const viewOnceContent = quotedMessage.viewOnceMessageV2 || quotedMessage.viewOnceMessage;
    if (!viewOnceContent) {
      return reply("⚠️ This message is not a *ViewOnce*.");
    }

    console.log("ViewOnce content found:", viewOnceContent);

    // Détection du type de message et récupération du média
    if (viewOnceContent.message?.imageMessage) {
      let caption = viewOnceContent.message.imageMessage.caption || "📷 Image ViewOnce";
      let mediaPath = await client.downloadAndSaveMediaMessage(viewOnceContent.message.imageMessage);
      console.log("Image downloaded to:", mediaPath);

      return client.sendMessage(from, {
        image: { url: mediaPath },
        caption: caption
      }, { quoted: message });
    }

    if (viewOnceContent.message?.videoMessage) {
      let caption = viewOnceContent.message.videoMessage.caption || "🎥 Vidéo ViewOnce";
      let mediaPath = await client.downloadAndSaveMediaMessage(viewOnceContent.message.videoMessage);
      console.log("Video downloaded to:", mediaPath);

      return client.sendMessage(from, {
        video: { url: mediaPath },
        caption: caption
      }, { quoted: message });
    }

    if (viewOnceContent.message?.audioMessage) {
      let mediaPath = await client.downloadAndSaveMediaMessage(viewOnceContent.message.audioMessage);
      console.log("Audio downloaded to:", mediaPath);

      return client.sendMessage(from, {
        audio: { url: mediaPath }
      }, { quoted: message });
    }

    return reply("⚠️ This type of message *ViewOnce* is not supported.");

  } catch (error) {
    console.error("Error fetching ViewOnce message:", error);
    reply("❌ An error occurred while retrieving the message *ViewOnce*.");
  }
});
