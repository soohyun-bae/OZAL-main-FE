import { useState } from "react";
import "../../style/modalStyle.scss";
import kakaoLogin from "../../assets/kakao_login.png";
import naverLogin from "../../assets/naver_login.png";
import "../../App.css";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal } from "../../RTK/modalSlice";
import { setUser } from "../../RTK/authSlice";

const LoginModal = () => {
  const [rememberUser, setRememberUser] = useState(false);
  const dispatch = useDispatch();
  const isLoginModalOpen = useSelector((state) => state.modal.isLoginModalOpen);
  const KAKAO_REST_API = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

  const handleKakaoLogin = () => {
    // const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    // window.location.href = kakaoAuthURL;
    const mockUser = {
      name: '홍길동',
      nickname: '길동이',
      profilePic: 'src/assets/1.png',
    };

    dispatch(setUser({ user: mockUser, token: 'mockToken', rememberUser }));
    dispatch(closeLoginModal());
  };

  return (
    <Modal
      isModalOpen={isLoginModalOpen}
      onClose={() => dispatch(closeLoginModal())}
    >
      <div className="modal-contents">
        <div className="modal-login">
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

          <button
            onClick={() => dispatch(closeLoginModal())}
            className="close-btn"
          >
            닫기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
