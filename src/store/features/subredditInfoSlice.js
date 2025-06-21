import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSubredditInfo } from '../../services/redditApi';

// Async thunk for fetching subreddit info
export const fetchSubredditInfoAsync = createAsyncThunk(
  'subredditInfo/fetchSubredditInfo',
  async (subreddit, { rejectWithValue }) => {
    try {
      const info = await fetchSubredditInfo(subreddit);
      return info;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  subredditInfo: null,
  loading: false,
  error: null
};

const subredditInfoSlice = createSlice({
  name: 'subredditInfo',
  initialState,
  reducers: {
    clearSubredditInfo: (state) => {
      state.subredditInfo = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubredditInfoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubredditInfoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.subredditInfo = action.payload;
      })
      .addCase(fetchSubredditInfoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSubredditInfo } = subredditInfoSlice.actions;
export const selectSubredditInfo = (state) => state.subredditInfo.subredditInfo;
export const selectSubredditInfoLoading = (state) => state.subredditInfo.loading;
export const selectSubredditInfoError = (state) => state.subredditInfo.error;

export default subredditInfoSlice.reducer; 