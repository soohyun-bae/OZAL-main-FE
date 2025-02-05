import React, { useState } from "react";
import "../style/dropdown.css";
import Modal from "./Modal.jsx";
import { Link } from "react-router-dom";

// const Dropdown = ({ isOpen, onMouseEnter, onMouseLeave }) => {
//   const [modalOpen, setModalOpen] = useState(false);

import { useNavigate } from "react-router-dom";

const Dropdown = ({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onTravelDiaryClick,
}) => {
  const navigate = useNavigate();

  const handleTravelClick = () => {
    console.log("드롭다운에서 여행기록 클릭됨");
    onTravelDiaryClick && onTravelDiaryClick();
    navigate("/travel-diary");
  };

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
              <div className="menu-item">마이페이지</div>

              <div className="menu-item">여행기록</div>
              <Link to={"/travelInformation"} className="menu-item">
                여행정보
              </Link>

              <div className="menu-item" onClick={handleTravelClick}>
                여행기록
              </div>
              <div className="menu-item">여행정보</div>
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
