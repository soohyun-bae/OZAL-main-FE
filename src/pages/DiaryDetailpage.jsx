import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/DiaryDetailPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../RTK/postThunk";
import { deletePost } from "../RTK/postThunk";

const DiaryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postData, loading, error } = useSelector((state) => state.post);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (id) {
      console.log("게시글 상세 조회 요청:", id);
      dispatch(getPosts({ post_id: id }))
        .unwrap()
        .then((data) => {
          console.log("게시글 데이터 로드 성공:", data);
        })
        .catch((error) => {
          console.error("게시글 로드 실패:", error);
        });
    }
  }, [dispatch, id]);

  // 로딩, 에러, 데이터 상태 확인을 위한 콘솔 로그
  useEffect(() => {
    console.log("현재 상태:", {
      loading,
      error,
      postData,
    });
  }, [loading, error, postData]);

  if (loading) {
    console.log("로딩 중...");
    return <div>로딩 중...</div>;
  }
  if (error) {
    console.error("에러 발생:", error);
    return <div>에러 발생: {error}</div>;
  }
  if (!postData) {
    console.log("게시글 데이터 없음");
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const handleEdit = () => {
    console.log("수정 페이지로 이동:", id);
    navigate(`/edit-detail/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        console.log("게시글 삭제 요청:", id);
        await dispatch(deletePost(id)).unwrap();
        navigate("/travel-diary");
      } catch (error) {
        console.error("게시글 삭제 실패:", error);
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <div className="diary-detail-container">
      <div className="action-buttons">
        <button onClick={handleEdit} className="edit-button">
          수정
        </button>
        <button onClick={handleDelete} className="delete-button">
          삭제
        </button>
      </div>

      {/* 이미지 리스트 섹션 */}
      <section className="images-section">
        <h2>이미지 리스트</h2>
        <div className="imglist">
          {postData.images &&
            postData.images.map((images, index) => (
              <div key={index}>
                <img src={images} alt={`여행 이미지 ${index + 1}`} />
              </div>
            ))}
        </div>
      </section>

      {/* 에디터 내용 섹션 */}
      <section className="content-section">
        <h1>{postData.title}</h1>
        <div
          className="editor-content"
          dangerouslySetInnerHTML={{ __html: postData.content }}
        />
      </section>

      {/* 지도 데이터 섹션 */}
      {postData.map_image && (
        <section className="map-section">
          <h3>위치 정보</h3>
          <div className="static-map">
            <img
              src={postData.map_image}
              alt="위치 지도"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default DiaryDetailPage;
