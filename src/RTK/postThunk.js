import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backendAPI from "../utils/backendAPI";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await backendAPI.post("/ozal/trippost/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${
            localStorage.getItem("token") || sessionStorage.getItem("token")
          }`,
        },
      });

      console.log("게시글 생성 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("게시글 생성 실패:", error);
      return rejectWithValue(
        error.response?.data || "게시글 생성에 실패했습니다"
      );
    }
  }
);

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async ({ post_id }, { rejectWithValue }) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      // API 요청 전 전체 URL 확인
      const fullUrl = `/ozal/trippost/${post_id}/`;

      const response = await backendAPI.get(fullUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("서버 응답 전체:", response);
      console.log("서버 응답 데이터:", response.data);

      // 데이터 구조 확인
      const formattedData = {
        ...response.data,
        id: post_id,
        editorData: response.data.content,
        images: response.data.images,
      };

      console.log("가공된 데이터:", formattedData);
      return formattedData;
    } catch (error) {
      console.error("API 요청 실패 상세:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        config: error.config, // 요청 설정 확인
      });
      return rejectWithValue(
        error.response?.data || "게시글을 불러오는데 실패했습니다"
      );
    }
  }
);

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await backendAPI.get("/ozal/trippost/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("서버 응답 전체:", response);
      console.log("서버 응답 데이터:", response.data);

      // 데이터 구조 확인
      const formattedPosts = response.data.map((post) => ({
        ...post,
        editorData: post.content,
        images: post.thumbnail ? [post.thumbnail] : [],
      }));

      console.log("가공된 데이터:", formattedPosts);
      return formattedPosts;
    } catch (error) {
      console.error("API 요청 실패 상세:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        config: error.config,
      });
      return rejectWithValue(
        error.response?.data || "게시글을 불러오는데 실패했습니다"
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (post_id, { rejectWithValue }) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await backendAPI.delete(`/ozal/trippost/${post_id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return post_id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "삭제에 실패했습니다");
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ post_id, formData }, { rejectWithValue }) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await backendAPI.put(
        `/ozal/trippost/${post_id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "수정에 실패했습니다");
    }
  }
);
