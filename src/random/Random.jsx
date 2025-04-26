import React, { useState } from "react";
import PLACES from "./places";
import "./Randomstyles.scss";

const TravelWheel = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [result, setResult] = useState("");
  const [rotation, setRotation] = useState(0);
  const [spin, setSpin] = useState(false);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const spinWheel = () => {
    if (spin) return;
    const places = PLACES[selectedRegion];
    if (!places || places.length === 0) {
      setResult("해당 지역의 여행지가 없습니다.");
      return;
    }
    setSpin(true);
    const randomDegree = Math.floor(Math.random() * 360) + 1800; // 최소 5바퀴(1800도) 돌기
    setRotation((prev) => prev + randomDegree);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * places.length);
      const randomPlace = places[randomIndex];
      setResult(`추천 여행지: ${randomPlace} (${selectedRegion})`);
      setSpin(false);
    }, 4500);
  };

  return (
    <div>
      <h1>어디로 여행 갈까? 🎡</h1>

      <label htmlFor="region">여행 지역 선택:</label>
      <select id="region" value={selectedRegion} onChange={handleRegionChange}>
        {Object.keys(PLACES).map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <div id="wheel-container">
        <div id="pointer"></div>
        <div
          id="wheel"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        ></div>
      </div>

      <button id="randomBtn" onClick={spinWheel} disabled={spin}>
        돌려 돌려 돌림판! 🎰
      </button>

      <p id="result">{result}</p>
    </div>
  );
};

export default TravelWheel;
