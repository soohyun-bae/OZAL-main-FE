import { useRef, useState } from "react";
import "../style/modalStyle.scss";
import kakaoLogin from "../assets/kakao_login.png";
import naverLogin from "../assets/naver_login.png";
import "../App.css";

const Modal = ({ modalOpen, setModalOpen }) => {
  const [rememberUser, setRememberUser] = useState(false);
  const modalBackground = useRef();
  const KAKAO_REST_API = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

  const handleKakaoLogin = () => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthURL;
  };

  return (
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
            {}
            <p>Login</p>
            <hr />
            <button onClick={handleKakaoLogin}>
              <img src={kakaoLogin} alt="kakaoLogin" className="kakaoLogin" />
            </button>
            <button>
              <img src={naverLogin} alt="naverLogin" className="naverLogin" />
            </button>
            <div className="login-on">
              <input
                type="checkbox"
                checked={rememberUser}
                onChange={(e) => setRememberUser(e.target.checked)}
              />
              로그인 상태 유지
            </div>

            <button onClick={() => setModalOpen(false)} className="close-btn">
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
