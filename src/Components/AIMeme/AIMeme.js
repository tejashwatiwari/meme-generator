import React, { useState, useEffect } from 'react';
import './AIMeme.css';

const ImgflipMemeGenerator = () => {
  const [generatedMeme, setGeneratedMeme] = useState(null);
  const [templateId, setTemplateId] = useState('');
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [randomJokeIndex, setRandomJokeIndex] = useState(0);
  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "Parallel lines have so much in common. It’s a shame they’ll never meet.",
    "I'm reading a book on anti-gravity. It's impossible to put down!",
    "I used to play piano by ear, but now I use my hands.",
    "Why don't skeletons fight each other? They don't have the guts.",
    "I'm on a whiskey diet. I've lost three days already.",
    "Why couldn't the bicycle stand up by itself? It was two-tired.",
    "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
  ];

  useEffect(() => {
    // Fetch memes when the component mounts
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const response = await fetch('https://api.imgflip.com/get_memes');
      if (!response.ok) {
        throw new Error('Failed to fetch memes');
      }
      const { data } = await response.json();
      setMemes(data.memes);
    } catch (error) {
      console.error('Error fetching memes:', error);
    }
  };

  const generateMeme = async () => {
    const username = 'tejashwa';
    const password = 'WhatAMeme@123';

    const url = 'https://api.imgflip.com/ai_meme';

    const requestBody = new FormData();
    requestBody.append('username', username);
    requestBody.append('password', password);
    requestBody.append('template_id', templateId);

    setLoading(true); // Set loading state to true before making the API call

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error('Failed to generate meme');
      }

      const responseData = await response.json();
      setGeneratedMeme(responseData.data);
    } catch (error) {
      console.error('Error generating meme:', error);
    } finally {
      // Clear loading state after a delay
      setTimeout(() => {
        setLoading(false);
      }, 3000); // Adjust the delay as needed
    }

    // Update random joke index
    setRandomJokeIndex(Math.floor(Math.random() * jokes.length));
  };

  return (
    <div className="meme-generator">
      <h1>AI Meme Generator 🤖</h1>
      <h4>Select a Meme and Click on Generate</h4>
      <div className="form-select-container">
        <select className="form-select" value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
          <option value="">Select a template</option>
          {memes.map((meme) => (
            <option key={meme.id} value={meme.id}>
              {meme.name}
            </option>
          ))}
        </select>
        <div className="form-select-arrow">&#9660;</div>
      </div>
      <button className="btn" onClick={generateMeme} disabled={!templateId}>
        Generate Meme
      </button>
      {loading && (
        <div className="loading-message">
          <div className="loading-spinner">🧐 🧐 🧐 🧐</div>
          <h4 className="loading-text">Please wait while AI is generating your image...</h4>
          <p className="joke-text">{jokes[randomJokeIndex]}</p>
        </div>
      )}
      {generatedMeme && !loading && (
        <div className="generated-meme-container">
          <img src={generatedMeme.url} alt="Generated Meme" className="generated-meme" />
          {/* <div className="meme-details">
            <p className="meme-text">Template ID: {generatedMeme.template_id}</p>
            <p className="meme-text">Texts:</p>
            <ul>
              {generatedMeme.texts.map((text, index) => (
                <li key={index} className="meme-text">{text}</li>
              ))}
            </ul>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ImgflipMemeGenerator;
