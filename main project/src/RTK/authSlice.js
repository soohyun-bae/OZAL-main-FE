import { createSlice } from "@reduxjs/toolkit";

const savedAuth = sessionStorage.getItem('auth');
const parsedAuth = savedAuth ? JSON.parse(savedAuth) : null;

const initialState = {
  isAuthenticated: !!(sessionStorage.getItem('token') || localStorage.getItem('token')),
  user: parsedAuth?.user || {
    name: '',
    nickname: '',
    profilePic: '',
  },
  token: sessionStorage.getItem('token') || localStorage.getItem('token') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {user, token, rememberUser} = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      if(rememberUser) {
        localStorage.setItem("token", token);
        localStorage.setItem("auth", JSON.stringify({user}));
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("auth");
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("auth", JSON.stringify({user}));
        localStorage.removeItem("token");
        localStorage.removeItem("auth");
      }
    },
    logout: (state) => {
      state.user = {
        name: '',
        nickname: '',
        profilePic: '',
      };
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("auth");
    },
    updateNickname: (state, action) => {
      state.user.nickname = action.payload;
    },
    updateProfilePic: (state, action) => {
      state.user.profilePic = action.payload;
    },
  },
});

export const {setUser, logout, updateNickname, updateProfilePic} = authSlice.actions;
export default authSlice.reducer;