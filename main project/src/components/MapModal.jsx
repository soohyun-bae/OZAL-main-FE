import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import "../style/MapModal.scss";

const MapModal = ({ onClose, onSelect }) => {
  const [position, setPosition] = useState({
    lat: 37.566826,
    lng: 126.9786567,
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const KAKAO_MAP_KEY = import.meta.env.VITE_MAP_KEY;

  const handleSearch = () => {
    if (!window.kakao || !window.kakao.maps) return;

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(searchKeyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
        const firstPlace = data[0];
        setPosition({
          lat: parseFloat(firstPlace.y),
          lng: parseFloat(firstPlace.x),
        });
      }
    });
  };

  const handleClick = (_t, mouseEvent) => {
    if (!window.kakao || !window.kakao.maps) return;

    const latlng = mouseEvent.latLng;
    setPosition({
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    });
    searchDetailAddrFromCoords(latlng);
  };

  const searchDetailAddrFromCoords = (coords) => {
    if (!window.kakao || !window.kakao.maps) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(
      coords.getLng(),
      coords.getLat(),
      (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address = result[0].address.address_name;
          onSelect({
            address,
            placeName: address,
            lat: coords.getLat(),
            lng: coords.getLng(),
          });
        }
      }
    );
  };

  return (
    <div
      className="map-modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="map-modal"
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "600px",
        }}
      >
        <div className="map-modal-header">
          <h3>위치 선택</h3>
          <div className="search-box">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="장소 검색"
            />
            <button onClick={handleSearch}>검색</button>
          </div>
          <button className="close-button" onClick={onClose}>
            닫기
          </button>
        </div>

        <div style={{ width: "100%", height: "400px", marginTop: "10px" }}>
          <Map
            center={position}
            style={{ width: "100%", height: "100%" }}
            level={3}
            onClick={handleClick}
            apiKey={KAKAO_MAP_KEY}
          >
            <MapMarker position={position} />
          </Map>
        </div>

        <div className="map-modal-footer">
          <p>지도를 클릭하여 위치를 선택하세요</p>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
