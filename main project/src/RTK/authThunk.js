import { createAsyncThunk } from "@reduxjs/toolkit";
import backendAPI from "../utils/backendAPI";

export const kakaoLogin = createAsyncThunk(
  "auth/kakaoLogin",
  async (code, { rejectWithValue }) => {
    try {
      const response = await backendAPI.post("/ozal/auth/login/kakao/", {
        code,
      });
      if (response.data.loginSuccess == "실패") {
        return rejectWithValue("login failed");
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.loginSuccess === "실패") {
          return rejectWithValue("login failed on server");
        }
        return rejectWithValue("unknown error");
      }
    }
  }
);

export const updateProfilePic = createAsyncThunk(
  "auth/updateProfilePic",
  async (file, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userId = state.auth.user.id;

      let profileImageUrl = file;

      if (typeof file !== "string") {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await backendAPI.post(
          "/ozal/mypage/update/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        profileImageUrl = uploadResponse.data.url;
      }

      await backendAPI.post("/ozal/mypage/updata", {
        user_id: userId,
        profile_image: profileImageUrl,
      });

      return profileImageUrl;
    } catch (error) {
      if (error.response && error.response.data) {
        const { error: errorType, message } = error.response.data;

        if (errorType === "IMAGE_TOO_LARGE") {
          return thunkAPI.rejectWithValue(
            "이미지 크기는 최대 5MB까지 가능합니다."
          );
        }

        if (errorType === "UNSUPPORTED_IMAGE_TYPE") {
          return thunkAPI.rejectWithValue("PNG, JPG 형식만 지원됩니다.");
        }
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateNickname = createAsyncThunk(
  "auth/updateNickname",
  async (newNickname, { rejectWithValue }) => {
    try {
      const response = await backendAPI.post("/ozal/mypage/update", {
        nickname: newNickname,
      });
      return response.data.nickname;
    } catch (error) {
      if (error.response && error.response.data) {
        const { message, error: errorType } = error.response.data;

        if (errorType === "DUPLICATE_NICKNAME") {
          return rejectWithValue(message);
        }
      }
      return rejectWithValue(error.message);
    }
  }
);
