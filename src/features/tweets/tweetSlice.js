import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTweet,
  dislikeTweet,
  getAllTweets,
  getTweetsByUserId,
  likeTweet,
} from "../../services/tweetService";

export const fetchAllTweets = createAsyncThunk(
  "tweets/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getAllTweets();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTweetsByUserId = createAsyncThunk(
  "tweets/fetchByUserId",
  async (userId, thunkAPI) => {
    try {
      return await getTweetsByUserId(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTweet = createAsyncThunk(
  "tweets/addTweet",
  async (content, thunkAPI) => {
    try {
      return await createTweet(content);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const likeTweetById = createAsyncThunk(
  "tweets/like",
  async (tweetId, thunkAPI) => {
    try {
      await likeTweet(tweetId);
      return tweetId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const dislikeTweetById = createAsyncThunk(
  "tweets/dislike",
  async (tweetId, thunkAPI) => {
    try {
      await dislikeTweet(tweetId);
      return tweetId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  posting: false,
  error: null,
};

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // HOME FEED
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

      // PROFILE
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

      // CREATE TWEET
      .addCase(addTweet.pending, (state) => {
        state.posting = true;
        state.error = null;
      })

      .addCase(addTweet.fulfilled, (state, action) => {
        state.posting = false;

        //unshift-> Yeni tweet en üstte görünür.
        state.items.unshift(action.payload);
      })

      .addCase(addTweet.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload;
      })

      //LIKE
      .addCase(likeTweetById.fulfilled, (state, action) => {
        const tweet = state.items.find(
          (tweet) => tweet.id === action.payload
        );

        if (tweet) {
          tweet.likeCount += 1;
          tweet.likedByCurrentUser = true;
        }
      })

      .addCase(dislikeTweetById.fulfilled, (state, action) => {
        const tweet = state.items.find(
          (tweet) => tweet.id === action.payload
        );

        if (tweet) {
          if (tweet.likeCount > 0) {
            tweet.likeCount -= 1;
          }

          tweet.likedByCurrentUser = false;
        }
      });
  },
});

export default tweetSlice.reducer;

/*
dispatch(fetchTweetsByUserId(1))
              ↓
           pending
              ↓
loading = true
              ↓
       backend request
          ↙       ↘
     başarılı     hata
        ↓           ↓
   fulfilled     rejected
        ↓           ↓
 tweets gelir   error dolar
*/