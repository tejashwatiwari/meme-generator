// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5001; // Change 5000 to another port number, e.g., 5001

app.get('/api/memes', async (req, res) => {
  try {
    const response = await axios.get('https://www.reddit.com/r/memes.json');
    const memes = response.data.data.children.map(child => child.data);
    res.json(memes);
  } catch (error) {
    console.error('Error fetching memes from Reddit:', error);
    res.status(500).json({ error: 'Failed to fetch memes' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
