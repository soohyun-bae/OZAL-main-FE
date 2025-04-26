import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "./ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { updatePostData } from "../RTK/postSlice";
import MapModal from "./Modal/MapModal";
import { openModal } from "../RTK/modalSlice";
import "../style/EditorCommon.scss";

const EditorCommon = ({ onImageFilesChange }) => {
  const quillRef = useRef();
  const dispatch = useDispatch();
  const { postData } = useSelector((state) => state.post);
  const isMapModalOpen = useSelector((state) => state.modal.modals["map"]);

  const handleImagesChange = (images) => {
    // 부모 컴포넌트로 실제 파일들 전달
    console.log("EditorCommon이 받은 이미지:", images);
    onImageFilesChange(images);

    const imageMetadata = Array.from(images).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    dispatch(updatePostData({ image: imageMetadata }));
    console.log("업로드된 이미지들:", images);
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
      ],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "color",
    "background",
    "align",
  ];

  const handleLocationSelect = (location) => {
    if (location) {
      const container = document.getElementById("static-map");

      const options = {
        marker: {
          text: location.placeName,
          position: new window.kakao.maps.LatLng(location.lat, location.lng),
        },
        center: new window.kakao.maps.LatLng(location.lat, location.lng),
        level: 3,
        mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
      };

      const staticMap = new window.kakao.maps.StaticMap(container, options);

      // 정적 지도 URL을 mapData에 포함
      dispatch(
        updatePostData({
          mapData: {
            ...location,
            staticMapImage: container.querySelector("img").src,
          },
        })
      );
    }
    dispatch(closeModal("map"));
  };

  // ReactQuill 내용 변경 핸들러
  const handleEditorChange = (content) => {
    // HTML 형식의 content를 저장
    dispatch(updatePostData({ editorData: content }));
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <ReactQuill
          ref={quillRef}
          value={postData.editorData}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          style={{ width: "90%", height: "600px", margin: "auto" }}
        />
      </div>
      <div className="image-upload-section">
        <ImageUpload onImagesChange={handleImagesChange} />
      </div>

      <div className="location-section">
        <div className="location-header">
          <h3>위치 정보</h3>
          <button
            className="search-location-btn"
            onClick={() => {
              dispatch(openModal("map"));
            }}
          >
            위치 검색
          </button>
          {!postData.mapData && (
            <p className="info-text">* 위치를 검색하여 지도를 추가해주세요.</p>
          )}
        </div>

        <div id="static-map" className="static-map"></div>
      </div>

      {isMapModalOpen && (
        <>
          {console.log("MapModal 렌더링됨!")}
          <MapModal onSelect={handleLocationSelect} />
        </>
      )}
    </div>
  );
};

export default EditorCommon;
