import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, User, LoginCredentials, RegisterCredentials, ResetPasswordRequest, ResetPasswordConfirm, ApiError } from '../../types';
import { STORAGE_KEYS } from '../../constants';
import { AuthService } from '../../services/api';

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true to check stored auth
  error: null,
};

// Async thunks for auth actions
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      
      if (token && userData) {
        const user = JSON.parse(userData);
        return { user, token };
      }
      
      return null;
    } catch (error) {
      return rejectWithValue('Failed to check auth status');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(credentials);
      
      // Laravel returns data directly, not wrapped in a 'data' field
      if (!response || !response.user || !response.token) {
        throw new Error('Invalid response from server');
      }

      const { user, token, refreshToken } = response;
      
      // Store auth data
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      if (refreshToken) {
        await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      }
      
      return {
        user,
        token,
        refreshToken: refreshToken || null,
      };
    } catch (error: any) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.message || 'Login failed'
      );
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Try to call logout API (will fail gracefully if token is invalid)
      try {
        await AuthService.logout();
      } catch (apiError) {
        // Logout API call failed, but continue with local logout
        console.warn('Logout API call failed:', apiError);
      }
      
      // Clear stored auth data
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.REFRESH_TOKEN,
      ]);
      
      return null;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(credentials);
      // Laravel returns data directly, not wrapped in a 'data' field
      if (!response || !response.user || !response.token) {
        throw new Error('Invalid response from server');
      }

      const { user, token, refreshToken } = response;
      
      // Store auth data
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      if (refreshToken) {
        await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      }
      
      return {
        user,
        token,
        refreshToken: refreshToken || null,
      };
    } catch (error: any) {
      const apiError = error as ApiError;
      
      // Handle specific Laravel validation errors
      if (apiError.statusCode === 422 || apiError.message?.includes('already been taken')) {
        return rejectWithValue('This email is already registered. Please use a different email or try logging in.');
      }
      
      return rejectWithValue(
        apiError.message || 'Registration failed'
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (request: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      const response = await AuthService.forgotPassword(request);
      return response.data?.message || 'Password reset email sent';
    } catch (error: any) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.message || 'Failed to send reset email'
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (request: ResetPasswordConfirm, { rejectWithValue }) => {
    try {
      const response = await AuthService.resetPassword(request);
      return response.data?.message || 'Password reset successful';
    } catch (error: any) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.message || 'Password reset failed'
      );
    }
  }
);

export const refreshAuthToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const refreshToken = state.auth.refreshToken;
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await AuthService.refreshToken();
      const newToken = response.data?.token;
      
      if (!newToken) {
        throw new Error('Invalid refresh response');
      }
      
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, newToken);
      
      return newToken;
    } catch (error: any) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message || 'Token refresh failed');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setNotLoading: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false; // Show login screen
    },
  },
  extraReducers: (builder) => {
    // Check auth status
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })

    // Login
    .addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

    // Register
    .addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.error = null;
    })
    .addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

    // Logout
    .addCase(logout.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

    // Forgot password
    .addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(forgotPassword.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    })
    .addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

    // Reset password
    .addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    })
    .addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

    // Refresh token
    .addCase(refreshAuthToken.fulfilled, (state, action) => {
      state.token = action.payload;
    })
    .addCase(refreshAuthToken.rejected, (state, action) => {
      // Token refresh failed, logout user
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, updateUser, setNotLoading } = authSlice.actions;

export default authSlice.reducer;
