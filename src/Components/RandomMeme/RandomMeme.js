import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RandomMeme.css';

const RandomMeme = () => {
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetchRandomMeme();
  }, []);

  const fetchRandomMeme = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/memes/memes');
      const memes = response.data.memes;
      const randomIndex = Math.floor(Math.random() * memes.length);
      setMeme(memes[randomIndex]);
    } catch (error) {
      console.error('Error fetching random meme:', error);
    }
  };

  const generateAnotherMeme = () => {
    fetchRandomMeme();
  };

  const shareOrDownload = () => {
    if (meme) {
      // Implement your share/download logic here
      // For example, you can open the image in a new tab
      window.open(meme.url);
    }
  };

  return (
    <div className="random-meme-container">
      {meme && (
        <div className="meme-wrapper">
          <img src={meme.url} alt={meme.title} className="meme-image" />
        </div>
      )}
      <div className="button-container">
        <button onClick={generateAnotherMeme}>Generate Another Meme</button>
      </div>
    </div>
  );
};

export default RandomMeme;
