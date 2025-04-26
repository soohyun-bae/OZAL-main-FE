import { useState } from "react";
import "../style/ImageUpload.scss";

const ImageUpload = ({ onImagesChange }) => {
  const [imageFiles, setImageFiles] = useState([]);

  const handleImageUpload = (e) => {
    const files = e.target.files;

    if (files.length > 10) {
      alert("이미지는 최대 10개까지 선택 가능합니다.");
      return;
    }

    const newFiles = Array.from(files);
    const updatedFiles = [...imageFiles, ...newFiles];

    if (updatedFiles.length > 10) {
      alert("총 이미지 개수가 10개를 초과할 수 없습니다.");
      return;
    }

    setImageFiles(updatedFiles);
    console.log("ImageUpload에서 전달하는 파일:", newFiles);
    onImagesChange(updatedFiles); // File 객체 배열을 직접 전달
  };

  const handleDeleteImage = (indexToDelete) => {
    const updatedFiles = imageFiles.filter(
      (_, index) => index !== indexToDelete
    );
    setImageFiles(updatedFiles);
    onImagesChange(updatedFiles);
  };

  return (
    <div className="image-upload-container">
      <div className="file-input-wrapper">
        <h3>이미지 업로드</h3>
        <input
          type="file"
          id="file-input"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          max="10"
        />
        <label htmlFor="file-input">이미지 선택</label>
        <p className="info-text">* 이미지는 최대 10개까지 선택 가능합니다.</p>
      </div>
      <div className="image-preview-container">
        {imageFiles.map((file, index) => (
          <div key={index} className="preview-item">
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              className="preview-image"
            />
            <button
              className="delete-button"
              onClick={() => handleDeleteImage(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
