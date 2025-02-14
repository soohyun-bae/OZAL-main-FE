import React from "react";
import "./Modal.scss";

const Modal = ({ isModalOpen, onClose, children }) => {

  const handleClickBackground = (e) => {
    if (e.target.classList.contains("modal-container")) {
      onClose();
    }
  };

  if (!isModalOpen) return null;

  return (
    <div
      className={`modal-container ${isModalOpen ? "open" : ""}`}
      onClick={handleClickBackground}
    >
      {children}
    </div>
  );
};

export default Modal;
