import pkg from 'api-qasim';
const { tiktokStalk } = pkg;

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!args[0]) throw `✳️ ${mssg.noUsername}\n\n📌${mssg.example} : ${usedPrefix + command} discoverpakistantv`;

    try {
        await m.react('⏳');
        // Fetching the TikTok user details from the API
        let res = await tiktokStalk(args[0]);

        // Extracting relevant data from the API response
        const { name, username, followers, following, description, profilePic } = res.obj;

        // Formatting the message with relevant information
        let te = `
┌──「 *STANY TXR ZMD* 
▢ *🔖Name:* ${username || 'No Username'}
▢ *🔖Username:* ${name || 'Unknown'}
▢ *👥Followers:* ${followers || 'N/A'}
▢ *🫂Following:* ${following || 'N/A'}
▢ *📌Bio:* ${description || 'No bio available'}
▢ *🔗Link:* https://www.tiktok.com/@${name.replace(/^@/, '') || 'NoUsername'}
└────────────`;

        // Handle profilePic: If it's missing, use a default fallback image
        const imageToSend = profilePic || 'https://upload.wikimedia.org/wikipedia/commons/8/85/TikTok_logo_2018.svg';
        await m.react('✅');

        // Send the formatted message and the profile picture (or default image)
        await conn.sendFile(m.chat, imageToSend, 'tt.png', te, m);
    } catch (error) {
        m.reply(`✳️ ${mssg.error}: ${error.message || error}`);
    }
}

handler.help = ['ttstalk', 'tiktokstalk'];
handler.tags = ['dl'];
handler.command = ['ttstalk', 'tiktokstalk'];

export default handler;
