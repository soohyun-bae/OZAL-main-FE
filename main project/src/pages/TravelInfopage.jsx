import React from "react";
import "../style/travelInfopage.scss";
import TagList from "../components/TagList";
import TravelInfoCard from "../components/TravelInfoCard";

const TravelInfopage = () => {
  return (
    <>
      <div className="fiexed-header"></div>
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
