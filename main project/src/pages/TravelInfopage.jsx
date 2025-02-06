import React, { useState } from "react";
import Dropdown from "../components/dropdown";
import "../style/travelInfopage.scss";
import TagList from "../components/TagList";
import TravelInfoCard from "../components/TravelInfoCard";

const TravelInfopage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <div className="fiexed-header">
        <Dropdown
          isOpen={isDropdownOpen}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        />
      </div>
      <div className="tag-container">
        <TagList />
      </div>
      <div className="card-wrapper">
        <TravelInfoCard />
      </div>
    </>
  );
};

export default TravelInfopage;
