import TravelInfoCard from "../components/TravelInfoCard";
import infoPicture from "../assets/infopage.png";
import "../style/travelInfopage.scss";
import TagSelector from "../components/TagList/TagSelector";

const TravelInfopage = () => {
  return (
    <>
      <div className="info-page">
        <div className="fiexed-header">
          <div
            className="info-header"
            style={{ backgroundImage: `url(${infoPicture})` }}
          >
            <div className="header-text">
              <h1>여행정보</h1>
              <h2>무엇을 보고 무엇을 먹고 무엇을 즐겨야 할까?</h2>
            </div>
          </div>
        </div>
        <div className="tag-container">
          <TagSelector />
        </div>
        <div className="card-wrapper">
          <TravelInfoCard />
        </div>
      </div>
    </>
  );
};

export default TravelInfopage;
