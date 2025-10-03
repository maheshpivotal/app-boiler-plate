// Authentication types
export interface User {
  id: string;
  name?: string; // Laravel returns name field
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  emailVerifiedAt?: string;
  email_verified_at?: string; // Laravel snake_case
  createdAt: string;
  updatedAt: string;
  created_at?: string; // Laravel snake_case
  updated_at?: string; // Laravel snake_case
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  acceptTerms: boolean;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirm {
  token: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// API response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

// Navigation types
export type RootStackParamList = {
  Loading: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  VerifyEmail: { email: string };
};

export type MainTabParamList = {
  Home: undefined;
  Account: undefined;
  Subscriptions: undefined;
};

// Subscription types
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
}

export interface UserSubscription {
  id: string;
  planId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

// App state types
export interface AppState {
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark' | 'system';
  language: string;
  onboardingCompleted: boolean;
}

// Form validation types
export interface FormError {
  field: string;
  message: string;
}

// Settings types
export interface UserSettings {
  notifications: {
    push: boolean;
    email: boolean;
    marketing: boolean;
  };
  privacy: {
    analytics: boolean;
    crashReporting: boolean;
  };
  security: {
    biometric: boolean;
    twoFactor: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
  };
}
