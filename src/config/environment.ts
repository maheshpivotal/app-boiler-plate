import Constants from 'expo-constants';

export interface Environment {
  apiBaseUrl: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    enableAnalytics: boolean;
    enableDebugMode: boolean;
    enableCrashReporting: boolean;
  };
}

const getEnvironmentConfig = (): Environment => {
  const extra = Constants.expoConfig?.extra;
  
  return {
    apiBaseUrl: extra?.apiBaseUrl || 'http://localhost:8000/api',
    environment: extra?.environment || 'development',
    features: extra?.features || {
      enableAnalytics: false,
      enableDebugMode: true,
      enableCrashReporting: false,
    },
  };
};

export const ENV = getEnvironmentConfig();

// Helper functions
export const isDevelopment = () => ENV.environment === 'development';
export const isStaging = () => ENV.environment === 'staging';
export const isProduction = () => ENV.environment === 'production';

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    login: `${ENV.apiBaseUrl}/auth/login`,
    register: `${ENV.apiBaseUrl}/auth/register`,
    resetPassword: `${ENV.apiBaseUrl}/auth/reset-password`,
    refreshToken: `${ENV.apiBaseUrl}/auth/refresh`,
    logout: `${ENV.apiBaseUrl}/auth/logout`,
  },
  user: {
    profile: `${ENV.apiBaseUrl}/user/profile`,
    updateProfile: `${ENV.apiBaseUrl}/user/update`,
    deleteAccount: `${ENV.apiBaseUrl}/user/delete`,
  },
  subscriptions: {
    plans: `${ENV.apiBaseUrl}/subscriptions/plans`,
    current: `${ENV.apiBaseUrl}/subscriptions/current`,
    upgrade: `${ENV.apiBaseUrl}/subscriptions/upgrade`,
    cancel: `${ENV.apiBaseUrl}/subscriptions/cancel`,
  },
} as const;
