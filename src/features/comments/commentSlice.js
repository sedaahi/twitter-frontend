import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createComment,
  deleteComment,
  getCommentsByTweetId,
  updateComment,
} from "../../services/commentService";

export const fetchCommentsByTweetId = createAsyncThunk(
  "comments/fetchByTweetId",
  async (tweetId, thunkAPI) => {
    try {
      const comments = await getCommentsByTweetId(tweetId);

      return {
        tweetId,
        comments,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ tweetId, content }, thunkAPI) => {
    try {
      const comment = await createComment(tweetId, content);

      return {
        tweetId,
        comment,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editComment = createAsyncThunk(
  "comments/editComment",
  async ({ tweetId, commentId, content }, thunkAPI) => {
    try {
      const comment = await updateComment(
        commentId,
        tweetId,
        content
      );

      return {
        tweetId,
        comment,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async ({ tweetId, commentId }, thunkAPI) => {
    try {
      await deleteComment(commentId);

      return {
        tweetId,
        commentId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  byTweetId: {},
  loadingByTweetId: {},
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // YORUMLARI GETİR
      .addCase(fetchCommentsByTweetId.pending, (state, action) => {
        state.loadingByTweetId[action.meta.arg] = true;
        state.error = null;
      })

      .addCase(fetchCommentsByTweetId.fulfilled, (state, action) => {
        const { tweetId, comments } = action.payload;

        state.loadingByTweetId[tweetId] = false;
        state.byTweetId[tweetId] = comments;
      })

      .addCase(fetchCommentsByTweetId.rejected, (state, action) => {
        state.loadingByTweetId[action.meta.arg] = false;
        state.error = action.payload;
      })

      // YORUM EKLE
      .addCase(addComment.fulfilled, (state, action) => {
        const { tweetId, comment } = action.payload;

        if (!state.byTweetId[tweetId]) {
          state.byTweetId[tweetId] = [];
        }

        state.byTweetId[tweetId].push(comment);
      })

      // YORUM GÜNCELLE
      .addCase(editComment.fulfilled, (state, action) => {
        const { tweetId, comment } = action.payload;

        if (!state.byTweetId[tweetId]) {
          return;
        }

        const index = state.byTweetId[tweetId].findIndex(
          (item) => item.id === comment.id
        );

        if (index !== -1) {
          state.byTweetId[tweetId][index] = comment;
        }
      })

      // YORUM SİL
      .addCase(removeComment.fulfilled, (state, action) => {
        const { tweetId, commentId } = action.payload;

        if (state.byTweetId[tweetId]) {
          state.byTweetId[tweetId] =
            state.byTweetId[tweetId].filter(
              (comment) => comment.id !== commentId
            );
        }
      });
  },
});

export default commentSlice.reducer;