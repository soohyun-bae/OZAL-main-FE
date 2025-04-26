import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "../RTK/postThunk";
import "../style/EditDetailPage.scss";

const EditDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postData, loading, error } = useSelector((state) => state.post);
  const user = useSelector((state) => state.auth.user);

  // 수정할 데이터 상태
  const [editData, setEditData] = useState({
    title: "",
    content: "",
    images: [],
    map_image: "",
  });

  // 게시글 데이터 로드
  useEffect(() => {
    if (id) {
      dispatch(getPosts({ post_id: id }))
        .unwrap()
        .then((data) => {
          // 기존 데이터로 폼 초기화
          setEditData({
            title: data.title,
            content: data.content,
            images: data.images || [],
            map_image: data.map_image || "",
          });
        })
        .catch((error) => {
          console.error("게시글 로드 실패:", error);
          alert("게시글을 불러오는데 실패했습니다.");
          navigate("/travel-diary");
        });
    }
  }, [id, dispatch, navigate]);

  // 수정 권한 체크
  useEffect(() => {
    if (postData && user) {
      console.log("권한 체크 디버깅:", {
        "게시글 작성자 ID": postData.user_id,
        "현재 사용자 ID": user.user_id,
        "게시글 데이터": postData,
        "사용자 데이터": user,
      });

      if (postData.user_id !== user.user_id) {
        alert("수정 권한이 없습니다.");
        navigate("/travel-diary");
      }
    }
  }, [postData, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePost({ post_id: id, ...editData })).unwrap();
      alert("게시글이 수정되었습니다.");
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <div className="edit-page-container">
      <form onSubmit={handleSubmit}>
        {/* 제목 */}
        <div className="title-section">
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            placeholder="제목"
            required
          />
        </div>

        {/* 이미지 리스트 */}
        <div className="images-section">
          <h3>이미지</h3>
          <div className="image-list">
            {editData.images.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image} alt={`이미지 ${index + 1}`} />
                <button
                  type="button"
                  onClick={() => {
                    const newImages = editData.images.filter(
                      (_, i) => i !== index
                    );
                    setEditData({ ...editData, images: newImages });
                  }}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              // 여기에 이미지 업로드 로직 추가
              const files = Array.from(e.target.files);
              // 이미지 업로드 후 URL 받아서 images 배열에 추가
            }}
          />
        </div>

        {/* 내용 */}
        <div className="content-section">
          <textarea
            value={editData.content}
            onChange={(e) =>
              setEditData({ ...editData, content: e.target.value })
            }
            placeholder="내용을 입력하세요"
            required
          />
        </div>

        {/* 지도 */}
        {editData.map_image && (
          <div className="map-section">
            <h3>위치 정보</h3>
            <img
              src={editData.map_image}
              alt="위치 지도"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          </div>
        )}

        <div className="button-section">
          <button type="submit">수정 완료</button>
          <button type="button" onClick={() => navigate(`/post/${id}`)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDetailPage;
