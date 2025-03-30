import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import pkg from 'api-qasim'; // Import ytmp4 from api-qasim package
import yts from 'youtube-yts';
import ffmpeg from 'fluent-ffmpeg'; // Import fluent-ffmpeg for video to audio conversion
import { promisify } from 'util';
import { pipeline } from 'stream';
import mime from 'mime-types';  // Import mime-types to dynamically determine MIME type

const { ytmp4 } = pkg;
const streamPipeline = promisify(pipeline);

// Create __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Custom temporary directory
const customTmpDir = path.join(__dirname, 'custom_tmp');

// Ensure the custom_tmp directory exists
if (!fs.existsSync(customTmpDir)) {
  fs.mkdirSync(customTmpDir);
}

const handler = async (m, { conn, command, text, args, usedPrefix }) => {
  if (!text) throw `Give a text to search Example: *${usedPrefix + command}* sefali odia song`;
  conn.ultra = conn.ultra ? conn.ultra : {};
  await m.react('🎶');
  const result = await searchAndDownloadMusic(text);
  const infoText = `✦ ──『 *STANY TXR ZMD MUSIC DOWNLOAD* 』── ⚝ \n\n [ 😍 Reply the number of the desired search result to get the Audio]. \n\n`;

  const orderedLinks = result.allLinks.map((link, index) => {
    const sectionNumber = index + 1;
    const { title, url } = link;
    return `*${sectionNumber}.* ${title}`;
  });

  const orderedLinksText = orderedLinks.join('\n\n');
  const fullText = `${infoText}\n\n${orderedLinksText}`;
  const { key } = await conn.reply(m.chat, fullText, m);
  conn.ultra[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
        delete: key,
      });
      delete conn.ultra[m.sender];
    }, 150 * 1000),
  };
};

handler.before = async (m, { conn }) => {
  conn.ultra = conn.ultra ? conn.ultra : {};
  if (m.isBaileys || !(m.sender in conn.ultra)) return;
  const { result, key, timeout } = conn.ultra[m.sender];

  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
  const choice = m.text.trim();
  const inputNumber = Number(choice);
  if (inputNumber >= 1 && inputNumber <= result.allLinks.length) {
    const selectedUrl = result.allLinks[inputNumber - 1].url;

    try {
      // Fetch video details using ytmp4
      const response = await ytmp4(selectedUrl);

      // Validate response and ensure we have a video URL
      if (!response || !response.video) {
        throw new Error('No video URL found.');
      }

      const videoUrl = response.video;

      // Fetch the video file buffer
      const mediaResponse = await fetchWithRetry(videoUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
        },
      });

      const contentType = mediaResponse.headers.get('content-type');
      if (!contentType || !contentType.includes('video')) {
        throw new Error('Invalid content type received');
      }

      const arrayBuffer = await mediaResponse.arrayBuffer();
      const mediaBuffer = Buffer.from(arrayBuffer);
      if (mediaBuffer.length === 0) throw new Error('Downloaded file is empty');

      // Create a temporary file for the video in the custom directory
      const videoPath = path.join(customTmpDir, 'video.mp4');
      fs.writeFileSync(videoPath, mediaBuffer);

      // Convert the video to audio (MP3 format) using ffmpeg
      const audioPath = path.join(customTmpDir, 'audio.mp3');

      // Convert video to audio and send only the audio
      ffmpeg(videoPath)
        .audioCodec('libmp3lame')
        .audioBitrate(128)
        .toFormat('mp3')
        .on('start', () => {})
        .on('progress', () => {})
        .on('stderr', () => {})
        .on('end', async () => {
          // Ensure audio file exists and is not empty
          if (fs.existsSync(audioPath) && fs.statSync(audioPath).size > 0) {
            const caption = `*Title:* ${response.title || 'No Title'}\n` +
                            `*Author:* ${response.author || 'Unknown'}\n` +
                            `*Duration:* ${response.duration || 'Unknown'}\n` +
                            `*Views:* ${response.views || '0'}\n` +
                            `*Uploaded on:* ${response.upload || 'Unknown Date'}`;

            // Send the converted audio only, no video
            const mimeType = mime.lookup(audioPath) || 'audio/mpeg';
            await conn.sendFile(m.chat, audioPath, 'audio.mp3', caption, m, false, {
              mimetype: mimeType,
              ptt: false,
            });
          } else {
            console.error('Audio file is empty or not found!');
            m.reply('Failed to convert video to audio. Please try again later.');
          }

          // Clean up the temporary video and audio files immediately
          fs.unlinkSync(videoPath); // Delete the video file after conversion
          fs.unlinkSync(audioPath); // Delete the audio file after sending
        })
        .on('error', (err) => {
          m.reply('An error occurred while converting the video to audio. Please try again later.');
        })
        .save(audioPath); // Save audio file
    } catch (error) {
      console.error('Error fetching video:', error.message);
      await m.reply('An error occurred while fetching the video. Please try again later.');
      await m.react('❌');
    }
  } else {
    m.reply(
      'Invalid sequence number. Please select the appropriate number from the list above.\nBetween 1 to ' +
        result.allLinks.length
    );
  }
};

handler.help = ['play'];
handler.tags = ['downloader'];
handler.command = ['play2', 'song', 'spotify', 'playsong', 'ytplay'];

export default handler;

async function searchAndDownloadMusic(query) {
  try {
    const { videos } = await yts(query);
    if (!videos.length) return 'Sorry, no video results were found for this search.';

    const allLinks = videos.map(video => ({
      title: video.title,
      url: video.url,
    }));

    const jsonData = {
      title: videos[0].title,
      description: videos[0].description,
      duration: videos[0].duration,
      author: videos[0].author.name,
      allLinks: allLinks,
      videoUrl: videos[0].url,
      thumbnail: videos[0].thumbnail,
    };

    return jsonData;
  } catch (error) {
    return 'Error: ' + error.message;
  }
}

async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, options);
    if (response.ok) return response;
  }
  throw new Error('Failed to fetch media content after retries');
                    }
