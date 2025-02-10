import { configureStore } from "@reduxjs/toolkit";
import {
  citySlice,
  detailInfoSlice,
  districtSlice,
  tourListSlice,
} from "./slice";
import authReducer from './authSlice'
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    city: citySlice.reducer,
    district: districtSlice.reducer,
    tourList: tourListSlice.reducer,
    detailInfo: detailInfoSlice.reducer,
    auth: authReducer,
    user: userReducer, // 유저 상태 추가
  },
});

export default store;
