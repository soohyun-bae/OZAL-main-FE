import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  providers: [],
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, providers } = action.payload;
      state.user = user;
      state.providers = providers
      state.isAuthenticated = Boolean(user);
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

