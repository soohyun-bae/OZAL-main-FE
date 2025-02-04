import { useState, useEffect, useRef } from "react";
import "../style/mainpage.css";
import Dropdown from "../components/dropdown";
import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import image4 from "../assets/4.png";
import image5 from "../assets/5.png";
import image6 from "../assets/6.png";

export default function MainLayout() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const memoryImages = [
    { src: image1, alt: "추억 1" },
    { src: image2, alt: "추억 2" },
    { src: image3, alt: "추억 3" },
    { src: image4, alt: "추억 4" },
    { src: image5, alt: "추억 5" },
  ];

  const smoothScroll = (targetPosition) => {
    if (!containerRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const startPosition = containerRef.current.scrollTop;
    const distance = targetPosition - startPosition;
    const duration = 900;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      containerRef.current.scrollTop =
        startPosition + distance * easeInOutCubic(progress);

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        setTimeout(() => setIsTransitioning(false), 50);
      }
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    let lastScrollTime = 0;
    const scrollCooldown = 500;

    const handleWheel = (e) => {
      e.preventDefault();

      const currentTime = Date.now();
      if (currentTime - lastScrollTime < scrollCooldown || isTransitioning)
        return;

      const windowHeight = window.innerHeight;

      if (e.deltaY > 0 && currentSection === 0) {
        smoothScroll(windowHeight);
        setCurrentSection(1);
        lastScrollTime = currentTime;
      } else if (e.deltaY < 0 && currentSection === 1) {
        smoothScroll(0);
        setCurrentSection(0);
        lastScrollTime = currentTime;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isTransitioning, currentSection]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? memoryImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === memoryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="container" ref={containerRef}>
      <Dropdown
        isOpen={isDropdownOpen}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      />

      <section className="section">
        <div className="mainSlider">
          <div className="mainImageSection">
            <img src={image6} alt="메인 이미지" className="mainImage" />
          </div>
          <div className="logo">logo</div>
        </div>
        <div className="scroll-arrow">
          <span></span>
        </div>
      </section>

      <section className="section">
        <div className="memorySection">
          <h2>Who's Memory</h2>
          <div className="memorySlider">
            <button className="sliderButton prev" onClick={handlePrev}>
              ⟨
            </button>
            <div className="memoryImages">
              {memoryImages.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className={`memoryImage ${
                    index === currentIndex
                      ? "active"
                      : index ===
                        (currentIndex - 1 + memoryImages.length) %
                          memoryImages.length
                      ? "prev"
                      : index === (currentIndex + 1) % memoryImages.length
                      ? "next"
                      : ""
                  }`}
                />
              ))}
            </div>
            <button className="sliderButton next" onClick={handleNext}>
              ⟩
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
