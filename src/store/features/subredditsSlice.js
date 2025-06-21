import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularSubreddits } from '../../services/redditApi';

// Async thunk for fetching popular subreddits
export const fetchSubreddits = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async (_, { rejectWithValue }) => {
    try {
      const subreddits = await fetchPopularSubreddits(20); // Fetch 20 popular subreddits
      return subreddits;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  subreddits: [],
  loading: false,
  error: null
};

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.loading = false;
        state.subreddits = action.payload;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const selectSubreddits = (state) => state.subreddits.subreddits;
export const selectSubredditsLoading = (state) => state.subreddits.loading;
export const selectSubredditsError = (state) => state.subreddits.error;

export default subredditsSlice.reducer; 