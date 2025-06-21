import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/postsSlice';
import subredditsReducer from './features/subredditsSlice';
import subredditInfoReducer from './features/subredditInfoSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    subreddits: subredditsReducer,
    subredditInfo: subredditInfoReducer,
  },
}); 