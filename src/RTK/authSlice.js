import { createSlice } from "@reduxjs/toolkit";
import { kakaoLogin, updateNickname, updateProfilePic } from "./authThunk";

const loadAuthState = () => {
  const localData = localStorage.getItem("persist:root");

  if (localData) {
    const parsedData = JSON.parse(localData);
    if(parsedData.auth) {
      return JSON.parse(parsedData.auth);
    }
  } 

  return {
    user: {
      id: null,
      email: "",
      nickname: "",
      profile_image: "",
      provider: "",
    },
    token: {access: '', refresh: ''},
  };
};

const authState = loadAuthState();

const initialState = {
  user: authState.user,
  token: authState.token?.access,
  refresh_token: authState.token?.refresh,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(kakaoLogin.fulfilled, (state, action) => {
        if (action.payload.user && action.payload.tokens) {
          console.log(action.payload)
          state.user = action.payload.user;
          state.token = action.payload.tokens.access;
          state.refresh_token = action.payload.tokens.refresh;
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
        state.error = action.payload;
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
