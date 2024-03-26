import React, { useState } from 'react';
import CaptionPage from '../CaptionPage/CaptionPage';

const MemeCard = ({ meme }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="meme-card" style={{ backgroundColor: "#f0f0f0" }}>
      <h4>{meme.name}</h4>
      <img className="meme-img" src={meme.url} alt={meme.name} onClick={openModal} />
      {modalIsOpen && <CaptionPage meme={meme} closeModal={closeModal} />}
    </div>
  );
};

export default MemeCard;
