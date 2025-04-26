import React, { useState } from "react";

const Dropdown = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div
      className="dropdown-container"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      {children(isDropdownOpen)}
    </div>
  );
};

export default Dropdown;
