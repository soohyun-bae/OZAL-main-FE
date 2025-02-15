import React from "react";
import "./Header.scss";

const Header = ({ tex1, text2, imageUrl }) => {
  return (
    <div
      className='info-header'
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="header-text">
        <h1>{tex1}</h1>
        <h2>{text2}</h2>
      </div>
    </div>
  );
};

export default Header;
