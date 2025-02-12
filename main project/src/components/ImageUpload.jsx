import { useState } from "react";
import "../style/ImageUpload.scss";

const ImageUpload = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageUpload = (e) => {
    const files = e.target.files;

    // 10개 초과 선택 시 경고
    if (files.length > 10) {
      alert("이미지는 최대 10개까지 선택 가능합니다.");
      return;
    }

    // 기존 이미지 URL들과 새로 선택한 이미지 URL들을 합침
    const newUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setImageUrls((prev) => [...prev, ...newUrls]);
  };

  // 이미지 삭제 기능 추가
  const handleDeleteImage = (indexToDelete) => {
    setImageUrls((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="image-upload-container">
      <div className="file-input-wrapper">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          // 최대 10개 제한
          max="10"
        />
      </div>
      <p className="info-text">* 이미지는 최대 10개까지 선택 가능합니다.</p>
      <div className="image-preview-container">
        {imageUrls.map((url, index) => (
          <div key={index} className="preview-item">
            <img src={url} alt={`preview-${index}`} className="preview-image" />
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
