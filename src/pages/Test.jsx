import { useState } from "react";
import ImageItem from "../Historyimg/ImageItem";
import image1 from "../Historyimg/1.png";

const Test = () => {
  const initialImages = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    src: image1,
    alt: `이미지 ${i + 1}`,
  }));

  const [images, setImages] = useState(initialImages);

  const imgListHandler = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <h2>이미지 리스트</h2>
      <div style={{ display: "flex", gap: "10px", overflow: "scroll" }}>
        {images.map((image) => (
          <ImageItem
            key={image.id}
            image={image}
            imgListHandler={imgListHandler}
          />
        ))}
      </div>
    </div>
  );
};
export default Test;
