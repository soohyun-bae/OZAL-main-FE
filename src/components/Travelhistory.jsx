import React, { useRef, useState } from "react";
import { useHref, useNavigate } from "react-router-dom";
import "../style/Travelhistory.scss";
import EditorCommon from "./EditorCommon";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../RTK/postThunk";

const Travelhistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postData } = useSelector((state) => state.post);
  const [title, setTitle] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  const handleImageFilesChange = (files) => {
    setImageFiles(files);
  };

  const handlePublish = async () => {
    try {
      // FormData 객체 생성
      const formData = new FormData();

      // 필수 데이터 추가
      formData.append("title", title);
      formData.append("content", postData.editorData);
      // 이미지 파일들 추가
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          formData.append("images", file);
        });
      }

      // 지도 데이터가 있다면 추가
      if (postData.mapData?.staticMapImage) {
        formData.append("map_image", postData.mapData.staticMapImage);
      }
      console.log("지도 데이터:", postData.mapData?.staticMapImage);
      const result = await dispatch(createPost(formData)).unwrap();

      if (result.post_id) {
        navigate(`/diary/${result.post_id}/`);
      } else {
        throw new Error("게시글 ID를 받지 못했습니다");
      }
    } catch (error) {
      console.error("게시글 생성 실패:", error);
      alert("게시글 발행에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h1>여행 이야기 작성</h1>
        <div className="header-buttons">
          <button className="cancel-button" onClick={() => navigate(-1)}>
            취소
          </button>
          <button className="publish-button" onClick={handlePublish}>
            발행
          </button>
        </div>
      </div>

      <input
        type="text"
        className="title-input"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="content-area">
        <EditorCommon onImageFilesChange={handleImageFilesChange} />
      </div>
    </div>
  );
};

export default Travelhistory;
