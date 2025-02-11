import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../style/dropdown.scss";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../RTK/authSlice";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector((state) => state.auth?.user);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    console.log("user:", user);
    console.log('login state:', isAuthenticated)
  }, [isAuthenticated])

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
                <div className="login" onClick={() => setModalOpen(true)}>
                  로그인
                </div>
              )}
              <Link to={"/"} className="menu-item">
                메인
              </Link>
              <Link to={"/Mypage"} className="menu-item">
                마이페이지
              </Link>
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
      {modalOpen && <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      <Outlet />
    </div>
  );
};

export default Header;
