import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../Profile/ProfileImage";
import "../../style/Mypage.scss";
import { updateNickname } from "../../RTK/authThunk";
import { setUser } from "../../RTK/authSlice";

const MypageModal = () => {
  const isModalOpen = useSelector((state) => state.modal.modals["mypage"]);
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

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
        console.log("success change profile pic");
      } catch (error) {
        console.error("profile pic change failed");
      }
    }
  };

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
    <>
      {isModalOpen && (
        <Modal type="mypage">
          <div className="mypage-container">
            <h2>마이페이지</h2>
            <div className="profile-section">
              <ProfileImage src={previewPic} className="profile-pic" />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
              <button onClick={changeProfilePic}>프로필 사진 변경</button>
              <button onClick={changeToDefaultProfilePic}>
                기본 프로필 사진
              </button>
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
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MypageModal;
