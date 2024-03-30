import React, { useState } from 'react';
import Modal from 'react-modal';
import { FacebookShareButton, TwitterShareButton } from 'react-share'; 
import { FacebookIcon, TwitterIcon } from 'react-share'; 
import './customStyles.css'; 

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    backgroundColor: '#f0f0f0',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
  },
  inputStyle: {
    borderRadius: '5px',
    border: '1px solid #ced4da', 
    padding: '8px 12px',
    marginBottom: '10px',
    width: '100%',
    boxSizing: 'border-box', 
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    // margin: '5px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    margin: '5px',
  },
  buttonContainer: {
    display: 'flex',
    marginRight:'5px',
    marginBottom: '10px',
    justifyContent: 'center',
    marginTop: '20px', 
    hover: {backgroundColor: '#004080'},
  },
  buttonStyle: {
    borderRadius: '5px',
    backgroundColor: '#0056b3', 
    color: '#fff', 
    padding: '8px 16px',
    border: 'none', 
    cursor: 'pointer', 
    margin: '5px',
  }
};

const CaptionPage = ({ meme, setMeme, closeModal }) => {
  const [inputText, setInputText] = useState(Array(meme.box_count).fill(''));
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');

  const generateMeme = async () => {
    try {
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
        setErrorMessage(data.error_message);
      }
    } catch (error) {
      console.error('Error generating meme:', error);
      setErrorMessage('Error generating meme. Please try again.');
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
      style={customStyles.inputStyle}
      placeholder={`Text ${index + 1}`}
      value={text}
      onChange={(e) => handleInputChange(index, e.target.value)}
    />
  ));
  const downloadImage = async () => {
    try {
      const imageResponse = await fetch(generatedImageUrl || meme.url); 
      const imageBlob = await imageResponse.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
  
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${meme.name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      setErrorMessage('Error downloading image. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      style={customStyles}
      portalClassName="custom-content"
      contentLabel="Meme Modal"
    >
      <h2>{meme.name}</h2>
      <div style={customStyles.row}>
        <div>
          <img className="meme-img" src={generatedImageUrl || meme.url} alt={meme.name} style={{ width: '200px', height: 'auto' }} />
        </div>
        <div style={customStyles.inputContainer}>
          <h4>Enter Caption Below</h4>
          {inputBoxes}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      </div>
      <div style={customStyles.buttonContainer}>
        <button style={customStyles.buttonStyle} onClick={generateMeme}>Generate Meme</button>
        <button style={customStyles.buttonStyle} onClick={downloadImage}>Download Meme</button>
        <FacebookShareButton className="shareButtonStyle" url={generatedImageUrl || meme.url}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton className="shareButtonStyle" url={generatedImageUrl || meme.url}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <button className="buttonStyle" onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
};

export default CaptionPage;
