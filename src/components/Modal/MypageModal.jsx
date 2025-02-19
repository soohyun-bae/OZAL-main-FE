import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../Profile/ProfileImage";
import "../../style/Mypage.scss";
import {
  changeToDefaultProfilePic,
  updateNickname,
  updateProfilePic,
} from "../../RTK/authThunk";
import { setUser } from "../../RTK/authSlice";

const MypageModal = () => {
  const isModalOpen = useSelector((state) => state.modal.modals["mypage"]);
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const [newNickname, setNewNickname] = useState(user?.nickname || "");
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(
    user?.profile_image || "src/assets/Frame_3_2.png"
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
        setPreviewPic(updatedPicUrl.profile_image);
        console.log("Profile pic changed successfully");
        const updatedUser = {
          ...user,
          profile_image: updatedPicUrl.profile_image,
        };
        dispatch(setUser({ user: updatedUser, token: token }));
      } catch (error) {
        console.error("profile pic change failed:", error);
        setErrorMessage("프로필 사진 변경에 실패했습니다.");
      }
    }
  };

  const handleNicknameChange = async () => {
    if (newNickname && newNickname !== user.nickname) {
      try {
        const updatedUser = await dispatch(updateNickname(newNickname)).unwrap();
        setErrorMessage("");
        console.log("Nickname updated successfully");

        dispatch(setUser({ user: updatedUser, token: token }));
      } catch (error) {
        console.error("Failed to update nickname:", error);
        setErrorMessage(error.message || "닉네임 변경에 실패했습니다.");
      }
    } else {
      setErrorMessage("변경할 닉네임을 입력해주세요.");
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

  const handleChangeToDefaultProfilePic = async () => {
    try {
      const updatedUser = await dispatch(changeToDefaultProfilePic()).unwrap();
      setPreviewPic(updatedUser.profile_image);
      const updatedUserState = {
        ...user,
        profile_image: updatedUser.profile_image,
      };
      dispatch(setUser({ user: updatedUserState, token: token }));
    } catch (error) {
      console.error("profile pic change failed:", error);
      setErrorMessage("기본 프로필 사진 변경에 실패했습니다.");
    }

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
              <ProfileImage
                src={previewPic || user.profile_image}
                className="profile-pic"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
              <button onClick={changeProfilePic}>프로필 사진 변경</button>
              <button onClick={handleChangeToDefaultProfilePic}>
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
                <button
                  onClick={handleNicknameChange}
                  disabled={!newNickname || newNickname === user.nickname}
                >
                  저장
                </button>
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
