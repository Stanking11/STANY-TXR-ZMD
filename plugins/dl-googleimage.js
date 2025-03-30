import pkg from 'api-qasim'; // Import the entire package as 'pkg'
import fetch from 'node-fetch'; // Import fetch to handle image download

const { googleImage } = pkg; // Extract the 'googleImage' function from the package

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("Please provide a search query for Google Image search.");
  }

  try {
    // Add "wait" reaction to indicate the request is processing
    await m.react('⏳');

    // Extract search query from the text
    const searchQuery = text.trim();

    // Fetch image URLs from the Google Image search API
    let googleImageResponse = await googleImage(searchQuery);

    // Log the response for debugging
    console.log('Google Image Search Results:', googleImageResponse);

    // Check if the API returned valid image URLs
    if (!googleImageResponse || !googleImageResponse.imageUrls || googleImageResponse.imageUrls.length === 0) {
      await m.react('✅');
      return m.reply("No images found for the search query.");
    }

    // Limit to the first four image URLs
    const imageUrls = googleImageResponse.imageUrls.slice(0, 4);

    // Initialize an array to hold the image buffers
    const imageBuffers = [];

    // Download the first four images
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const response = await fetch(imageUrl);
      
      // Ensure the image was fetched successfully
      if (response.ok) {
        const buffer = await response.buffer(); // Get image data as buffer
        imageBuffers.push(buffer);
      } else {
        console.log(`Failed to fetch image at index ${i}: ${imageUrl}`);
      }
    }

    // Send the first four images to the user in WhatsApp chat
    for (let i = 0; i < imageBuffers.length; i++) {
      const imageBuffer = imageBuffers[i];
      await conn.sendMessage(m.chat, {
        image: imageBuffer,
        caption: `Image ${i + 1} from the search query *${searchQuery}*`,
      }, { quoted: m });
    }

    // React with "done" emoji after the process is complete
    await m.react('✅');

  } catch (error) {
    console.error('Error:', error);
    m.reply("An error occurred while fetching or downloading the images.");
  }
};

handler.help = ['gimage', 'googleimage'];
handler.tags = ['search'];
handler.command = ['gimage', 'googleimage'];

export default handler;
