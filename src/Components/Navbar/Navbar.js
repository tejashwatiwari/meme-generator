import React, { useState, useEffect } from 'react';

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
        <img src="/images/GagGenius.png" alt="Logo" className={`navbar-logo ${scrolled ? 'scrolled' : ''}`} />
      </nav>
    </header>
  );
}

export default Navbar;

