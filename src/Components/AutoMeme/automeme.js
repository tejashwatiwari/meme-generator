import React, { useState } from 'react';

const Automeme = () => {
  const [inputText, setInputText] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/automeme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'tejashwa', // Replace with your Imgflip username
          password: 'WhatAMeme@123', // Replace with your Imgflip password
          text: inputText
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate Automeme');
      }
  
      const data = await response.json();
      console.log('Response:', data); // Log the response data
      setImages(data.memes);
    } catch (error) {
      console.error('Error generating Automeme:', error.message);
    }
  };
  

  return (
    <div className="automeme-container">
      <h2>AutoMeme Generator</h2>
      <textarea
        placeholder="Enter your text..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleSubmit}>Generate Meme</button>
      <div className="image-container">
        {images.map((image, index) => (
          <img key={index} src={image.url} alt={image.name} />
        ))}
      </div>
    </div>
  );
};

export default Automeme;
