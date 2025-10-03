import { useCallback } from 'react';
import { errorTracker, ErrorLogEntry } from '../services/errorTracking';

/**
 * Hook for easy error tracking throughout the app
 * Provides convenient methods for logging errors, warnings, and info messages
 */
export const useErrorTracking = () => {
  // Log info message
  const logInfo = useCallback((message: string, context?: Record<string, any>) => {
    errorTracker.logInfo(message, context);
  }, []);

  // Log warning
  const logWarning = useCallback((message: string, error?: Error, context?: Record<string, any>) => {
    errorTracker.logWarning(message, error, context);
  }, []);

  // Log error
  const logError = useCallback((message: string, error?: Error, context?: Record<string, any>) => {
    errorTracker.logError(message, error, context);
  }, []);

  // Log fatal error
  const logFatal = useCallback((message: string, error?: Error, context?: Record<string, any>) => {
    errorTracker.logFatal(message, error, context);
  }, []);

  // Log API errors with specific formatting
  const logApiError = useCallback((error: any, endpoint: string, method: string = 'GET') => {
    errorTracker.logApiError(error, endpoint, method);
  }, []);

  // Log navigation errors
  const logNavigationError = useCallback((error: Error, route: string) => {
    errorTracker.logNavigationError(error, route);
  }, []);

  // Log authentication errors
  const logAuthError = useCallback((error: Error, action: string) => {
    errorTracker.logAuthError(error, action);
  }, []);

  // Add breadcrumb for user actions
  const addBreadcrumb = useCallback((message: string, category: string, data?: Record<string, any>) => {
    errorTracker.addBreadcrumb(message, category, data);
  }, []);

  // Set user context
  const setUserContext = useCallback((userId: string, email?: string, additionalData?: Record<string, any>) => {
    errorTracker.setUserContext(userId, email, additionalData);
  }, []);

  // Clear user context
  const clearUserContext = useCallback(() => {
    errorTracker.clearUserContext();
  }, []);

  // Get local logs
  const getLocalLogs = useCallback(async (): Promise<ErrorLogEntry[]> => {
    return errorTracker.getLocalLogs();
  }, []);

  // Clear local logs
  const clearLocalLogs = useCallback(async (): Promise<void> => {
    return errorTracker.clearLocalLogs();
  }, []);

  // Export logs
  const exportLogs = useCallback(async (): Promise<string> => {
    return errorTracker.exportLogs();
  }, []);

  // Wrapper for async operations that automatically logs errors
  const wrapAsync = useCallback(<T>(
    asyncFn: () => Promise<T>,
    errorMessage: string,
    context?: Record<string, any>
  ) => {
    return async (): Promise<T | null> => {
      try {
        return await asyncFn();
      } catch (error) {
        logError(errorMessage, error as Error, context);
        return null;
      }
    };
  }, [logError]);

  // Wrapper for sync operations that automatically logs errors
  const wrapSync = useCallback(<T>(
    syncFn: () => T,
    errorMessage: string,
    context?: Record<string, any>
  ) => {
    return (): T | null => {
      try {
        return syncFn();
      } catch (error) {
        logError(errorMessage, error as Error, context);
        return null;
      }
    };
  }, [logError]);

  return {
    // Logging methods
    logInfo,
    logWarning,
    logError,
    logFatal,
    logApiError,
    logNavigationError,
    logAuthError,
    
    // Breadcrumbs and context
    addBreadcrumb,
    setUserContext,
    clearUserContext,
    
    // Log management
    getLocalLogs,
    clearLocalLogs,
    exportLogs,
    
    // Error handling wrappers
    wrapAsync,
    wrapSync,
  };
};

export default useErrorTracking;


