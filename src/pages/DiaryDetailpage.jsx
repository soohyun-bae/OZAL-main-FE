import React from "react";
import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPost } from "../RTK/postThunk";
import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import image4 from "../assets/4.png";

const mockData = {
  id: 1,
  title: "테스트 여행 일기",
  editorData:
    "<p>이것은 테스트용 에디터 데이터입니다.</p><p>여행이 정말 즐거웠어요!</p>",
  images: [
    {
      id: 1,
      src: image1,
      alt: "테스트 이미지 1",
    },
    {
      id: 2,
      src: image2,
      alt: "테스트 이미지 2",
    },
    {
      id: 3,
      src: image3,
      alt: "테스트 이미지 3",
    },
  ],
  mapData: {
    staticMapUrl: image4,
    placeName: "테스트 장소",
  },
};

const DiaryDetailPage = () => {
  const { id } = useParams();
  // const dispatch = useDispatch();
  // const { postData, loading, error } = useSelector((state) => state.post);

  // useEffect(() => {
  //   dispatch(fetchPost(id));
  // }, [dispatch, id]);

  // if (loading) return <div>로딩 중...</div>;
  // if (error) return <div>에러 발생: {error}</div>;
  // if (!postData) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="diary-detail-container">
      {/* 1. 이미지 리스트 섹션 */}
      <section className="images-section">
        <h2>이미지 리스트</h2>
        <div style={{ display: "flex", gap: "10px", overflow: "scroll" }}>
          {mockData.images.map((image) => (
            <div key={image.id} style={{ minWidth: "300px" }}>
              <img
                src={image.src}
                alt={image.alt}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 2. 에디터 내용 섹션 */}
      <section className="content-section">
        <div
          className="editor-content"
          dangerouslySetInnerHTML={{ __html: mockData.editorData }}
        />
      </section>

      {/* 3. 지도 데이터 섹션 */}
      {mockData.mapData && (
        <section className="map-section">
          <h3>위치 정보</h3>
          <div className="static-map">
            <img
              src={mockData.mapData.staticMapUrl}
              alt="위치 지도"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </div>
          <p className="place-name">{mockData.mapData.placeName}</p>
        </section>
      )}
    </div>
  );
};

export default DiaryDetailPage;
