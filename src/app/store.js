import { configureStore } from "@reduxjs/toolkit";

import tweetReducer from "../features/tweets/tweetSlice";
import commentReducer from "../features/comments/commentSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    tweets: tweetReducer,
    comments: commentReducer,
    auth: authReducer,
  },
});