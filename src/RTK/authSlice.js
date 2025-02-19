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
  // rememberUser: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token.access;
      state.isAuthenticated = true;
      // state.rememberUser = rememberUser;
    },
    // logout: (state) => {
    //   state.user = {
    //     id: null,
    //     email: "",
    //     nickname: "",
    //     profile_image: "",
    //     provider: "",
    //   };
    //   state.token = null;
    //   state.isAuthenticated = false;

    //   sessionStorage.clear();
    //   localStorage.clear();
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(kakaoLogin.fulfilled, (state, action) => {
        if (action.payload.user && action.payload.tokens) {
          console.log("login", action.payload.tokens);
          state.user = action.payload.user;
          state.token = action.payload.tokens;
          // state.refresh_token = action.payload.tokens.refresh;
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
      })
      .addCase(updateProfilePic.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateNickname.fulfilled, (state, action) => {
        state.user.nickname = action.payload;
      })
      .addCase(updateNickname.rejected, (state, action) => {
        state.error = action.payload.message;
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
