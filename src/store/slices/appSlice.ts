import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../types';

// Initial state
const initialState: AppState = {
  isLoading: false,
  error: null,
  theme: 'light',
  language: 'en',
  onboardingCompleted: false,
};

// App slice
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.onboardingCompleted = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setTheme,
  setLanguage,
  setOnboardingCompleted,
} = appSlice.actions;

export default appSlice.reducer;
