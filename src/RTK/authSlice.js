import { createSlice } from "@reduxjs/toolkit";
import { kakaoLogin, updateNickname, updateProfilePic } from "./authThunk";

const loadAuthState = () => {
  const sessionData = sessionStorage.getItem("auth");
  const localData = localStorage.getItem("auth");

  if (sessionData) return JSON.parse(sessionData);
  if (localData) return JSON.parse(localData);

  return {
    user: {
      id: null,
      email: "",
      nickname: "",
      profile_image: "",
      provider: "",
    },
    token: null,
  };
};

const authState = loadAuthState();

const initialState = {
  // isAuthenticated: !!(sessionStorage.getItem('token') || localStorage.getItem('token')),
  user: authState.user,
  token: authState.token,
  // isAuthenticated: false,
  rememberUser: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, tokens, rememberUser } = action.payload;
      state.user = user;
      state.token = tokens.access;
      state.isAuthenticated = true;
      state.rememberUser = rememberUser;

      const authData = JSON.stringify({ user, tokens });
      if (rememberUser) {
        localStorage.setItem("access token", tokens.access);
        localStorage.setItem("refresh_token", tokens.refresh);
        localStorage.setItem("auth", authData);
        sessionStorage.clear();
      } else {
        sessionStorage.setItem("access token", tokens.access);
        sessionStorage.setItem("refresh_token", tokens.refresh);
        sessionStorage.setItem("auth", authData);
        localStorage.clear();
      }
    },
    logout: (state) => {
      state.user = {
        id: null,
        email: "",
        nickname: "",
        profile_image: "",
        provider: "",
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
        if (action.payload.user && action.payload.tokens) {
          console.log("login", action.payload);
          state.user = action.payload.user;
          state.token = action.payload.tokens.access;
          state.isAuthenticated = true;

          const authData = JSON.stringify({
            user: action.payload.user,
            token: action.payload.tokens,
          });
          sessionStorage.setItem("auth", authData);
          sessionStorage.setItem("access token", action.payload.tokens.access);
          localStorage.setItem("refresh_token", action.payload.tokens.refresh);
        }
        state.error = null;
      })
      .addCase(kakaoLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(updateProfilePic.fulfilled, (state, action) => {
        state.user.profile_image = action.payload;

        const authData = JSON.stringify({ user: state.user });
        localStorage.setItem("auth", authData);
        sessionStorage.setItem("auth", authData);
      })
      .addCase(updateProfilePic.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateNickname.fulfilled, (state, action) => {
        state.user.nickname = action.payload;

        const authData = JSON.stringify({ user: state.user });
        localStorage.setItem("auth", authData);
        sessionStorage.setItem("auth", authData);
      })
      .addCase(updateNickname.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
