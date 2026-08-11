import { configureStore } from "@reduxjs/toolkit";
import tweetReducer from "../features/tweets/tweetSlice";

export const store = configureStore({
  reducer: {
    tweets: tweetReducer,
  },
});