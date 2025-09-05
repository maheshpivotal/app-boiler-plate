import { Dimensions, Platform } from 'react-native';
import { VALIDATION } from '../constants';

// Device utilities
export const getDeviceInfo = () => {
  const { width, height } = Dimensions.get('window');
  
  return {
    width,
    height,
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
    isTablet: Math.min(width, height) >= 768,
  };
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  return VALIDATION.email.pattern.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= VALIDATION.password.minLength && 
         VALIDATION.password.pattern.test(password);
};

export const validateName = (name: string): boolean => {
  return name.length >= VALIDATION.name.minLength && 
         name.length <= VALIDATION.name.maxLength &&
         VALIDATION.name.pattern.test(name);
};

// String utilities
export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// Date utilities
export const formatDate = (date: Date | string, format: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Basic date formatting (you might want to use a proper date library like date-fns)
  const options: Intl.DateTimeFormatOptions = {};
  
  switch (format) {
    case 'MMM dd, yyyy':
      options.year = 'numeric';
      options.month = 'short';
      options.day = '2-digit';
      break;
    case 'MMMM dd, yyyy':
      options.year = 'numeric';
      options.month = 'long';
      options.day = '2-digit';
      break;
    case 'MM/dd/yyyy':
      options.year = 'numeric';
      options.month = '2-digit';
      options.day = '2-digit';
      break;
    default:
      options.year = 'numeric';
      options.month = 'short';
      options.day = '2-digit';
  }
  
  return dateObj.toLocaleDateString('en-US', options);
};

export const isDateInPast = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj < new Date();
};

// Error handling utilities
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.data?.message) return error.data.message;
  return 'An unexpected error occurred';
};

export const handleApiError = (error: any, endpoint?: string, method?: string) => {
  // Import error tracker dynamically to avoid circular dependencies
  const { errorTracker } = require('../services/errorTracking');
  
  let errorResponse;
  
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorResponse = {
      message: error.response.data?.message || 'Server error occurred',
      statusCode: error.response.status,
      errors: error.response.data?.errors || {},
    };
  } else if (error.request) {
    // The request was made but no response was received
    errorResponse = {
      message: 'Network error. Please check your connection.',
      statusCode: 0,
      errors: {},
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    errorResponse = {
      message: error.message || 'An unexpected error occurred',
      statusCode: -1,
      errors: {},
    };
  }

  // Log the API error with enhanced context
  if (endpoint) {
    errorTracker.logApiError(error, endpoint, method);
  } else {
    errorTracker.logError('API Error', error, {
      statusCode: errorResponse.statusCode,
      errorMessage: errorResponse.message,
    });
  }

  return errorResponse;
};

// Storage utilities
export const parseStoredData = <T>(data: string | null, fallback: T): T => {
  if (!data) return fallback;
  
  try {
    return JSON.parse(data);
  } catch {
    return fallback;
  }
};

// Async utilities
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const retry = async <T>(
  fn: () => Promise<T>,
  attempts: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (attempts <= 1) throw error;
    
    await sleep(delay);
    return retry(fn, attempts - 1, delay);
  }
};

// Number utilities
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// URL utilities
export const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

// Deep linking utilities
export const buildDeepLink = (path: string, params?: Record<string, string>): string => {
  const queryString = params 
    ? '?' + Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&')
    : '';
  
  return `mobapp://${path}${queryString}`;
};

// Theme utilities
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
