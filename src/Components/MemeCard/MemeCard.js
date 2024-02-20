import React from 'react';
import { Link } from 'react-router-dom';

const MemeCard = ({ meme }) => {
    return (
        
      <div className="meme-card" style = {{backgroundColor: "#f0f0f0"}}>
        <h4>{meme.name}</h4>
        <img className="meme-img" src={meme.url} alt={meme.name} />
        
      </div>
    );
  };
    
  export default MemeCard;








