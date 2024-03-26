import { useEffect, useState } from "react";
import MemeCard from "./MemeCard/MemeCard";
import CaptionPage from './CaptionPage/CaptionPage';
import { BrowserRouter as Router } from 'react-router-dom';

const Body = () => {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);

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

  return (
    <Router>
      <div className="body">
        <h1>Pick Your Meme Template</h1>
        <div className="memes-container">
          {memes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} onSelectMeme={setSelectedMeme} />
          ))}
        </div>
        {selectedMeme && <CaptionPage meme={selectedMeme} setMeme={setSelectedMeme} />}
      </div>
    </Router>
  );
};

export default Body;
