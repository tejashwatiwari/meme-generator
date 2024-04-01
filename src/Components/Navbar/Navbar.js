import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AboutMeModal from '../AboutMe/AboutMeModal.js';


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [aboutMeModalIsOpen, setAboutMeModalIsOpen] = useState(false);

  const openAboutMeModal = () => {
    setAboutMeModalIsOpen(true);
  };

  const closeAboutMeModal = () => {
    setAboutMeModalIsOpen(false);
  };

  const handleScroll = () => {
    const isScrolled = window.scrollY > 0;
    setScrolled(isScrolled);
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/">
          <img
            src="/images/GagGenius.png"
            alt="Logo"
            className={`navbar-logo ${scrolled ? 'scrolled' : ''}`}
          />
        </Link>
        <div className="navbar-links">
          <Link to="/" className={`navbar-link home ${scrolled ? 'scrolled' : ''}`}>
            Home
          </Link>
          <Link to="/memes" className={`navbar-link community-memes ${scrolled ? 'scrolled' : ''}`}>
            Community Memes
          </Link>
          <Link to="random-meme" className={`navbar-link random-meme-generator ${scrolled ? 'scrolled': ''}`}>Random Meme</Link>
          <Link to="ai-meme" className={`navbar-link ai-meme ${scrolled ? 'scrolled': ''}`}>AI Meme</Link> 
          <button className="about-me-button" onClick={openAboutMeModal}>About Me</button>
        </div>
      </nav>
      <AboutMeModal isOpen={aboutMeModalIsOpen} closeModal={closeAboutMeModal} />
    </header>
  );
};

export default Navbar;
