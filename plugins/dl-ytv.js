import fetch from 'node-fetch';
import pkg from 'api-qasim';
const { ytmp4 } = pkg;

const fetchWithRetry = async (url, options, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        const response = await fetch(url, options);
        if (response.ok) return response;
        console.log(`Retrying... (${i + 1})`);
    }
    throw new Error('Failed to fetch media content after retries');
};

const handler = async (m, { args, conn, usedprefix }) => {
    // Check if a URL was provided
    if (!args.length) {
        await m.reply('Please provide a YouTube URL.');
        return;
    }

    const url = args.join(' '); // Join arguments to handle spaces in URLs
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

    // Validate the URL format
    if (!youtubeRegex.test(url)) {
        await m.react('❌'); // React with a cross emoji for invalid URL
        await m.reply('Invalid YouTube URL. Please provide a valid URL.');
        return;
    }

    await m.react('⏳'); // React with a loading emoji

    try {
        // Fetch video details with ytdown
        const response = await ytmp4(url);
        
        // Check if response is valid and contains 'video' field
        if (!response || !response.video) {
            console.error('Invalid response structure:', response); // Log invalid response for better debugging
            throw new Error('Invalid response from the downloader.');
        }

        const videoUrl = response.video; // Use the 'video' key for the URL
        if (!videoUrl) {
            throw new Error('Video URL not found.');
        }

        const title = response.title || 'video';
        const author = response.author || 'Unknown Author';
        const duration = response.duration || 'N/A';
        const views = response.views || '0';
        const uploadDate = response.upload || 'Unknown Date';
        const thumbnail = response.thumbnail || '';
        
        const caption = `*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 ©STANY TXR ZMD*\n\n` +
                        `*Title:* ${title}\n` +
                        `*Author:* ${author}\n` +
                        `*Duration:* ${duration}\n` +
                        `*Views:* ${views}\n` +
                        `*Uploaded on:* ${uploadDate}`;

        // Fetch the video file with retry
        const mediaResponse = await fetchWithRetry(videoUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
                'Accept': 'application/json, text/plain, */*'
            }
        });

        const contentType = mediaResponse.headers.get('content-type');
        if (!contentType || !contentType.includes('video')) {
            throw new Error('Invalid content type received');
        }

        const arrayBuffer = await mediaResponse.arrayBuffer();
        const mediaBuffer = Buffer.from(arrayBuffer);
        if (mediaBuffer.length === 0) throw new Error('Downloaded file is empty');

        // Send the video file along with the caption
        await conn.sendFile(m.chat, mediaBuffer, `null`, caption, m, false, {
            mimetype: 'video/mp4',
            thumbnail: thumbnail
        });

        await m.react('✅'); // React with a checkmark emoji for success
    } catch (error) {
        console.error('Error fetching video:', error.message, error.stack);
        await m.reply('An error occurred while fetching the video. Please try again later.');
        await m.react('❌'); // React with a cross emoji for errors
    }
};

handler.help = ['ytmp4', 'ytv'];
handler.tags = ['dl'];
handler.command = ['ytmp4', 'ytv'];

export default handler;
