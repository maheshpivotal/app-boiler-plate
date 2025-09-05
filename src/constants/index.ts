// App constants
export const APP_CONFIG = {
  name: 'PVTL MobApp Boilerplate',
  version: '1.0.0',
  description: 'React Native mobile app boilerplate with Laravel integration',
} as const;

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@mobapp/auth_token',
  REFRESH_TOKEN: '@mobapp/refresh_token',
  USER_DATA: '@mobapp/user_data',
  USER_SETTINGS: '@mobapp/user_settings',
  ONBOARDING_COMPLETED: '@mobapp/onboarding_completed',
  THEME_PREFERENCE: '@mobapp/theme_preference',
  LANGUAGE_PREFERENCE: '@mobapp/language_preference',
} as const;

// UI constants
export const COLORS = {
  primary: '#ffcb05',
  primaryDark: '#0056CC',
  secondary: '#FF9500',
  secondaryDark: '#CC7700',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  surface: '#FFFFFF',
  
  // Text colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50,
} as const;

// Animation constants
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Screen dimensions and responsive breakpoints
export const SCREEN_BREAKPOINTS = {
  small: 320,
  medium: 768,
  large: 1024,
} as const;

// Input validation constants
export const VALIDATION = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    message: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  },
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Name must contain only letters and spaces',
  },
} as const;

// API configuration
export const API_CONFIG = {
  timeout: 10000, // 10 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
} as const;

// Date formats
export const DATE_FORMATS = {
  display: 'MMM dd, yyyy',
  full: 'MMMM dd, yyyy',
  short: 'MM/dd/yyyy',
  iso: 'yyyy-MM-dd',
  time: 'HH:mm',
  dateTime: 'MMM dd, yyyy HH:mm',
} as const;

// Navigation constants
export const NAVIGATION_ROUTES = {
  // Root routes
  LOADING: 'Loading',
  AUTH: 'Auth',
  MAIN: 'Main',
  
  // Auth routes
  LOGIN: 'Login',
  REGISTER: 'Register',
  RESET_PASSWORD: 'ResetPassword',
  VERIFY_EMAIL: 'VerifyEmail',
  
  // Main routes
  HOME: 'Home',
  ACCOUNT: 'Account',
  SUBSCRIPTIONS: 'Subscriptions',
  SETTINGS: 'Settings',
} as const;

// Feature flags (can be overridden by environment config)
export const FEATURES = {
  enableBiometric: true,
  enablePushNotifications: true,
  enableAnalytics: false,
  enableCrashReporting: false,
  enableSocialLogin: true,
  enableInAppPurchases: true,
  enableOfflineMode: true,
} as const;
