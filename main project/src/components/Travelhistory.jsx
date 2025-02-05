import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { Map, MapMarker } from "react-kakao-maps-sdk";
import "./Travelhistory.scss";

const Travelhistory = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [mapPosition, setMapPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });
  const fileInputRef = useRef(null);

  const toolbarOptions = [
    { icon: "글꼴", action: () => {} },
    { icon: "크기", action: () => {} },
    { icon: "B", action: () => {}, style: "font-bold" },
    { icon: "I", action: () => {}, style: "italic" },
    { icon: "U", action: () => {}, style: "underline" },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...imageUrls]);
  };

  const handleMapClick = (mouseEvent) => {
    setMapPosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h1>여행 이야기 작성</h1>
        <div className="header-buttons">
          <button className="cancel-button" onClick={() => navigate(-1)}>
            취소
          </button>
          <button className="publish-button">발행</button>
        </div>
      </div>

      <input
        type="text"
        className="title-input"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="toolbar">
        {toolbarOptions.map((option, index) => (
          <button
            key={index}
            className="toolbar-button"
            style={{
              fontWeight: option.style === "font-bold" ? "bold" : "normal",
            }}
          >
            {option.icon}
          </button>
        ))}
        <div className="divider" />
        <button
          className="toolbar-button"
          onClick={() => fileInputRef.current?.click()}
        >
          이미지
        </button>
        <button className="toolbar-button" onClick={() => setShowMap(!showMap)}>
          지도
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="file-input"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </div>

      <div className="content-area">
        <textarea
          className="content-textarea"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {selectedImages.length > 0 && (
          <div className="image-preview">
            {selectedImages.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`업로드 이미지 ${index + 1}`}
                className="preview-image"
              />
            ))}
          </div>
        )}

        {showMap && (
          <div className="map-container">
            <Map
              center={mapPosition}
              style={{ width: "100%", height: "100%" }}
              onClick={handleMapClick}
            >
              <MapMarker position={mapPosition} />
            </Map>
          </div>
        )}
      </div>
    </div>
  );
};

export default Travelhistory;
