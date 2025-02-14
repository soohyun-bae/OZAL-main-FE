import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.auth?.user);
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

  useEffect(() => {
    // console.log("useEffect start");
    // console.log(location.pathname);
    if (!location.pathname.startsWith("/travel-info")) {
      // console.log("if start");
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
                <div className="login" onClick={handleLogout}>
                  로그아웃
                </div>
              ) : (
                <div className="login" onClick={() => dispatch(openLoginModal())}>
                  로그인
                </div>
              )}
              <Link to={"/"} className="menu-item">
                메인
              </Link>
              {isAuthenticated && (
                <Link to={"/Mypage"} className="menu-item">
                  마이페이지
                </Link>
              )}
              <Link to={"/travel-diary"} className="menu-item">
                여행기록
              </Link>
              <Link to={"/travel-info"} className="menu-item">
                여행정보
              </Link>
            </div>
          </div>
        )}
      </div>
      {isLoginModalOpen && <LoginModal />}
    </div>
  );
};

export default Header;
