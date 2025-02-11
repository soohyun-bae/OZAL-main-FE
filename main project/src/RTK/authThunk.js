import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const kakaoLogin = createAsyncThunk(
  'auth/kakaoLogin',
  async(code, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        "/ozal/auth/login/kakao/",
        {code},
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)