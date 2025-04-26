import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../Profile/ProfileImage";
import "../../style/Mypage.scss";
import { updateNickname, updateProfilePic } from "../../RTK/authThunk";
import { setUser } from "../../RTK/authSlice";
import defaultProfilePic from "../../assets/Frame_3_2.png";

const MypageModal = () => {
  const isModalOpen = useSelector((state) => state.modal.modals["mypage"]);
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const authError = useSelector((state) => state.auth.error)

  const [newNickname, setNewNickname] = useState(user?.nickname || "");
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(
    user?.profile_image || defaultProfilePic
  );

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setNewNickname(user?.nickname || "");
  }, [user]);

  useEffect(() => {
    if(authError) {
      alert(authError);
    }
  }, [authError])

  const changeProfilePic = async () => {
    if (newProfilePic) {
      try {
        const updatedPicUrl = await dispatch(
          updateProfilePic(newProfilePic)
        ).unwrap();
        setPreviewPic(updatedPicUrl);
        setErrorMessage("");
        console.log("success change profile pic");

        dispatch(
          setUser({
            user: { ...user, profile_image: updatedPicUrl },
            token: token,
          })
        );
      } catch (error) {
        // console.error("profile pic change failed");
        setErrorMessage(error.message || "프로필 사진 변경에 실패했습니다.");
      }
    }
  };

  const handleNicknameChange = async () => {
    if (newNickname && newNickname !== user.nickname) {
      try {
        const updatedNickname = await dispatch(updateNickname(newNickname)).unwrap();
        dispatch(setUser({
          user: {...user, nickname: updatedNickname}, token: token
        }));
        setErrorMessage("");
        console.log("Nickname updated successfully");
      } catch (error) {
        console.error("Failed to update nickname:", error);
        console.log('error obj', error)
        setErrorMessage(error || "닉네임 변경에 실패했습니다.");
      }
    } else {
      setErrorMessage("변경할 닉네임을 입력해주세요.");
    }
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewPicURL = URL.createObjectURL(file)
      setPreviewPic(previewPicURL);
      setNewProfilePic(previewPicURL);
    }
  };

  const changeToDefaultProfilePic = async () => {
    setPreviewPic(defaultProfilePic);
    setNewProfilePic(defaultProfilePic);

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
              <ProfileImage src={user?.profile_image} className="profile-pic" />
              <label className="mypage-file">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                />
              </label>
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
                <button
                  onClick={handleNicknameChange}
                  disabled={!newNickname || newNickname === user?.nickname}
                >
                  저장
                </button>
              </div>

              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MypageModal;
