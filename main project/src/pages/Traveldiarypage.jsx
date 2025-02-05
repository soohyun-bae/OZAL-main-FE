import "/src/style/Traveldairypage.css";
import React, { useState } from "react";
import Dropdown from "../components/dropdown";
import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import navPicture from "../assets/nav-picture.png";
import { useNavigate } from "react-router-dom";
import downIcon from "../assets/down-icon.png";

const TravelDiaryPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

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
  ];

  const handleWriteClick = () => {
    navigate("/write-post");
  };

  return (
    <div className="diary-page">
      <div
        className="diary-header"
        style={{ backgroundImage: `url(${navPicture})` }}
      >
        <Dropdown
          isOpen={isDropdownOpen}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        />
        <div className="header-text">
          <h1>내글목록</h1>
          <h2>즐거운 나의 여행이야기</h2>
        </div>
      </div>

      <div className="diary-container">
        <button className="write-button" onClick={handleWriteClick}>
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
              <div className="map-placeholder">지도 영역</div>
            </div>
          </div>
        </div>

        <img src={downIcon} alt="scroll down" className="scroll-down" />

        {/* 리스트 형태의 게시글들 */}
        <div className="diary-list">
          {posts.map((post) => (
            <div key={post.id} className="diary-list-item">
              <img src={post.image} alt="여행 사진" className="list-image" />
              <div className="list-content">
                <div className="post-date">{post.date}</div>
                <h3 className="list-title">{post.title}</h3>
                <p className="list-description">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelDiaryPage;
