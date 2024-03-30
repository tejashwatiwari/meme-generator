import React, { useEffect, useState } from "react";
import MemeCard from "./MemeCard/MemeCard";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ScrollToTop from './ScrollToTop/ScrollToTop';

const Body = () => {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const memesPerPage = 20;

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch('https://api.imgflip.com/get_memes');
        if (!response.ok) {
          throw new Error('Failed to fetch memes');
        }
        const data = await response.json();
        setMemes(data.data.memes);
      } catch (error) {
        console.error('Error fetching memes:', error);
      }
    };

    fetchMemes();
  }, []);

  const indexOfLastMeme = currentPage * memesPerPage;
  const indexOfFirstMeme = indexOfLastMeme - memesPerPage;
  const currentMemes = memes.slice(indexOfFirstMeme, indexOfLastMeme);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Router>
      <div className="body">
        <h1>Pick Your Meme Template</h1>
        <div className="memes-container">
          {currentMemes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} onSelectMeme={() => setSelectedMeme(meme)} />
          ))}
        </div>
        <div className="pagination">
          <button
            className="pagination-link"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(memes.length / memesPerPage) }, (_, i) => (
            <Link
              to="#"
              key={i + 1}
              className={i + 1 === currentPage ? "pagination-link active" : "pagination-link"}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Link>
          ))}
          <button
            className="pagination-link"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(memes.length / memesPerPage)}
          >
            Next
          </button>
          <ScrollToTop buttonColor="#ff4500"  />
        </div>
        {/* {selectedMeme && <CaptionPage meme={selectedMeme} setMeme={setSelectedMeme} closeModal={() => setSelectedMeme(null)} />} */}
      </div>
    </Router>
  );
};

export default Body;
