import { createSlice } from '@reduxjs/toolkit';
import allPosts from '../../data/posts';

const initialState = {
  posts: allPosts,
  visiblePosts: [],
  visibleCount: 5,
  loading: false,
  error: null
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    loadMorePosts: (state) => {
      state.visibleCount = Math.min(state.visibleCount + 5, state.posts.length);
      state.visiblePosts = state.posts.slice(0, state.visibleCount);
    },
    filterBySubreddit: (state, action) => {
      const subreddit = action.payload;
      state.posts = subreddit
        ? allPosts.filter(post => post.subreddit.toLowerCase() === subreddit.toLowerCase())
        : allPosts;
      state.visibleCount = 5;
      state.visiblePosts = state.posts.slice(0, state.visibleCount);
    },
    resetPosts: (state) => {
      state.posts = allPosts;
      state.visibleCount = 5;
      state.visiblePosts = state.posts.slice(0, state.visibleCount);
    }
  }
});

export const { loadMorePosts, filterBySubreddit, resetPosts } = postsSlice.actions;
export const selectPosts = (state) => state.posts.visiblePosts;
export const selectVisibleCount = (state) => state.posts.visibleCount;
export const selectTotalPosts = (state) => state.posts.posts.length;

export default postsSlice.reducer; 