const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Route for fetching memes
app.get('/api/memes/:category', async (req, res) => {
  const { category } = req.params;
  const { after } = req.query;
  const limit = 16; // Number of posts per page
  const apiUrl = `https://www.reddit.com/r/${category}.json?limit=${limit}&after=${after || ''}`;

  try {
    const response = await axios.get(apiUrl);
    const { children, after: newAfter } = response.data.data;
    // Filter memes to include only images or GIFs and remove NSFW content
    const memes = children
      .map(child => child.data)
      .filter(meme => meme.post_hint === 'image' || meme.post_hint === 'rich:video' || (meme.post_hint === 'hosted:video' && meme.media?.type === 'gfycat')) // Filter out non-image posts
      .filter(meme => !meme.over_18); // Filter out NSFW content
    res.json({ memes, after: newAfter });
  } catch (error) {
    console.error(`Error fetching ${category} memes from Reddit:`, error);
    res.status(500).json({ error: `Failed to fetch ${category} memes` });
  }
});

// Route for generating AI meme
app.post('/api/proxy/ai_meme', async (req, res) => {
  try {
    const response = await axios.post('https://api.imgflip.com/ai_meme', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error generating AI meme:', error);
    res.status(500).json({ error: 'Failed to generate AI meme' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
