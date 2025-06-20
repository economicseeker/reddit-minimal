import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOffscreenMenuOpen: false,
  isOffscreenMenuClosing: false,
  isSearchFocused: false,
  theme: 'light'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openOffscreenMenu: (state) => {
      state.isOffscreenMenuOpen = true;
      state.isOffscreenMenuClosing = false;
    },
    startCloseOffscreenMenu: (state) => {
      state.isOffscreenMenuClosing = true;
    },
    closeOffscreenMenu: (state) => {
      state.isOffscreenMenuOpen = false;
      state.isOffscreenMenuClosing = false;
    },
    setSearchFocus: (state, action) => {
      state.isSearchFocused = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    }
  }
});

export const {
  openOffscreenMenu,
  startCloseOffscreenMenu,
  closeOffscreenMenu,
  setSearchFocus,
  toggleTheme
} = uiSlice.actions;

export const selectIsOffscreenMenuOpen = (state) => state.ui.isOffscreenMenuOpen;
export const selectIsOffscreenMenuClosing = (state) => state.ui.isOffscreenMenuClosing;
export const selectIsSearchFocused = (state) => state.ui.isSearchFocused;
export const selectTheme = (state) => state.ui.theme;

export default uiSlice.reducer; 