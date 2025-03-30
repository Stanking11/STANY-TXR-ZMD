let handler = async (m, { args, usedPrefix, command }) => {
    // Check if the username (args[0]) is provided
    if (!args[0]) {
        return m.reply('Username and Repository name is missing. Example: STANKING11 TXR ZMD');
    }

    // Check if the repository (args[1]) is provided
    if (!args[1]) {
        return m.reply('Repository name is missing. Example: STANKING11');
    }

    // Construct the GitHub URL for the repository zip file
    let url = `https://github.com/${args[0]}/${args[1]}/archive/refs/heads/main.zip`;

    // Inform the user that the zip file is being processed
    m.reply('Waiting for the repository to be compressed into a zip file...');

    try {
        // Send the file to the user
        conn.sendFile(m.chat, url, `${args[1]}.zip`, null, m);
    } catch (e) {
        // Handle any potential errors during the file send operation
        console.error(e);
        m.reply('Failed to fetch the repository. Please make sure the repository exists and try again.');
    }
};

// Metadata for the handler
handler.help = ['github', 'githubdl'];
handler.tags = ['github'];
handler.command = ['github', 'githubdl'];

// Export the handler
export default handler;
