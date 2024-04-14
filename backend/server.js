const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Proxy route for the IMGFlip API
app.post('/api/ai_meme', async (req, res) => {
  const { username, password, ...otherParams } = req.body;

  try {
    const response = await axios.post('https://api.imgflip.com/ai_meme', {
      username,
      password,
      ...otherParams,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error generating AI meme:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to generate AI meme' });
  }
});

// Route for fetching memes
app.get('/api/memes/:category', async (req, res) => {
  const { category } = req.params;
  const { after } = req.query;
  const limit = 16;
  const apiUrl = `https://www.reddit.com/r/${category}.json?limit=${limit}&after=${after || ''}`;

  try {
    const response = await axios.get(apiUrl);
    const { children, after: newAfter } = response.data.data;
    const memes = children
      .map((child) => child.data)
      .filter(
        (meme) =>
          meme.post_hint === 'image' ||
          meme.post_hint === 'rich:video' ||
          (meme.post_hint === 'hosted:video' && meme.media?.type === 'gfycat')
      )
      .filter((meme) => !meme.over_18);
    res.json({ memes, after: newAfter });
  } catch (error) {
    console.error(`Error fetching ${category} memes from Reddit:`, error);
    res.status(500).json({ error: `Failed to fetch ${category} memes` });
  }
});

app.post('/api/ai_meme', async (req, res) => {
  const { username, password, ...otherParams } = req.body;

  console.log('Request body:', { username, password, ...otherParams });

  try {
    const response = await axios.post('https://api.imgflip.com/ai_meme', {
      username,
      password,
      ...otherParams,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error generating AI meme:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to generate AI meme' });
  }
});

app.post('/api/automeme', async (req, res) => {
  const { username, password, ...otherParams } = req.body;

  try {
    const response = await axios.post('https://api.imgflip.com/automeme', {
      username,
      password,
      ...otherParams,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error generating Automeme:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to generate Automeme' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});