const ImageItem = ({ image, imgListHandler }) => {
  return (
    <div style={{ textAlign: "center", margin: "10px" }}>
      <img src={image.src} alt={image.alt} width="150" />
      <br />
      <button
        onClick={() => imgListHandler(image.id)}
        style={{ marginTop: "5px" }}
      >
        삭제
      </button>
    </div>
  );
};

export default ImageItem;
