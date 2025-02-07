import React from "react";
import "../style/travelInfopage.scss";
import TagList from "../components/TagList";
import TravelInfoCard from "../components/TravelInfoCard";
import infoPicture from "../assets/infopage.png";
import "../App.css";

const TravelInfopage = () => {
  return (
    <>
      <div className="fiexed-header">
        <div
          className="diary-header"
          style={{ backgroundImage: `url(${infoPicture})` }}
        >
          <div className="header-text">
            <h1>여행정보</h1>
            <h2>무엇을 보고 무엇을 먹고 무엇을 즐겨야 할까?</h2>
          </div>
        </div>
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
