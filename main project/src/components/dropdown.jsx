import React from "react";
import "./dropdown.css";

const Dropdown = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  if (!isOpen) return null;

  return (
    <div
      className="dropdown-menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="menu-items">
        <div className="menu-item">마이페이지</div>
        <div className="menu-item">여행기록</div>
        <div className="menu-item">여행정보</div>
        <div className="menu-divider"></div>
        <div className="menu-item">로그인</div>
      </div>
    </div>
  );
};

export default Dropdown;
