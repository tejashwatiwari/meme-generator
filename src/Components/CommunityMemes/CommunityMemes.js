import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CommunityMemes.css';

const CommunityMemes = () => {
  const [memes, setMemes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState('memes'); // Default category
  const [after, setAfter] = useState(''); // Store the after value for pagination

  const memesPerPage = 16;

  const categories = [
    { name: 'Memes', subreddit: 'memes' },
    { name: 'Gaming Memes', subreddit: 'gamingmemes' },
    { name: 'History Memes', subreddit: 'HistoryMemes' },
    { name: 'Anime Memes', subreddit: 'Animemes' },
    { name: 'Relationship Memes', subreddit: 'RelationshipMemes' },
    { name: 'Gym Memes', subreddit: 'GymMemes' }
  ];

  useEffect(() => {
    fetchMemes();
  }, [currentPage, currentCategory]); // Trigger fetch on category or page change

  const fetchMemes = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/memes/${currentCategory}`, {
        params: { after: after || '' }
      });
      const { memes: fetchedMemes, after: newAfter } = response.data; // Extract memes and after value from response
      setMemes(fetchedMemes);
      setAfter(newAfter);
    } catch (error) {
      console.error('Error fetching memes:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentPage(1); // Reset page when category changes
    setAfter(''); // Reset the after value when category changes
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>Community Memes</h1>
      {/* Category buttons */}
      <div className="category-buttons">
        {categories.map((category, index) => (
          <button key={index} onClick={() => handleCategoryChange(category.subreddit)}>
            {category.name}
          </button>
        ))}
      </div>
      {/* Memes container */}
      <div className="memes-container">
        {memes.map((meme, index) => (
          <div key={index} className="community-meme">
            <h2>{meme.title}</h2>
            <a href={meme.url} download={`${meme.title}.jpg`}>
              <img src={meme.url} alt={meme.title} />
            </a>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={memes.length < memesPerPage}>Next</button>
      </div>
    </div>
  );
};

export default CommunityMemes;
