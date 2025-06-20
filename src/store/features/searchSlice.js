import { createSlice } from '@reduxjs/toolkit';
import allPosts from '../../data/posts';

const initialState = {
  searchTerm: '',
  searchResults: [],
  isSearching: false,
  error: null
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    startSearch: (state) => {
      state.isSearching = true;
      state.error = null;
    },
    searchSuccess: (state, action) => {
      state.isSearching = false;
      state.searchResults = action.payload;
    },
    searchError: (state, action) => {
      state.isSearching = false;
      state.error = action.payload;
    },
    clearSearch: (state) => {
      state.searchTerm = '';
      state.searchResults = [];
      state.isSearching = false;
      state.error = null;
    }
  }
});

// Thunk for handling search
export const performSearch = (searchTerm) => (dispatch) => {
  dispatch(startSearch());
  try {
    const results = allPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.subreddit.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(searchSuccess(results));
  } catch (error) {
    dispatch(searchError(error.message));
  }
};

export const { 
  setSearchTerm, 
  startSearch, 
  searchSuccess, 
  searchError, 
  clearSearch 
} = searchSlice.actions;

export const selectSearchTerm = (state) => state.search.searchTerm;
export const selectSearchResults = (state) => state.search.searchResults;
export const selectIsSearching = (state) => state.search.isSearching;
export const selectSearchError = (state) => state.search.error;

export default searchSlice.reducer; 