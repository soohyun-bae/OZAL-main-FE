import "/src/style/Traveldairypage.scss";
import cardContainerStyle from "../components/Card/Card.module.scss";
import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import navPicture from "../assets/nav-picture.jpg";
import { useNavigate } from "react-router-dom";
import writing from "../assets/writing-icon.png";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import { useEffect, useRef } from "react";

const TravelDiaryPage = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const posts = [
    {
      id: 1,
      date: "2024.02.04",
      title: "글제목",
      content:
        "글내용이 여기에 들어갑니다. 글내용이 여기에 들어갑니다. 글내용이 여기에 들어갑니다.",
      image: image2,
    },
    {
      id: 2,
      date: "2024.02.04",
      title: "글제목",
      content:
        "글내용이 여기에 들어갑니다. 글내용이 여기에 들어갑니다. 글내용이 여기에 들어갑니다.",
      image: image3,
    },
    {
      id: 3,
      date: "2024.02.04",
      title: "글제목",
      content:
        "글내용이 여기에 들어갑니다. 글내용이 여기에 들어갑니다. 글내용이 여기에 들어갑니다.",
      image: image3,
    },
    {
      id: 4,
      date: "2024.02.04",
      title: "글제목",
      content:
        "글내용이 여기에 들어갑니다. 글내용이 여기에 들어갑니다. 글내용이 여기에 들어갑니다.",
      image: image3,
    },
  ];

  useEffect(() => {
    if (!mapRef.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(35.8, 127.9), // 남한 중심 좌표
      level: 13, // 남한 전체가 보이는 확대 레벨
    };

    const map = new window.kakao.maps.Map(mapRef.current, options);
  }, []);

  const handleWriteClick = () => {
    navigate("/write-post");
  };

  return (
    <div className="diary-page">
      <Header
        tex1="내글목록"
        text2="즐거운 나의 여행이야기"
        imageUrl={navPicture}
      />
      <div className="diary-container">
        <button className="write-button" onClick={handleWriteClick}>
          <img src={writing} alt="글쓰기 아이콘" />
          <br />
          글쓰기
        </button>

        {/* 첫 번째 섹션: 큰 이미지와 지도 */}
        <div className="main-diary-section">
          <div className="diary-content">
            <div className="diary-left">
              <img src={image1} alt="여행 사진" className="diary-image" />
              <div className="diary-text">
                <h3 className="diary-title">글제목</h3>
                <p className="diary-description">글내용</p>
              </div>
            </div>
            <div className="diary-map">
              <div className="map-placeholder" ref={mapRef}></div>
            </div>
          </div>
        </div>

        {/* 리스트 형태의 게시글들 */}
        <div className="diary-list">
          {posts.map((post) => (
            <div
              key={post.id}
              className={cardContainerStyle["diary-list-item"]}
            >
              <Card
                src={post.image}
                title={post.title}
                info={post.date}
                content={post.content}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelDiaryPage;
