import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllTweets,
  getTweetsByUserId,
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

const initialState = {
  items: [],
  loading: false,
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

      // PROFILE TWEETS
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