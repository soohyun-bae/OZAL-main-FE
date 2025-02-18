import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../style/dropdown.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../RTK/authSlice";
import Dropdown from "./Dropdown";
import LoginModal from "../Modal/LoginModal";
import { openModal } from "../../RTK/modalSlice";
import "./NavBar.scss";
import ProfileImage from "../Profile/ProfileImage";
import MypageModal from "../Modal/MypageModal";
import { setSelectedCity, setSelectedDistrict } from "../../RTK/tour/slice";
import { tourApi } from "../../RTK/tour/tourApi";

const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const isLoginModalOpen = useSelector((state) => state.modal.modals["login"]);
  const isMypageModalOpen = useSelector((state) => state.modal.modals["mypage"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleAuthNavClick = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      dispatch(openModal("login"));
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    if (!location.pathname.startsWith("/travel-info")) {
      dispatch(setSelectedDistrict(null));
      dispatch(setSelectedCity(null));
      dispatch(tourApi.util.resetApiState());
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
                    <div>
                      <div className="login" onClick={handleLogout}>
                        로그아웃
                      </div>
                      <div onClick={() => dispatch(openModal("mypage"))}>
                        <ProfileImage
                          src={user.profilePic}
                          className="profile-pic"
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="login"
                      onClick={() => {
                        console.log("Dispatching openModal with login");
                        dispatch(openModal("login"));
                      }}
                    >
                      로그인
                    </div>
                  )}
                  <Link to="/" className="menu-item">
                    메인
                  </Link>
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
      {isMypageModalOpen && <MypageModal />}
    </div>
  );
};

export default NavBar;
