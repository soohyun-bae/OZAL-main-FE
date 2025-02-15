import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../style/dropdown.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../RTK/authSlice";
import {
  clearTourList,
  setSelectedCity,
  setSelectedDistrict,
} from "../../RTK/slice";
import { openLoginModal } from "../../RTK/modalSlice";
import Dropdown from "./Dropdown";
import LoginModal from '../Modal/LoginModal';

const NavBar = () => {
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

  const handleAuthNavClick = (e, path) => {
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
      <Dropdown>
        {(isDropdownOpen) => (
          <>
            <div className="hamburger-menu">☰</div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="menu-items">
                  {isAuthenticated ? (
                    <div
                      label="로그아웃"
                      className="login"
                      onClick={handleLogout}
                    >
                      로그아웃
                    </div>
                  ) : (
                    <div
                      className="login"
                      onClick={() => dispatch(openLoginModal())}
                    >
                      로그인
                    </div>
                  )}
                  <Link to="/" className="menu-item">
                    메인
                  </Link>
                  <div
                    className="menu-item"
                    onClick={(e) => handleAuthNavClick(e, "/mypage")}
                  >
                    마이페이지
                  </div>
                  <div
                    className="menu-item"
                    onClick={(e) => handleAuthNavClick(e, "/travel-diary")}
                  >
                    여행기록
                  </div>
                  <Link to="/travel-info" className="menu-item">
                    여행정보
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </Dropdown>
      {isLoginModalOpen && <LoginModal />}
    </div>
  );
};

export default NavBar;
