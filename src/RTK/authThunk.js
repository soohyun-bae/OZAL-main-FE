import { createAsyncThunk } from "@reduxjs/toolkit";
import backendAPI from "../utils/backendAPI";

export const kakaoLogin = createAsyncThunk(
  "auth/kakaoLogin",
  async (code, { rejectWithValue }) => {
    try {
      const response = await backendAPI.post("/ozal/auth/login/kakao/", {
        code,
      });

      const { tokens } = response.data;
      
      const userProfileResponse = await backendAPI.get("/ozal/mypage/",
         {
        headers: {
          Authorization: `Bearer ${tokens.access}`, // 토큰을 Authorization 헤더에 추가
        },
      }
    );

      console.log('userProfileResponse:', userProfileResponse.data)
      return { user: userProfileResponse.data, tokens };
    } catch (error) {
      return rejectWithValue('카카오 로그인 실패');
    }
  }
);

export const kakaoLogout = createAsyncThunk(
  "auth/kakaoLogout",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const refreshToken = state.auth.refresh_token;

      if (!refreshToken) {
        return rejectWithValue("Refresh token is missing");
      } // 배포할 땐 지우기

      const response = await backendAPI.post("/ozal/logout/", {
        refresh: refreshToken,
      });

      sessionStorage.clear();
      localStorage.clear();

      return response.data; // 서버 응답 반환 (필요한 경우 처리)
    } catch (error) {
      return rejectWithValue(error.message); // 에러 처리
    }
  }
);

export const updateProfilePic = createAsyncThunk(
  "auth/updateProfilePic",
  async (file, thunkAPI) => {
    try {
      if (typeof file !== "string") {
        const formData = new FormData();
        formData.append("profile_image", file);

         await backendAPI.put(
          "/ozal/mypage/update/image/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const getResponse = await backendAPI.get("/ozal/mypage/");
        console.log('getResponse.data',getResponse.data)
        return getResponse.data.profile_image_url;
      }

      return file;
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
      const response = await backendAPI.patch("/ozal/mypage/update/", {
        nickname: newNickname,
      });
      console.log('nickname response:',response)

      const getResponse = await backendAPI.get("/ozal/mypage/");
        console.log('getResponse.data',getResponse.data)
        return getResponse.data.nickname;
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
