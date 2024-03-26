import React, { useState } from 'react';
import Modal from 'react-modal';
import './customStyles.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column', // Align items in a column
  },
  image: {
    marginRight: '20px', // Adjust the spacing between the image and inputs
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column', // Align input boxes in a column
    marginLeft: '20px', // Add margin for better separation from the image
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row', // Align buttons in a row
    marginTop: '20px', // Add margin between input boxes and buttons
  },
  buttonStyle:{
    marginRight:'10px',
    borderRadius: '5px',
  }
};

const CaptionPage = ({ meme, closeModal }) => {
  const [inputText, setInputText] = useState(Array(meme.box_count).fill(''));
  
  const generateMeme = async () => {
    const templateId = meme.id;
    const username = 'tejashwa'; // Replace with your Imgflip username
    const password = 'WhatAMeme@123'; // Replace with your Imgflip password

    let url = `https://api.imgflip.com/caption_image?template_id=${templateId}&username=${username}&password=${password}`;
    inputText.forEach((text, index) => {
      url += `&text${index}=${encodeURIComponent(text)}`;
    });

    try {
      const response = await fetch(url, {
        method: 'POST'
      });

      const data = await response.json();

      if (data.success) {
        console.log('Meme generated successfully:', data.data.url);
        // You can handle the generated meme URL here, for example, display it to the user or download it.
      } else {
        console.error('Error generating meme:', data.error_message);
        // Handle error response
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or other errors
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

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Meme Modal"
    >
      {/* Your modal content */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={customStyles.image}>
          <h2>{meme.name}</h2>
          <img src={meme.url} alt={meme.name} style={{ width: '200px', height: 'auto' }} />
        </div>
        <div style={customStyles.inputContainer}>
          {inputBoxes}
        </div>
      </div>
      <div style={customStyles.buttonContainer}>
        <button style={customStyles.buttonStyle} onClick={generateMeme}>Generate Meme</button>
        <button style={customStyles.buttonStyle}>Download Meme</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
};

export default CaptionPage;
