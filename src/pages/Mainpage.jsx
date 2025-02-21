import React, { useState, useEffect } from "react";
import "../style/mainpage.scss";
import mainLogo from "../assets/mainLogo.png";
import downIcon from "../assets/down-icon.png";
import image6 from "../assets/6.png"; // 메인 이미지는 유지
import Carousel from "../components/Carousel/Carousel";
import { useSelector } from "react-redux";
import backendAPI from "../utils/backendAPI"; // backendAPI import 추가

export default function MainLayout() {
  const [currentSection, setCurrentSection] = useState(0);
  const [memoryImages, setMemoryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  let lastScrollTime = 0;

  // useSelector를 컴포넌트 최상위 레벨로 이동
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await backendAPI.get("/ozal/trippost/thumbnails/");
        const data = response.data;
        console.log("API 응답:", data); // 응답 확인용

        const formattedImages = data.urls.map((url) => ({
          // .urls 추가
          src: url,
          alt: "Someone Memory",
        }));

        setMemoryImages(formattedImages);
      } catch (error) {
        console.error("이미지를 불러오는데 실패했습니다:", error);
        setMemoryImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [auth.token]); // auth.token을 의존성 배열에 추가

  const handleWheel = (e) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastScrollTime < 1000) return;

    const container = document.querySelector(".container");
    if (!container) return;

    if (e.deltaY > 0 && currentSection === 0) {
      container.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
      setCurrentSection(1);
    } else if (e.deltaY < 0 && currentSection === 1) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setCurrentSection(0);
    }

    lastScrollTime = now;
  };

  useEffect(() => {
    const container = document.querySelector(".container");
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [currentSection]);

  return (
    <div className="container">
      <section className="section">
        <div className="mainSlider">
          <div className="mainImageSection">
            <img src={image6} alt="메인 이미지" className="mainImage" />
          </div>
          <div className="logo">
            <img src={mainLogo} alt="mainlogo" className="mainlogo" />
          </div>
        </div>
        <div className="scroll-arrow">
          <img src={downIcon} alt="scroll down" className="scroll-down3" />
        </div>
      </section>

      <section className="section">
        <div className="memorySection">
          <h2>Someone's Memory</h2>
          <hr />
          {loading ? <div>로딩 중...</div> : <Carousel images={memoryImages} />}
        </div>
      </section>
    </div>
  );
}
