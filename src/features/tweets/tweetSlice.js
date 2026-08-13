import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createTweet,
  dislikeTweet,
  getAllTweets,
  getTweetById,
  getTweetsByUserId,
  likeTweet,
  retweetTweet,
  undoRetweet,
} from "../../services/tweetService";

import {
  addComment,
  removeComment,
} from "../comments/commentSlice";


// HOME FEED
export const fetchAllTweets = createAsyncThunk(
  "tweets/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getAllTweets();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


// TWEET DETAIL
export const fetchTweetById = createAsyncThunk(
  "tweets/fetchById",
  async (tweetId, thunkAPI) => {
    try {
      return await getTweetById(tweetId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


// PROFILE
export const fetchTweetsByUserId = createAsyncThunk(
  "tweets/fetchByUserId",
  async (userId, thunkAPI) => {
    try {
      return await getTweetsByUserId(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


// CREATE TWEET
export const addTweet = createAsyncThunk(
  "tweets/addTweet",
  async (content, thunkAPI) => {
    try {
      return await createTweet(content);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


// LIKE
export const likeTweetById = createAsyncThunk(
  "tweets/like",
  async (tweetId, thunkAPI) => {
    try {
      await likeTweet(tweetId);

      return tweetId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


// DISLIKE
export const dislikeTweetById = createAsyncThunk(
  "tweets/dislike",
  async (tweetId, thunkAPI) => {
    try {
      await dislikeTweet(tweetId);

      return tweetId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


// RETWEET
export const retweetTweetById = createAsyncThunk(
  "tweets/retweet",
  async (tweetId, thunkAPI) => {
    try {
      await retweetTweet(tweetId);

      // currentUserRetweetId backend'den geldiği için
      // güncel tweet listesini tekrar alıyoruz.
      return await getAllTweets();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


// UNDO RETWEET
export const undoRetweetById = createAsyncThunk(
  "tweets/undoRetweet",
  async (retweetId, thunkAPI) => {
    try {
      await undoRetweet(retweetId);

      return await getAllTweets();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


const initialState = {
  items: [],

  // Tweet Detail sayfasında gösterilecek tek tweet.
  selectedTweet: null,

  loading: false,
  detailLoading: false,
  posting: false,

  error: null,
};


const tweetSlice = createSlice({
  name: "tweets",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =========================
      // HOME FEED
      // =========================

      .addCase(fetchAllTweets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAllTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchAllTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // =========================
      // TWEET DETAIL
      // =========================

      .addCase(fetchTweetById.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })

      .addCase(fetchTweetById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedTweet = action.payload;
      })

      .addCase(fetchTweetById.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      })


      // =========================
      // PROFILE
      // =========================

      .addCase(fetchTweetsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTweetsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchTweetsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // =========================
      // CREATE TWEET
      // =========================

      .addCase(addTweet.pending, (state) => {
        state.posting = true;
        state.error = null;
      })

      .addCase(addTweet.fulfilled, (state, action) => {
        state.posting = false;

        // Yeni tweet Home Feed'in en üstüne gelir.
        state.items.unshift(action.payload);
      })

      .addCase(addTweet.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload;
      })


      // =========================
      // LIKE
      // =========================

      .addCase(likeTweetById.fulfilled, (state, action) => {
        const tweetId = action.payload;

        const tweet = state.items.find(
          (tweet) => tweet.id === tweetId,
        );

        if (tweet) {
          tweet.likeCount += 1;
          tweet.likedByCurrentUser = true;
        }

        // Detail sayfasındaki tweet'i de güncelle.
        if (state.selectedTweet?.id === tweetId) {
          state.selectedTweet.likeCount += 1;
          state.selectedTweet.likedByCurrentUser = true;
        }
      })


      // =========================
      // DISLIKE
      // =========================

      .addCase(dislikeTweetById.fulfilled, (state, action) => {
        const tweetId = action.payload;

        const tweet = state.items.find(
          (tweet) => tweet.id === tweetId,
        );

        if (tweet) {
          if (tweet.likeCount > 0) {
            tweet.likeCount -= 1;
          }

          tweet.likedByCurrentUser = false;
        }

        if (state.selectedTweet?.id === tweetId) {
          if (state.selectedTweet.likeCount > 0) {
            state.selectedTweet.likeCount -= 1;
          }

          state.selectedTweet.likedByCurrentUser = false;
        }
      })


      // =========================
      // RETWEET
      // =========================

      .addCase(retweetTweetById.fulfilled, (state, action) => {
        state.items = action.payload;

        // Detail sayfasındaysak o tweet'in güncel halini bul.
        if (state.selectedTweet) {
          const updatedTweet = action.payload.find(
            (tweet) => tweet.id === state.selectedTweet.id,
          );

          if (updatedTweet) {
            state.selectedTweet = updatedTweet;
          }
        }
      })


      // =========================
      // UNDO RETWEET
      // =========================

      .addCase(undoRetweetById.fulfilled, (state, action) => {
        state.items = action.payload;

        if (state.selectedTweet) {
          const updatedTweet = action.payload.find(
            (tweet) => tweet.id === state.selectedTweet.id,
          );

          if (updatedTweet) {
            state.selectedTweet = updatedTweet;
          }
        }
      })


      // =========================
      // COMMENT ADD
      // =========================

      .addCase(addComment.fulfilled, (state, action) => {
        const tweetId = action.payload.tweetId;

        const tweet = state.items.find(
          (tweet) => tweet.id === tweetId,
        );

        if (tweet) {
          tweet.commentCount += 1;
        }

        if (state.selectedTweet?.id === tweetId) {
          state.selectedTweet.commentCount += 1;
        }
      })


      // =========================
      // COMMENT DELETE
      // =========================

      .addCase(removeComment.fulfilled, (state, action) => {
        const tweetId = action.payload.tweetId;

        const tweet = state.items.find(
          (tweet) => tweet.id === tweetId,
        );

        if (tweet && tweet.commentCount > 0) {
          tweet.commentCount -= 1;
        }

        if (
          state.selectedTweet?.id === tweetId &&
          state.selectedTweet.commentCount > 0
        ) {
          state.selectedTweet.commentCount -= 1;
        }
      });
  },
});


export default tweetSlice.reducer;