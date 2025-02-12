import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import MapModal from "./MapModal";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "../components/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { updatePostData } from "../RTK/postSlice";
import { createPost } from "../RTK/postThunk";

const EditorCommon = () => {
  const quillRef = useRef();
  const dispatch = useDispatch();
  const { postData, loading, error } = useSelector((state) => state.post);
  const [showMapModal, setShowMapModal] = useState(false);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["image"],
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
    "image",
  ];

  const handleLocationSelect = (location) => {
    dispatch(updatePostData({ mapData: location }));
    setShowMapModal(false);

    // 이미지 지도 생성
    if (location) {
      const container = document.getElementById("static-map");

      container.style.width = "1198px";
      container.style.height = "500px";

      const options = {
        marker: {
          text: location.placeName,
          position: new window.kakao.maps.LatLng(location.lat, location.lng),
        },
        center: new window.kakao.maps.LatLng(location.lat, location.lng),
        level: 3,
        mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
      };

      new window.kakao.maps.StaticMap(container, options);
    }
  };

  // 발행 버튼 클릭 시
  const handlePublish = async () => {
    try {
      await dispatch(createPost(postData)).unwrap();
      // 성공 시 목록 페이지로 이동
      // navigate('/posts'); // React Router 사용 시
    } catch (error) {
      console.error("게시글 발행 실패:", error);
    }
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <ReactQuill
          ref={quillRef}
          value={postData.editorData}
          onChange={(content) =>
            dispatch(updatePostData({ editorData: content }))
          }
          modules={modules}
          formats={formats}
          style={{ height: "600px" }}
        />
      </div>
      <div className="image-upload-section">
        <ImageUpload />
      </div>

      <div className="location-section">
        <div className="location-header">
          <h3>위치 정보</h3>
          <button
            className="search-location-btn"
            onClick={() => setShowMapModal(true)}
          >
            위치 검색
          </button>
        </div>

        <div id="static-map" className="static-map">
          {!postData.mapData && (
            <p className="map-placeholder">
              위치를 검색하여 지도를 추가해주세요.
            </p>
          )}
        </div>
      </div>

      {showMapModal && (
        <MapModal
          onClose={() => setShowMapModal(false)}
          onSelect={handleLocationSelect}
        />
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default EditorCommon;
