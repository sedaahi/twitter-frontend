import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  createComment,
  deleteComment,
  getCommentsByTweetId,
  getCommentsByUserId,
  updateComment,
} from "../../services/commentService";


// TWEET'E AİT YORUMLAR
export const fetchCommentsByTweetId =
  createAsyncThunk(
    "comments/fetchByTweetId",
    async (tweetId, thunkAPI) => {
      try {
        const comments =
          await getCommentsByTweetId(tweetId);

        return {
          tweetId,
          comments,
        };
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );


// KULLANICIYA AİT YORUMLAR
export const fetchCommentsByUserId =
  createAsyncThunk(
    "comments/fetchByUserId",
    async (userId, thunkAPI) => {
      try {
        return await getCommentsByUserId(userId);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );


// YORUM EKLE
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ tweetId, content }, thunkAPI) => {
    try {
      const comment =
        await createComment(tweetId, content);

      return {
        tweetId,
        comment,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// YORUM GÜNCELLE
export const editComment = createAsyncThunk(
  "comments/editComment",
  async (
    {
      tweetId,
      commentId,
      content,
    },
    thunkAPI
  ) => {
    try {
      const comment =
        await updateComment(
          commentId,
          tweetId,
          content
        );

      return {
        tweetId,
        comment,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// YORUM SİL
export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async (
    {
      tweetId,
      commentId,
    },
    thunkAPI
  ) => {
    try {
      await deleteComment(commentId);

      return {
        tweetId,
        commentId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


const initialState = {
  byTweetId: {},

  // Profile → Replies için
  userComments: [],

  loadingByTweetId: {},
  userCommentsLoading: false,

  error: null,
};


const commentSlice = createSlice({
  name: "comments",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =========================
      // TWEET YORUMLARI
      // =========================

      .addCase(
        fetchCommentsByTweetId.pending,
        (state, action) => {
          state.loadingByTweetId[
            action.meta.arg
          ] = true;

          state.error = null;
        }
      )

      .addCase(
        fetchCommentsByTweetId.fulfilled,
        (state, action) => {
          const {
            tweetId,
            comments,
          } = action.payload;

          state.loadingByTweetId[
            tweetId
          ] = false;

          state.byTweetId[tweetId] =
            comments;
        }
      )

      .addCase(
        fetchCommentsByTweetId.rejected,
        (state, action) => {
          state.loadingByTweetId[
            action.meta.arg
          ] = false;

          state.error = action.payload;
        }
      )


      // =========================
      // PROFILE REPLIES
      // =========================

      .addCase(
        fetchCommentsByUserId.pending,
        (state) => {
          state.userCommentsLoading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchCommentsByUserId.fulfilled,
        (state, action) => {
          state.userCommentsLoading = false;
          state.userComments = action.payload;
        }
      )

      .addCase(
        fetchCommentsByUserId.rejected,
        (state, action) => {
          state.userCommentsLoading = false;
          state.error = action.payload;
        }
      )


      // =========================
      // YORUM EKLE
      // =========================

      .addCase(
        addComment.fulfilled,
        (state, action) => {
          const {
            tweetId,
            comment,
          } = action.payload;

          if (!state.byTweetId[tweetId]) {
            state.byTweetId[tweetId] = [];
          }

          state.byTweetId[tweetId].push(
            comment
          );

          // Eğer Profile Replies zaten yüklenmişse
          // yeni yorumu oraya da ekleyebiliriz.
          if (
            state.userComments.length > 0
          ) {
            state.userComments.unshift(
              comment
            );
          }
        }
      )


      // =========================
      // YORUM GÜNCELLE
      // =========================

      .addCase(
        editComment.fulfilled,
        (state, action) => {
          const {
            tweetId,
            comment,
          } = action.payload;

          if (state.byTweetId[tweetId]) {
            const index =
              state.byTweetId[
                tweetId
              ].findIndex(
                (item) =>
                  item.id === comment.id
              );

            if (index !== -1) {
              state.byTweetId[tweetId][
                index
              ] = comment;
            }
          }

          const userCommentIndex =
            state.userComments.findIndex(
              (item) =>
                item.id === comment.id
            );

          if (
            userCommentIndex !== -1
          ) {
            state.userComments[
              userCommentIndex
            ] = comment;
          }
        }
      )


      // =========================
      // YORUM SİL
      // =========================

      .addCase(
        removeComment.fulfilled,
        (state, action) => {
          const {
            tweetId,
            commentId,
          } = action.payload;

          if (state.byTweetId[tweetId]) {
            state.byTweetId[tweetId] =
              state.byTweetId[
                tweetId
              ].filter(
                (comment) =>
                  comment.id !==
                  commentId
              );
          }

          state.userComments =
            state.userComments.filter(
              (comment) =>
                comment.id !== commentId
            );
        }
      );
  },
});

export default commentSlice.reducer;