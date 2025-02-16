import TravelInfoCard from "../components/TravelInfoCard";
import infoPicture from "../assets/infopage.png";
import "../style/travelInfopage.scss";
import TagSelector from "../components/TagList/TagSelector";
import Header from "../components/Header/Header";

const TravelInfopage = () => {
  return (
    <>
      <div className="info-page">
        <div className="fiexed-header">
          <Header tex1='여행정보' text2='무엇을 보고 무엇을 먹고 무엇을 즐겨야 할까?' imageUrl={infoPicture} />
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
