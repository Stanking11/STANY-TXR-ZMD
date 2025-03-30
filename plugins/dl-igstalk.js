import pkg from 'api-qasim'
const { igStalk } = pkg;

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!args[0]) throw `✳️ ${mssg.noUsername}\n\n📌${mssg.example} : ${usedPrefix + command} truepakistanofficial`; 

    try {
        await m.react('⏳');
        let res = await igStalk(args[0]);

        let te = `
┌──「 *STANY TXR ZMD* 
▢ *🔖${mssg.name}:* ${res.name} 
▢ *🔖${mssg.username}:* ${res.username}
▢ *👥${mssg.followers}:* ${res.followers}
▢ *🫂${mssg.follows}:* ${res.following}
▢ *📌${mssg.bio}:* ${res.description}
▢ *🏝️${mssg.posts}:* ${res.posts}
▢ *🔗${mssg.link}:* https://instagram.com/${res.username.replace(/^@/, '')}
└────────────`;
        await m.react('✅');
        await conn.sendFile(m.chat, res.profilePic, 'tt.png', te, m);
    } catch (error) {
        m.reply(`✳️ ${error}`);
    }
}

handler.help = ['igstalk'];
handler.tags = ['dl'];
handler.command = ['igstalk'];

export default handler;
