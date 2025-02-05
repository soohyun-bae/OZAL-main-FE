import React, { useRef } from "react";
import "../style/modalStyle.scss";

const Modal = ({modalOpen, setModalOpen}) => {
  const modalBackground = useRef();

  return (
    <>
      {modalOpen && (
        <div className="modal-container" ref={modalBackground} onClick={(e) => {
          if(e.target === modalBackground.current) {
            setModalOpen(false);
          }
        }}>
          <div className="modal-contents">
            <p>Login</p>
            <hr />
            <button>카카오로 로그인하기</button>
            <button onClick={() => setModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
