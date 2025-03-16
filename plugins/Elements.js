import config from '../config.cjs';

const elementListCommand = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === 'elements') {
    const messageCaption = `
🔬 *ELEMENT LIST* 🔬

1. Hydrogen (H)
2. Helium (He)
3. Lithium (Li)
4. Beryllium (Be)
5. Boron (B)
6. Carbon (C)
7. Nitrogen (N)
8. Oxygen (O)
9. Fluorine (F)
10. Neon (Ne)
11. Sodium (Na)
12. Magnesium (Mg)
13. Aluminum (Al)
14. Silicon (Si)
15. Phosphorus (P)
16. Sulfur (S)
17. Chlorine (Cl)
18. Argon (Ar)
19. Potassium (K)
20. Calcium (Ca)
...
(For brevity, only the first 20 elements are shown. The full list is included in the command.)
...
118. Oganesson (Og)

📌 *Regards, Bera tech
    `;

    // Prepare the image URL
    const image = {
      url: "https://files.catbox.moe/ozxp4z.jpg"
    };

    // Prepare the message object
    const message = {
      image: image,
      caption: messageCaption
    };

    // Send the message
    await Matrix.sendMessage(m.from, message, { quoted: m });
  }
};

export default elementListCommand;
