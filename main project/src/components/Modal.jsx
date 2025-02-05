import { useRef } from "react";
import "../style/modalStyle.scss";
import "../App.css";
import kakaoLogin from "../assets/kakao_login.png";
import naverLogin from "../assets/naver_login.png";

const Modal = ({ modalOpen, setModalOpen }) => {
  const modalBackground = useRef();

  return (
    <>
      <div className="modal-container">
        {modalOpen && (
          <div
            className="modal-contents"
            ref={modalBackground}
            onClick={(e) => {
              if (e.target === modalBackground.current) {
                setModalOpen(false);
              }
            }}
          >
            <div className="modal-login">
              <p>Login</p>
              <hr />
              <button>
                <img src={kakaoLogin} alt="kakaoLogin" className="kakaoLogin" />
              </button>
              <button>
                <img src={naverLogin} alt="naverLogin" className="naverLogin" />
              </button>

              <button onClick={() => setModalOpen(false)} className="close-btn">
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
