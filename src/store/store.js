import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/postsSlice';
import searchReducer from './features/searchSlice';
import uiReducer from './features/uiSlice';
import subredditsReducer from './features/subredditsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    search: searchReducer,
    ui: uiReducer,
    subreddits: subredditsReducer,
  },
}); 