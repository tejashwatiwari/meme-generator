import React, { useState } from 'react';
import Modal from 'react-modal';
import { FacebookShareButton, TwitterShareButton } from 'react-share'; // Import share buttons
import { FacebookIcon, TwitterIcon } from 'react-share'; // Import share icons
import './customStyles.css';

// Set the app element for React Modal
Modal.setAppElement('#root');

const CaptionPage = ({ meme, setMeme, closeModal }) => {
  const [inputText, setInputText] = useState(Array(meme.box_count).fill(''));
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');

  const generateMeme = async () => {
    const templateId = meme.id;
    const username = 'tejashwa'; 
    const password = 'WhatAMeme@123';

    // Check if any text is provided
    if (!inputText.some(text => text.trim() !== '')) {
      console.error('Error generating meme: No texts specified.');
      setErrorMessage('No texts specified.');
      return;
    }
    setErrorMessage('');

    let url = `https://api.imgflip.com/caption_image?template_id=${templateId}&username=${username}&password=${password}`;

    // Construct the URL for each text box
    inputText.forEach((text, index) => {
      url += `&boxes[${index}][text]=${encodeURIComponent(text)}`;
    });

    try {
      const response = await fetch(url, {
        method: 'POST'
      });

      const data = await response.json();

      if (data.success) {
        console.log('Meme generated successfully:', data.data.url);
        setGeneratedImageUrl(data.data.url); // Update the generated image URL
        setMeme({ ...meme, url: data.data.url });
      } else {
        console.error('Error generating meme:', data.error_message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (index, value) => {
    const newText = [...inputText];
    newText[index] = value;
    setInputText(newText);
  };

  const inputBoxes = inputText.map((text, index) => (
    <input
      key={index}
      type="text"
      placeholder={`Text ${index + 1}`}
      style={{ marginBottom: '10px' }}
      value={text}
      onChange={(e) => handleInputChange(index, e.target.value)}
    />
  ));

  const downloadImage = async () => {
    const image = await fetch(meme.url);
    const imageBlob = await image.blob();
    const imageUrl = URL.createObjectURL(imageBlob);

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${meme.name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className="content"
      contentLabel="Meme Modal"
    >
      {/* Your modal content */}
      <div className="modal-container">
        <div>
          <h2>{meme.name}</h2>
          {/* Use the generated image URL if available, otherwise use the original meme URL */}
          <img src={generatedImageUrl || meme.url} alt={meme.name} style={{ width: '200px', height: 'auto' }} />
        </div>
        <div>
          {inputBoxes}
        </div>
      </div>
      <div className='buttonContainer'>
        <button className="buttonStyle" onClick={generateMeme}>Generate Meme</button>
        <button className="buttonStyle" onClick={downloadImage}>Download Meme</button>
        {/* Share buttons */}
        <FacebookShareButton className="buttonStyle" url={generatedImageUrl || meme.url}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton className="buttonStyle" url={generatedImageUrl || meme.url}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        {/* Close button */}
        <button className="buttonStyle" onClick={closeModal}>Close</button>
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </Modal>
  );
};

export default CaptionPage;
