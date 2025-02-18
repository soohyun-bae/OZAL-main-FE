import React, { useState, useEffect } from "react";
import "../style/mainpage.scss";
import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import image4 from "../assets/4.png";
import image5 from "../assets/5.png";
import image6 from "../assets/6.png";
import waypoint from "../assets/mainLogo.png";

import downIcon from "../assets/down-icon.png";
import Carousel from "../components/Carousel/Carousel";

const memoryImages = [
  { src: image1, alt: "추억 1" },
  { src: image2, alt: "추억 2" },
  { src: image3, alt: "추억 3" },
  { src: image4, alt: "추억 4" },
  { src: image5, alt: "추억 5" },
];

export default function MainLayout() {
  const [currentSection, setCurrentSection] = useState(0);
  let lastScrollTime = 0;

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
            <img src={waypoint} alt="mainlogo" className="mainlogo" />
          </div>
        </div>
        <div className="scroll-arrow">
          <img src={downIcon} alt="scroll down" className="scroll-down3" />
        </div>
      </section>

      <section className="section">
        <div className="memorySection">
          <h2>Someone's Memory</h2>
          <hr></hr>
          <Carousel images={memoryImages} />
        </div>
      </section>
    </div>
  );
}
