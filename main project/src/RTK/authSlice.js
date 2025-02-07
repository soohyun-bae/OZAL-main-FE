import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: sessionStorage.getItem("token") || localStorage.getItem("token") || null,
    isAuthenticated: !!(sessionStorage.getItem("token") || localStorage.getItem("token")),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      if(actions.payload.rememberUser) {
        localStorage.setItem("token", action.payload.token);
        sessionStorage.removeItem("token");
      } else {
        sessionStorage.setItem("token", action.payload.token);
        localStorage.removeItem("token");
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
});

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;