import React, { useState } from 'react';
import axios from 'axios';
import './AIMeme.css';

const AIMeme = () => {
  const [meme, setMeme] = useState(null);

  const generateAIMeme = async () => {
    try {
      const response = await axios.post('/api/proxy/ai_meme', {
        username: 'tejashwa',
        password: 'WhatAMeme@123'
      });
      const { data } = response.data;
      setMeme(data);
    } catch (error) {
      console.error('Error generating AI meme:', error);
    }
  };

  return (
    <div className="ai-meme-container">
      <h1>AI Generated Meme</h1>
      {meme && (
        <div className="meme-wrapper">
          <img src={meme.url} alt="AI Meme" className="meme-image" />
        </div>
      )}
      <button onClick={generateAIMeme}>Generate AI Meme</button>
    </div>
  );
};

export default AIMeme;
