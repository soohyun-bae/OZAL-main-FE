import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../style/Mypage.scss";
import "../App.css";
import { updateNickname, updateProfilePic } from "../RTK/authThunk";

const Mypage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { error } = useSelector((state) => state.auth);

  const [newNickname, setNewNickname] = useState(user.nickname || "");
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(
    user.profilePic || "src/assets/Frame_3_2.png"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setNewNickname(user.nickname);
  }, [user.nickname]);

  const changeProfilePic = () => {
    if (newProfilePic) {
      const formData = new FormData();
      formData.append("profilePic", newProfilePic);

      dispatch(updateProfilePic(previewPic));
      console.log("프로필 사진 변경 완료");
    } else {
      console.log("새로운 프로필 사진을 선택해주세요.");
    }
  };

  // 닉네임 저장 핸들러
  const handleNicknameChange = () => {
    if (newNickname !== user.nickname) {
      dispatch(updateNickname(newNickname))
        .unwrap()
        .then(() => {
          console.log("nickname has changed");
          setErrorMessage("");
        })
        .catch((error) => {
          console.error("nickname change failed", error);
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("변경된 닉네임이 없습니다.");
    }
  };

  // 프로필 사진 변경 핸들러
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      // const reader = new FileReader();
      // reader.onloadend = () => {
      setPreviewPic(URL.createObjectURL(file));
      setNewProfilePic(file); //쉬운 방법
      // };
      // reader.readAsDataURL(file)
    }
  };

  const changeToDefaultProfilePic = () => {
    setPreviewPic("src/assets/Frame_3_2.png");
    setNewProfilePic(null);
    dispatch(updateProfilePic("src/assets/Frame_3_2.png"));
    alert("프로필 사진이 변경되었습니다!");
  };

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>
      <div className="profile-section">
        <img src={previewPic} alt="프로필 사진" className="profile-pic" />
        <input type="file" accept="image/*" onChange={handleProfilePicChange} />
        <button onClick={changeProfilePic}>프로필 사진 변경</button>
        <button onClick={changeToDefaultProfilePic}>기본 프로필 사진</button>
      </div>
      <div className="info-section">
        <p>
          <strong>이름:</strong> {user.name}
        </p>
        <p>
          <strong>닉네임:</strong>
          <input
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
          <button onClick={handleNicknameChange}>저장</button>
          {errorMessage && <p>{errorMessage}</p>}
        </p>
      </div>
    </div>
  );
};

export default Mypage;
