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
          I am a student at California State University, Fullerton, and currently working on this project.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget lectus fermentum, fermentum risus id, vehicula metus.
          Donec ultrices viverra est id semper. Quisque et libero nec nunc ultricies congue.
        </p>
        <button onClick={closeModal} className="close-button">Close</button>
      </div>
    </Modal>
  );
};

export default AboutMeModal;
