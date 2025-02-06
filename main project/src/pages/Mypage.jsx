import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNickname, updateProfilePic } from "../RTK/userSlice";
import "./Mypage.scss";

const Mypage = () => {
  const dispatch = useDispatch();
  const { name, profilePic, nickname } = useSelector((state) => state.user);

  const [newNickname, setNewNickname] = useState(nickname);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(profilePic);

  // 닉네임 저장 핸들러
  const handleNicknameChange = () => {
    dispatch(updateNickname(newNickname));
    alert("닉네임이 변경되었습니다!");
  };

  // 프로필 사진 변경 핸들러
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPic(reader.result);
        setNewProfilePic(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // 프로필 사진 저장 핸들러
  const handleProfilePicSave = () => {
    if (newProfilePic) {
      // 실제 서버가 있다면 여기서 업로드 API 호출 (백엔드 필요)
      dispatch(updateProfilePic(previewPic));
      alert("프로필 사진이 변경되었습니다!");
    }
  };

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>
      <div className="profile-section">
        <img
          src={previewPic || "/default-profile.png"}
          alt="프로필 사진"
          className="profile-pic"
        />
        <input type="file" accept="image/*" onChange={handleProfilePicChange} />
        <button onClick={handleProfilePicSave}>프로필 사진 변경</button>
      </div>
      <div className="info-section">
        <p>
          <strong>이름:</strong> {name}
        </p>
        <p>
          <strong>닉네임:</strong>
          <input
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
          <button onClick={handleNicknameChange}>저장</button>
        </p>
      </div>
    </div>
  );
};

export default Mypage;
