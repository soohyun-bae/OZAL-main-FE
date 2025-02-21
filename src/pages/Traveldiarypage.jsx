import "/src/style/Traveldairypage.scss";
import cardContainerStyle from "../components/Card/Card.module.scss";
import defaultImage from "../assets/1.png";
import navPicture from "../assets/nav-picture.jpg";
import { useNavigate } from "react-router-dom";
import writing from "../assets/writing-icon.png";
import Header from "../components/Header/Header";
import Card from "../components/Card/Card";
import { useEffect, useRef } from "react";
import { fetchPosts } from "../RTK/postThunk";
import { useDispatch, useSelector } from "react-redux";

const TravelDiaryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const { posts, isLoading, error } = useSelector((state) => state.post);

  // 초기 데이터 페치
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // 카카오 지도 초기화
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(35.8, 127.9), // 남한 중심 좌표
      level: 13, // 남한 전체가 보이는 확대 레벨
    };

    const map = new window.kakao.maps.Map(mapRef.current, options);
  }, []);

  // 로딩 상태 렌더링
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 에러 상태 렌더링
  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  // 글쓰기 버튼 핸들러
  const handleWriteClick = () => {
    navigate("/write-post");
  };

  // 포스트 데이터 정리
  const newestPost = posts.length > 0 ? posts[0] : null;
  const previousPosts = posts.length > 1 ? posts.slice(1) : [];

  console.log("newestPost 전체 데이터:", newestPost);

  return (
    <div className="diary-page">
      <Header
        tex1="내 여행 이야기"
        text2="즐거운 나의 여행이야기"
        imageUrl={navPicture}
      />
      <div className="diary-container">
        <button className="write-button" onClick={handleWriteClick}>
          <img src={writing} alt="글쓰기 아이콘" />
          글쓰기
        </button>

        {/* 최신 포스트 섹션 */}
        {newestPost ? (
          <div className="main-diary-section">
            <div
              className="diary-content"
              onClick={() =>
                navigate(`/diary/${newestPost.post_id || newestPost.id}/`)
              }
              style={{ cursor: "pointer" }}
            >
              <div className="diary-left">
                <img
                  src={newestPost.images?.[0] || defaultImage}
                  alt="최신 여행 사진"
                  className="diary-image"
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                />
                <div className="diary-text">
                  <h3 className="diary-title">{newestPost.title}</h3>
                  <p className="diary-description">{newestPost.content}</p>
                </div>
              </div>
              <div className="diary-map">
                <div className="map-placeholder" ref={mapRef}></div>
              </div>
            </div>
          </div>
        ) : (
          <div>최신 포스트가 없습니다.</div>
        )}

        {/* 이전 포스트 리스트 */}
        <div className="diary-list">
          {previousPosts.length > 0 ? (
            previousPosts.map((post) => (
              <div
                key={post.post_id || post.id || index}
                className={cardContainerStyle["diary-list-item"]}
                onClick={() => navigate(`/diary/${post.post_id || post.id}/`)}
              >
                <Card
                  src={post.images?.[0] || defaultImage}
                  title={post.title}
                  content={post.content}
                />
              </div>
            ))
          ) : (
            <div>이전 포스트가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelDiaryPage;
