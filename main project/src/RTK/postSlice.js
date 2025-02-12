import { createSlice } from "@reduxjs/toolkit";
import { createPost } from "./postThunk";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    postData: {
      title: "",
      image: [],
      editorData: "",
      mapData: null,
    },
    loading: false,
    error: null,
  },
  reducers: {
    updatePostData: (state, action) => {
      state.postData = { ...state.postData, ...action.payload };
    },
    resetPostData: (state) => {
      state.postData = {
        title: "",
        image: [],
        editorData: "",
        mapData: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.postData = {
          title: "",
          image: [],
          editorData: "",
          mapData: null,
        };
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updatePostData, resetPostData } = postSlice.actions;