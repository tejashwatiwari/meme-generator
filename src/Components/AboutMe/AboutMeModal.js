import React from 'react';
import Modal from 'react-modal';
import './AboutMeModal.css';

const AboutMeModal = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="about-me-modal"
      overlayClassName="about-me-overlay"
    >
      <div className="about-me-content">
        <img src="/images/about.png" alt="Tejashwa Tiwari" className="profile-pic" />
        <p>
        Hey there! I am Tejashwa - I'm a CSUF Masters student passionate about coding and entrepreneurship. Coding is my form of expression, crafting algorithms and building software solutions. I thrive on turning ideas into reality. Entrepreneurship excites me - I love bringing transformative concepts to life and navigating business complexities. Beyond coding, I explore new technologies, devour innovation books, and engage in thought-provoking conversations. Let's innovate, create, and inspire together!
        </p>
        <button onClick={closeModal} className="close-button">Close</button>
      </div>
    </Modal>
  );
};

export default AboutMeModal;
