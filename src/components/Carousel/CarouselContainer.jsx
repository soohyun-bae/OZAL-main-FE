import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";

const CarouselContainer = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/ozal/trippost/thumbnails/");
        const data = await response.json();

        const formattedImages = data.urls.map((url) => ({
          src: url,
          alt: "Carousel image",
        }));

        setImages(formattedImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return <Carousel images={images} />;
};

export default CarouselContainer;
