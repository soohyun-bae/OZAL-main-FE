import { useState, useEffect } from "react";
import ImageItem from "../Historyimg/ImageItem";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../RTK/postThunk";

const DiaryDetailpage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { postData, loading, error } = useSelector((state) => state.post);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (postData?.images) {
      setImages(postData.images);
    }
  }, [postData]);

  const imgListHandler = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!postData) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="diary-detail-container">
      {/* 1. 이미지 리스트 섹션 */}
      <section className="images-section">
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
      </section>

      {/* 2. 에디터 내용 섹션 */}
      <section className="content-section">
        <div
          className="editor-content"
          dangerouslySetInnerHTML={{ __html: postData.editorData }}
        />
      </section>

      {/* 3. 지도 데이터 섹션 - 저장된 정적 지도 이미지 표시 */}
      {postData.mapData && (
        <section className="map-section">
          <h3>위치 정보</h3>
          <div className="static-map">
            <img
              src={postData.mapData.staticMapUrl}
              alt="위치 지도"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </div>
          <p className="place-name">{postData.mapData.placeName}</p>
        </section>
      )}
    </div>
  );
};

export default DiaryDetailpage;
