import { createAsyncThunk } from "@reduxjs/toolkit";
import backendAPI from "../utils/backendAPI";

export const kakaoLogin = createAsyncThunk(
  "auth/kakaoLogin",
  async (code, { rejectWithValue }) => {
    try {
      const response = await backendAPI.post("/ozal/auth/login/kakao/", {
        code,
      });

      const { user, tokens } = response.data;
      const userProfileResponse = await backendAPI.get("/ozal/mypage/", {
        headers: {
          Authorization: `Bearer ${tokens.access}`, // 토큰을 Authorization 헤더에 추가
        },
      });
      return { user: userProfileResponse.data, tokens };
    } catch (error) {
      return rejectWithValue('kakao Login Error:', error);
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

export const uploadProfilePic = async (file) => {
  try {
    const formData = new FormData();
    formData.append("profile_image", file);

    const response = await backendAPI.post('ozal/mypage/upload', formData, {
      headers: {
        "Content-Type": "multipart/form-data"},
    })

    return response.data.profile_image; // url로 변경해야됨
  } catch (error) {
    return error.message;
  }
};

export const updateProfilePic = createAsyncThunk(
  "auth/updateProfilePic",
  async (file, thunkAPI) => {
    try {
      const imageUrl = await uploadProfilePic(file);

      const response = await backendAPI.put('/ozal/mypage/update/image', {
        profile_image: imageUrl,
      });

      return {profile_image: response.data.profile_image};
    } catch (error) {
      return thunkAPI.rejectWithValue("프로필 사진 변경 실패");
    }
  }
);

export const changeToDefaultProfilePic = createAsyncThunk(
  "auth/changeToDefaultProfilePic",
  async (_, thunkAPI) => {
    try {
      const defaultProfilePic = "src/assets/Frame_3_2.png";

      const uploadResponse = await backendAPI.post('ozal/mypage/upload', {
        image_url: defaultProfilePic,
      });

      const defaultImageUrl = uploadResponse.data.profile_url;

      if (!defaultProfilePic) {
        return thunkAPI.rejectWithValue("기본 프로필 사진 URL이 비어있습니다.");
      }

      const response = await backendAPI.put(
        "/ozal/mypage/update/image",
        {profile_image: defaultImageUrl},
      );
      return { profile_image: response.data.profile_image_url };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("기본 프로필 사진 변경 실패");
    }
  }
);

export const updateNickname = createAsyncThunk(
  "auth/updateNickname",
  async (newNickname, { rejectWithValue }) => {
    try {
      const response = await backendAPI.patch("/ozal/mypage/update", {
        nickname: newNickname,
      });

      const updatedNickname = await backendAPI.get("/ozal/mypage/");
      return updatedNickname.data;
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
