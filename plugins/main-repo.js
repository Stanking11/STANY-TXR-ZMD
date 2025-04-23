const config = require('../config');
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch information about a GitHub repository.",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/Stanking11/STANY-TXR-ZMD';

    try {
        const match = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) return reply("Invalid GitHub URL.");

        const [, username, repoName] = match;

        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        if (!response.ok) throw new Error(`GitHub API Error: ${response.status}`);

        const data = await response.json();

        const message = `

> ᴛʜɪs ɪs* *STANY-TXR-ZMD.*\n sᴜᴘᴘᴏʀᴛ ᴏᴜʀ ᴄʜᴀɴɴᴇʟ *ʙʏ*,
> https://whatsapp.com/channel/0029Vb5RfcrJ3jv4u0wJwd0r
> ╔═━━━━════──────➳
> ║╔═━━━━━━════─━━─➳
> ║║ 🗼 *REPOSITORY:* ${data.html_url}
> ║║ 🌟 *STARS:* ${repoInfo.stars}
> ║║ 🧧 *FORKS:* ${repoInfo.forks}
> ║║ 📅 *RELEASE DATE:* ${releaseDate}
> ║║ 🕐 *UPDATE ON:* ${repoInfo.lastUpdate}
> ║║ 👨‍💻 *OWNER:* *574N6T3CH de STANY-TECH*
> ║║ 💞 *NAME:* *STANY-TECH-MD-BOT*
> ║║ 🥰 *ENJOY TO USE STANY-TXR-ZMD*
> ╚══━━━━════─━━━━──➳`;

> *Powered by  ©𝚂𝚃𝙰𝙽𝚈 𝚃𝚉𝚁 𝚉𝙼𝙳*
        `.trim();

        reply(message);

    } catch (err) {
        console.error("Repo Command Error:", err);
        reply("Failed to fetch repo info. Please try again later.");
    }
});
