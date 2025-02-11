import { createSlice } from "@reduxjs/toolkit";
import { kakaoLogin } from "./authThunk";

const loadAuthState = () => {
  const sessionData = sessionStorage.getItem('auth');
  const localData = localStorage.getItem('auth');

  if(sessionData) return JSON.parse(sessionData);
  if(localData) return JSON.parse(localData);
  return {user: {name: '', nickname: '', profilePic: ''}, token: null};
};

const authState = loadAuthState();

const initialState = {
  isAuthenticated: !!(sessionStorage.getItem('token') || localStorage.getItem('token')),
  user: authState.user,
  token: authState.token,
  error: null,
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
        sessionStorage.clear();
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("auth", JSON.stringify({user}));
        localStorage.clear();
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
      
      sessionStorage.clear();
      localStorage.clear();
    },
    updateNickname: (state, action) => {
      state.user.nickname = action.payload;
      localStorage.setItem('auth', JSON.stringify({user: state.user}));
      sessionStorage.setItem('auth', JSON.stringify({user: state.user}));
    },
    updateProfilePic: (state, action) => {
      state.user.profilePic = action.payload;
      localStorage.setItem('auth', JSON.stringify({user: state.user}));
      sessionStorage.setItem('auth', JSON.stringify({user: state.user}));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(kakaoLogin.fulfilled, (state, action) => {
        if(action.payload.user && action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
        state.error = null;
      })
      .addCase(kakaoLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
      })
  }
});

export const {setUser, logout, updateNickname, updateProfilePic} = authSlice.actions;
export default authSlice.reducer;