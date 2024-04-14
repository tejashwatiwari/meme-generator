import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AIMeme.css';

const AIMeme = () => {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const response = await axios.get('https://api.imgflip.com/get_memes');
      setMemes(response.data.data.memes);
    } catch (error) {
      console.error('Error fetching memes:', error);
      setError('Failed to fetch memes');
    }
  };

  const handleMemeSelect = (meme) => {
    setSelectedMeme(meme);
  };

  const generateAIMeme = async () => {
    try {
      const templateId = selectedMeme.id;
      const username = 'tejashwa'; 
      const password = 'WhatAMeme@123';

      // Check if a meme is selected
      if (!templateId) {
        console.error('Error generating AI meme: No meme selected');
        setError('No meme selected');
        return;
      }
      
      const response = await axios.post(`http://localhost:3000/api/ai_meme`, {
        username,
        password,
        template_id: templateId,
      });
      setError(null);
      console.log(response.data); 
    } catch (error) {
      console.error('Error generating AI meme:', error);
      setError('Failed to generate AI meme');
    }
  };

  return (
    <div className="ai-meme-container">
      <h1>AI Generated Meme</h1>
      <div className="meme-carousel">
        {memes.map((meme) => (
          <img
            key={meme.id}
            src={meme.url}
            alt={meme.name}
            className={selectedMeme && selectedMeme.id === meme.id ? 'selected' : ''}
            onClick={() => handleMemeSelect(meme)}
          />
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
      {selectedMeme && (
        <div className="selected-meme">
          <h2>Selected Meme: {selectedMeme.name}</h2>
          <button onClick={generateAIMeme}>Generate AI Meme</button>
        </div>
      )}
    </div>
  );
};

export default AIMeme;
