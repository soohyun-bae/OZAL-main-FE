import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import '../style/dropdown.scss'
import Modal from './Modal';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
              <div className="login" onClick={() => setModalOpen(true)}>
                로그인
              </div>
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
