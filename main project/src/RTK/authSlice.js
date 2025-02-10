import { createSlice } from "@reduxjs/toolkit";

const savedAuth = localStorage.getItem('auth');
const parsedAuth = savedAuth ? JSON.parse(savedAuth) : null;

const initialState = {
  user: parsedAuth?.user || null,
  token: sessionStorage.getItem('token') || localStorage.getItem('token') || null,
  isAuthenticated: !!(sessionStorage.getItem('token') || localStorage.getItem('token')),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // if(action.payload.rememberUser) {
      //   localStorage.setItem("token", action.payload.token);
      //   localStorage.setItem("auth", JSON.stringify({user: action.payload.user}));
      //   sessionStorage.removeItem("token");
      // } else {
        sessionStorage.setItem("token", action.payload.token);
        sessionStorage.setItem("auth", JSON.stringify({user: action.payload.user}));
        localStorage.removeItem("token");
        localStorage.removeItem("auth");
      // }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("auth");
    },
  },
});

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;