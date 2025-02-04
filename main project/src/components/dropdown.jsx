import React from "react";
import "../style/dropdown.css";
import Modal from "./modal";

const Dropdown = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  return (
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
            <div className="menu-item">여행정보</div>
            <div className="menu-divider"></div>
            <Modal className="menu-item" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
