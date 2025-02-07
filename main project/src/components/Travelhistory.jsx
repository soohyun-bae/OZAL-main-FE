import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Travelhistory.scss";
import EditorCommon from "../hooks/EditorCommon";

const Travelhistory = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

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

      <div className="content-area">
        <EditorCommon />
      </div>
    </div>
  );
};

export default Travelhistory;
