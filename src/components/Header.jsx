import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/dropdown.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../RTK/authSlice";
import {
  clearTourList,
  setSelectedCity,
  setSelectedDistrict,
} from "../RTK/slice";
import LoginModal from "./LoginModal";
import { openLoginModal } from "../RTK/modalSlice";
import TextButton from "./Buttons/TextButton";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const user = useSelector((state) => state.auth?.user);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const { isLoginModalOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   console.log("user:", user);
  //   console.log("login state:", isAuthenticated);
  // }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleNavLinsClick = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      dispatch(openLoginModal());
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    if (!location.pathname.startsWith("/travel-info")) {
      dispatch(setSelectedDistrict(null));
      dispatch(setSelectedCity(null));
      dispatch(clearTourList());
    } else {
      return;
    }
  }, [location.pathname]);

  return (
    <div>
      <div
        className="dropdown-container"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <div className="hamburger-menu">☰</div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="menu-items">
              {isAuthenticated ? (
                <TextButton className="login" onClick={handleLogout}>
                  로그아웃
                </TextButton>
              ) : (
                <TextButton
                  className="login"
                  onClick={() => dispatch(openLoginModal())}
                >
                  로그인
                </TextButton>
              )}
              <TextButton to="/" className="menu-item">
                메인
              </TextButton>
                  <TextButton className="menu-item" onClick={(e) => handleNavLinsClick(e, '/mypage')}>
                    마이페이지
                  </TextButton>
                  <TextButton className="menu-item"  onClick={(e) => handleNavLinsClick(e, '/travel-diary')}>
                    여행기록
                  </TextButton>
                  <TextButton to="/travel-info" className="menu-item">
                    여행정보
                  </TextButton>
            </div>
          </div>
        )}
      </div>
      {isLoginModalOpen && <LoginModal />}
    </div>
  );
};

export default Header;
