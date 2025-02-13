import { createSlice } from "@reduxjs/toolkit";
import { kakaoLogin, updateNickname, updateProfilePic } from "./authThunk";

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(kakaoLogin.fulfilled, (state, action) => {
        console.log('유저 정보:',action.payload)
        if(action.payload.user && action.payload.tokens) {
          state.user = action.payload.user;
          state.token = action.payload.tokens;
          state.isAuthenticated = true;
        }
        state.error = null;
      })
      .addCase(kakaoLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(updateProfilePic.fulfilled, (state, action) => {
        state.user.profile_image = action.payload;
        localStorage.setItem('auth', JSON.stringify({ user: state.user }));
        sessionStorage.setItem('auth', JSON.stringify({ user: state.user }));
      })
      .addCase(updateProfilePic.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateNickname.fulfilled, (state, action) => {
        state.user.nickname = action.payload;
        localStorage.setItem('auth', JSON.stringify({ user: state.user }));
        sessionStorage.setItem('auth', JSON.stringify({ user: state.user }));
      })
      .addCase(updateNickname.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  }
});

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;