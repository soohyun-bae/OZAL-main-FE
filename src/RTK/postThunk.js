import { createAsyncThunk } from "@reduxjs/toolkit";
import backendAPI from "../utils/backendAPI";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // 일반 이미지들과 함께 static map URL도 이미지로 전송
      if (postData.mapData?.staticMapImage) {
        formData.append("image", postData.mapData.staticMapImage);
      }

      // 이미지 파일들이 있는지 확인
      if (postData.image && postData.image.length > 0) {
        postData.image.forEach((file, index) => {
          formData.append(`image`, file);
          console.log(`이미지 ${index + 1} 추가:`, file);
        });
      }

      // 게시글 데이터
      const postContent = {
        title: postData.title,
        content: postData.editorData,
        place: postData.mapData?.placeName || "",
        user: postData.user,
      };

      // JSON 데이터를 FormData에 추가
      formData.append("data", JSON.stringify(postContent));

      // FormData 내용 확인
      console.log("=== FormData 내용 확인 ===");
      for (let [key, value] of formData.entries()) {
        console.log(key, ":", value);
      }

      const response = await backendAPI.post("/ozal/trippost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${
            localStorage.getItem("token") || sessionStorage.getItem("token")
          }`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("전송 실패:", error);
      return rejectWithValue(error.response?.data || "에러가 발생했습니다");
    }
  }
);

export const fetchPost = createAsyncThunk(
  "post/fetchPost",
  async ({ userId, postId }, { rejectWithValue }) => {
    try {
      const response = await backendAPI.get(
        `/ozal/trippost/${userId}/post/${postId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "게시글을 불러오는데 실패했습니다"
      );
    }
  }
);

export const saveMapInfo = async (mapData) => {
  try {
    const mapInfo = {
      detail_address: mapData.placeName,
      address: mapData.address,
      latitude: mapData.latitude,
      longitude: mapData.longitude,
    };

    await backendAPI.post("/ozal/travel/map", mapInfo);
  } catch (error) {
    console.error("지도 정보 저장 실패:", error);
  }
};
