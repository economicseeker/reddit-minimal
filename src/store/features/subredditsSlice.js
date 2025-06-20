import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subreddits: [
    'Bitcoin',
    'NoStupidQuestions',
    'BaldursGate3',
    'facepalm',
    'interestingasfuck',
    'Damnthatsinteresting',
    'LivestreamFail',
    'Palworld'
  ],
  currentSubreddit: null,
  loading: false,
  error: null
};

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {
    setCurrentSubreddit: (state, action) => {
      state.currentSubreddit = action.payload;
    },
    clearCurrentSubreddit: (state) => {
      state.currentSubreddit = null;
    },
    addSubreddit: (state, action) => {
      if (!state.subreddits.includes(action.payload)) {
        state.subreddits.push(action.payload);
      }
    },
    removeSubreddit: (state, action) => {
      state.subreddits = state.subreddits.filter(sub => sub !== action.payload);
      if (state.currentSubreddit === action.payload) {
        state.currentSubreddit = null;
      }
    }
  }
});

export const {
  setCurrentSubreddit,
  clearCurrentSubreddit,
  addSubreddit,
  removeSubreddit
} = subredditsSlice.actions;

export const selectSubreddits = (state) => state.subreddits.subreddits;
export const selectCurrentSubreddit = (state) => state.subreddits.currentSubreddit;

export default subredditsSlice.reducer; 