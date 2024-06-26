import React, { useState } from 'react';
import CaptionPage from '../CaptionPage/CaptionPage';
import './MemeCard.css'

const MemeCard = ({ meme, onSelectMeme }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    onSelectMeme(meme);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="meme-card" style={{ backgroundColor: "#f0f0f0" }}>
      <h4>{meme.name}</h4>
      <img className="meme-img" src={meme.url} alt={meme.name} onClick={openModal} />
      {modalIsOpen && <CaptionPage meme={meme} setMeme={onSelectMeme} closeModal={closeModal} />}
    </div>
  );
};

export default MemeCard;
