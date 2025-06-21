import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSubredditPosts, fetchFrontPagePosts, searchPosts } from '../../services/redditApi';

// Async thunks for API calls
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ subreddit = null, after = null } = {}, { rejectWithValue }) => {
    try {
      let result;
      if (subreddit) {
        result = await fetchSubredditPosts(subreddit, 25, after);
      } else {
        result = await fetchFrontPagePosts(25, after);
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchPostsAsync = createAsyncThunk(
  'posts/searchPosts',
  async ({ query, after = null } = {}, { rejectWithValue }) => {
    try {
      const result = await searchPosts(query, 25, after);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  posts: [],
  visiblePosts: [],
  visibleCount: 5,
  loading: false,
  error: null,
  after: null,
  before: null,
  currentSubreddit: null,
  searchQuery: null
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
      state.currentSubreddit = subreddit;
      state.searchQuery = null;
      state.visibleCount = 5;
      state.visiblePosts = [];
      state.posts = [];
      state.after = null;
      state.before = null;
    },
    resetPosts: (state) => {
      state.currentSubreddit = null;
      state.searchQuery = null;
      state.visibleCount = 5;
      state.visiblePosts = [];
      state.posts = [];
      state.after = null;
      state.before = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentSubreddit = null;
      state.visibleCount = 5;
      state.visiblePosts = [];
      state.posts = [];
      state.after = null;
      state.before = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        const { posts, after, before } = action.payload;
        
        // If this is a fresh load (no after) or we're loading a new subreddit, replace posts
        if (!after || state.posts.length === 0) {
          state.posts = posts;
          state.visibleCount = 5;
          state.visiblePosts = posts.slice(0, state.visibleCount);
        } else {
          // If loading more, append to existing posts
          state.posts = [...state.posts, ...posts];
          // Don't reset visibleCount, let loadMorePosts handle it
        }
        
        state.after = after;
        state.before = before;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle searchPosts
      .addCase(searchPostsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPostsAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { posts, after, before } = action.payload;
        
        // If this is a fresh search (no after), replace posts
        if (!state.after) {
          state.posts = posts;
          state.visibleCount = 5;
          state.visiblePosts = posts.slice(0, state.visibleCount);
        } else {
          // If loading more, append to existing posts
          state.posts = [...state.posts, ...posts];
          // Don't reset visibleCount, let loadMorePosts handle it
        }
        
        state.after = after;
        state.before = before;
      })
      .addCase(searchPostsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { loadMorePosts, filterBySubreddit, resetPosts, setSearchQuery } = postsSlice.actions;
export const selectPosts = (state) => state.posts.visiblePosts;
export const selectVisibleCount = (state) => state.posts.visibleCount;
export const selectTotalPosts = (state) => state.posts.posts.length;
export const selectLoading = (state) => state.posts.loading;
export const selectError = (state) => state.posts.error;
export const selectAfter = (state) => state.posts.after;
export const selectCurrentSubreddit = (state) => state.posts.currentSubreddit;
export const selectSearchQuery = (state) => state.posts.searchQuery;

export default postsSlice.reducer; 