import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../style/Mypage.scss";
import "../App.css";
import { updateNickname, updateProfilePic } from "../RTK/authThunk";
import { setUser } from "../RTK/authSlice";
import ProfileImage from "../components/Profile/ProfileImage";

const Mypage = () => {
  const dispatch = useDispatch();
  const { user, token, error } = useSelector((state) => state.auth);

  const [newNickname, setNewNickname] = useState(user?.nickname || "");
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(
    user?.profilePic || "src/assets/Frame_3_2.png"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setNewNickname(user?.nickname || "");
  }, [user]);

  const changeProfilePic = async () => {
    if (newProfilePic) {
      try {
        const updatedPicUrl = await dispatch(
          updateProfilePic(newProfilePic)
        ).unwrap();
        setPreviewPic(updatedPicUrl);
        console.log("Profile pic changed successfully");
        const updatedUser = { ...user, profile_image: updatedPicUrl };
        dispatch(setUser({ user: updatedUser, token: token }));
      } catch (error) {
        console.error("profile pic change failed:", error);
        setErrorMessage("프로필 사진 변경에 실패했습니다.");
      }
    }
  };

  const handleNicknameChange = () => {
    if (newNickname !== user.nickname) {
      dispatch(updateNickname(newNickname))
        .unwrap()
        .then((changedNickname) => {
          console.log("nickname has changed");
          setErrorMessage("");

          const updatedUser = { ...user, nickname: changedNickname };
          dispatch(setUser({ user: updatedUser, token: token }));
        })
        .catch((error) => {
          console.error("nickname change failed", error);
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("변경된 닉네임이 없습니다.");
    }
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setPreviewPic(URL.createObjectURL(file));
      setNewProfilePic(file);
    }
  };

  const changeToDefaultProfilePic = async () => {
    const defaultProfilePic = "src/assets/Frame_3_2.png";

    setPreviewPic(defaultProfilePic);
    setNewProfilePic(null);

    const updatedUser = { ...user, profile_image: defaultProfilePic };

    dispatch(setUser({ user: updatedUser, token: token }));
  };

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>
      <div className="profile-section">
        <ProfileImage src={previewPic} className="profile-pic" />
        <input type="file" accept="image/*" onChange={handleProfilePicChange} />
        <button onClick={changeProfilePic}>프로필 사진 변경</button>
        <button onClick={changeToDefaultProfilePic}>기본 프로필 사진</button>
      </div>
      <div className="info-section">
        <span>이름 : {user?.nickname}</span>
        <div className="nickname">
          <span>닉네임 :</span>
          <input
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
          <button onClick={handleNicknameChange}>저장</button>
          {errorMessage && <p>{errorMessage}</p>}
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
