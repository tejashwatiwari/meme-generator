import React, { useState } from 'react';

const CaptionPage = ({ match }) => {
  const [caption, setCaption] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleCaptionSubmit = async () => {
    try {
      const response = await fetch('https://api.imgflip.com/caption_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template_id: match.params.id,
          username: 'tejashwa',
          password: 'WhatAMeme@123',
          text0: caption,
        }),
      });
      const data = await response.json();
      setImageURL(data.data.url);
    } catch (error) {
      console.error('Error captioning image:', error);
    }
  };

  return (
    <div className="caption-page">
      <h2>Caption Meme</h2>
      <textarea
        placeholder="Enter caption..."
        value={caption}
        onChange={handleCaptionChange}
      />
      <button onClick={handleCaptionSubmit}>Generate Caption</button>
      {imageURL && (
        <div>
          <img src={imageURL} alt="Captioned Meme" />
          <a href={imageURL} download>
            Download Meme
          </a>
        </div>
      )}
    </div>
  );
};

export default CaptionPage;