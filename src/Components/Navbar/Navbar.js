import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css'

const Navbar = () => {   
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className={`navbar-link ${scrolled ? 'scrolled' : ''}`}>Home</Link> {/* Link to homepage */}
        <Link to="/community-memes" className={`navbar-link ${scrolled ? 'scrolled' : ''}`}>Community Memes</Link> {/* Link to Community Memes page */}
        <img src="/images/GagGenius.png" alt="Logo" className={`navbar-logo ${scrolled ? 'scrolled' : ''}`} />
      </nav>
    </header>
  );
}

export default Navbar;

