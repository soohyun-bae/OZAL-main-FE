import "../../style/modalStyle.scss";
import kakaoLogin from "../../assets/kakao_login.png";
import naverLogin from "../../assets/naver_login.png";
import mainLogo from "../../assets/mainLogo.png";
import "../../App.css";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../RTK/modalSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  const isLoginModalOpen = useSelector((state) => {
    return state.modal.modals["login"];
  });
  const KAKAO_REST_API = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

  const handleKakaoLogin = () => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthURL;
  };

  return (
    <>
      {isLoginModalOpen && (
        <Modal type="login">
          <div className="modal-contents">
            <div className="modal-login">
              <p>
                <img src={mainLogo} alt="logo" className="logo" />
              </p>
              <hr />
              <button onClick={handleKakaoLogin}>
                <img src={kakaoLogin} alt="kakaoLogin" className="kakaoLogin" />
              </button>
              <button>
                <img src={naverLogin} alt="naverLogin" className="naverLogin" />
              </button>
              <button
                onClick={() => dispatch(closeModal("login"))}
                className="close-btn"
              >
                닫기
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LoginModal;
