import { useState, useEffect, useRef } from "react";
import "./app.css";
import image1 from "./assets/1.png";
import image2 from "./assets/2.png";
import image3 from "./assets/3.png";

export default function MainLayout() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);

  const memoryImages = [
    { src: image1, alt: "추억 1" },
    { src: image2, alt: "추억 2" },
    { src: image3, alt: "추억 3" },
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

  const handleMemoryScroll = (direction) => {
    const container = document.querySelector(".memoryImages");
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8;
    const maxScroll = container.scrollWidth - container.offsetWidth;

    if (direction === "left") {
      if (container.scrollLeft <= 0) {
        container.scrollTo({
          left: maxScroll,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    } else {
      if (container.scrollLeft >= maxScroll) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="container" ref={containerRef}>
      <div className="hamburger-menu">☰</div>

      <section className="section">
        <div className="mainImages">
          {memoryImages.map((image, index) => (
            <div key={index} className="imageSection">
              <img src={image.src} alt={image.alt} />
              {index === 1 && <div className="logo">logo</div>}
            </div>
          ))}
        </div>
        <div className="scroll-arrow">
          <span></span>
        </div>
      </section>

      <section className="section">
        <div className="memorySection">
          <h2>Who's Memory</h2>
          <div className="memorySlider">
            <button
              className="sliderButton"
              onClick={() => handleMemoryScroll("left")}
            >
              ←
            </button>
            <div className="memoryImages">
              {memoryImages.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="memoryImage"
                />
              ))}
            </div>
            <button
              className="sliderButton"
              onClick={() => handleMemoryScroll("right")}
            >
              →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
