import React, { useState, useEffect } from 'react';
import './ScrollToTop.css'; // Import CSS for styling

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down 100px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={isVisible ? 'scroll-to-top show' : 'scroll-to-top'}>
      <button onClick={scrollToTop}>
        <img className="scroll-default" src="/images/scroll.png" alt="Scroll to Top" />
      </button>
    </div>
  );
};

export default ScrollToTop;
