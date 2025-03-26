const { cmd } = require('../command');
const axios = require('axios');  // You need to install axios for HTTP requests

cmd({
    pattern: "repo",
    alias: ["repository", "source", "sourcecode"],
    desc: "Provides the repository link of the bot along with stats",
    category: "main",
    react: "🔗",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // GitHub Repository URL
        const repoLink = "https://github.com/Stanking11/STANY-TXR-ZMD";
        const apiUrl = `https://api.github.com/repos/Stanking11/STANY-TXR-ZMD`;  // GitHub API URL for your repo

        // Fetch repository data from GitHub API
        const { data } = await axios.get(apiUrl);

        // Extract relevant data
        const repoName = data.name;
        const forks = data.forks_count;
        const stars = data.stargazers_count;
        const lastUpdated = new Date(data.updated_at).toLocaleString();

        // Prepare the message with repo details
        const repoText = `
╭━━〔 *𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷™ - Repository* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *🔗 Repository Link*:
┃◈┃  [Click Here to View the Repository](${repoLink})
┃◈┃• *Repository Name*:
┃◈┃  ${repoName}
┃◈┃• *Total Forks*:
┃◈┃  ${forks}
┃◈┃• *Total Stars*:
┃◈┃  ${stars}
┃◈┃• *Last Updated*:
┃◈┃  ${lastUpdated}
┃◈└───────────┈⊷
╰──────────────┈⊷
> Powered by 𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷™`;

        // Send the repository details message
        await conn.sendMessage(from, { 
            text: repoText,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '@newsletter',
                    newsletterName: '𝚂𝚃𝙰𝙽𝚈-𝚃𝙴𝙲𝙷™',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in repo command:", e);
        reply(`An error occurred while fetching repository information: ${e.message}`);
    }
});
