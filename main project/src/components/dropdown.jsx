import React, { useState } from "react";
import "../style/dropdown.css";
import Modal from "./modal";
import { Link } from "react-router-dom";

const Dropdown = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="dropdown-container"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="hamburger-menu">☰</div>
        {isOpen && (
          <div className="dropdown-menu">
            <div className="menu-items">
              <Link to={'/'}>홈</Link>
              <div className="menu-item">마이페이지</div>
              <Link to={"/travel-diary"} className="menu-item">
                여행기록
              </Link>
              <Link to={"/travel-info"} className="menu-item">
                여행정보
              </Link>
              <div className="menu-divider"></div>
              <div className="menu-item" onClick={() => setModalOpen(true)}>
                로그인하기
              </div>
            </div>
          </div>
        )}
      </div>
      {modalOpen && <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
    </>
  );
};

export default Dropdown;
