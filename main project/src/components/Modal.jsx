import React, { useRef, useState } from "react";
import "../style/modalStyle.scss";

const Modal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  const handleModal = () => {
    if(modalOpen === true) {
      setModalOpen(false)
    }

    if(modalOpen === false){
      setModalOpen(true)
    }
  };

  return (
    <>
      <div>
        <p onClick={handleModal}>로그인하기</p>
      </div>
      {modalOpen && (
        <div className="modal-container" ref={modalBackground} onClick={(e) => {
          if(e.target === modalBackground.current) {
            handleModal();
          }
        }}>
          <div className="modal-contents">
            <p>Login</p>
            <hr />
            <button>카카오로 로그인하기</button>
            <button onClick={handleModal}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
