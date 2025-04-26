import React from "react";
import "./Modal.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../RTK/modalSlice";

const Modal = ({ type, children }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modals[type]);

  const handleClickBackground = (e) => {
    if (e.target.classList.contains("modal-container")) {
      dispatch(closeModal(type));
    }
  };

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
