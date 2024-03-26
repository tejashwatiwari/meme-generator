// CommunityMemes.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CommunityMemes.css'; // Import external CSS file
import { FaDownload, FaInstagram, FaFacebook } from 'react-icons/fa'; // Import relevant icons

const CommunityMemes = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/memes');
        // Filter out NSFW (Not Safe For Work) posts and videos
        const safeMemes = response.data.filter(meme => !meme.over_18 && meme.post_hint !== 'hosted:video');
        setMemes(safeMemes);
      } catch (error) {
        console.error('Error fetching memes:', error);
      }
    };

    fetchMemes();
  }, []);

  const handleShareOnInstagram = (url) => {
    // Implement logic to share the image on Instagram
    console.log('Sharing on Instagram:', url);
  };

  const handleShareOnFacebook = (url) => {
    // Implement logic to share the image on Facebook
    console.log('Sharing on Facebook:', url);
  };

  return (
    <div>
      <h1>Community Memes</h1>
      <div className="memes-container">
        {memes.map((meme, index) => (
          <div key={index} className="community-meme">
            <h2>{meme.title}</h2>
            {/* Wrap the image inside an anchor tag with download attribute */}
            <a href={meme.url} download={`${meme.title}.jpg`}>
              <img src={meme.url} alt={meme.title} />
            </a>
            {/* Download button */}
            <button>
              <FaDownload />
              <a href={meme.url} download={`${meme.title}.jpg`}>Download</a>
            </button>
            {/* Share buttons */}
            <div className="share-buttons">
              <button onClick={() => handleShareOnInstagram(meme.url)}>
                <FaInstagram />
                Share on Instagram
              </button>
              <button onClick={() => handleShareOnFacebook(meme.url)}>
                <FaFacebook />
                Share on Facebook
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityMemes;
