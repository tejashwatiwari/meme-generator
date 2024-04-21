import React, { useState } from 'react';
import axios from 'axios';

const Automeme = () => {
  const [text, setText] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);

  const username = 'tejashwa';
  const password = 'WhatAMeme@123';
  const apiUrl = 'https://api.imgflip.com/automeme';

  const generateMeme = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('text', text);

      const response = await axios.post(apiUrl, formData);

      // Assuming response.data contains the generated image URL
      setGeneratedImage(response.data);
    } catch (error) {
      console.error('Error generating meme:', error);
    }
  };

  return (
    <div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter text for meme"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={generateMeme}>
        Generate
      </button>

      {generatedImage && (
        <div className="mt-4 border p-3">
          <img src={generatedImage} alt="Generated Meme" className="img-fluid" />
        </div>
      )}
    </div>
  );
};

export default Automeme;
