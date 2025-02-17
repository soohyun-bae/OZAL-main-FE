import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Travelhistory.scss";
import EditorCommon from "./EditorCommon";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../RTK/postThunk";

const Travelhistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postData } = useSelector((state) => state.post);
  const [title, setTitle] = useState("");

  const handlePublish = async () => {
    try {
      const result = await dispatch(
        createPost({ ...postData, title })
      ).unwrap();
      console.log("게시글 발행 성공");
      navigate(`/diary/${result.id}`);
    } catch (error) {
      console.error("게시글 발행 실패:", error);
      alert("게시글 발행에 실패했습니다. 서버 연결을 확인해주세요.");
    }
  };

  const handleTestNavigate = () => {
    navigate("/diary-detail/1");
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
          <button onClick={handleTestNavigate}>test</button>
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
        <EditorCommon />
      </div>
    </div>
  );
};

export default Travelhistory;
