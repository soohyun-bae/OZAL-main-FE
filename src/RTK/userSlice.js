// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   name: "", // 소셜 로그인에서 받은 이름
//   profilePic: "", // 소셜 로그인에서 받은 프로필 사진 URL
//   nickname: "", // 사용자가 추가할 닉네임
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUserInfo: (state, action) => {
//       state.name = action.payload.name;
//       state.profilePic = action.payload.profilePic;
//     },
//     updateNickname: (state, action) => {
//       state.nickname = action.payload;
//     },
//     updateProfilePic: (state, action) => {
//       state.profilePic = action.payload;
//     },
//   },
// });

// export const { setUserInfo, updateNickname, updateProfilePic } =
//   userSlice.actions;
// export default userSlice.reducer;
