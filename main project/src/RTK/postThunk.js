import { createAsyncThunk } from "@reduxjs/toolkit";
import backendAPI from "../utils/backendAPI";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      postData.image.forEach((file) => {
        formData.append("image", file);
      });

      if (postData.mapData?.staticMapImage) {
        formData.append("image", postData.mapData.staticMapImage);
      }

      formData.append(
        "data",
        JSON.stringify({
          title: postData.title,
          editorData: postData.editorData,
          mapData: {
            lat: postData.mapData?.lat,
            lng: postData.mapData?.lng,
            placeName: postData.mapData?.placeName,
            address: postData.mapData?.address,
          },
        })
      );

      const response = await backendAPI.post("/ozal/trippost", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "에러가 발생했습니다");
    }
  }
);