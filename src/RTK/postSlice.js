import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPost,
  fetchPosts,
  getPosts,
  deletePost,
  updatePost,
} from "./postThunk";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
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
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.postData = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.postData = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // 수정된 게시글로 상태 업데이트
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updatePostData, resetPostData } = postSlice.actions;
export default postSlice.reducer;
