import * as Sentry from '@sentry/react-native';
import { ENV } from '../config/environment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

export interface ErrorLogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'fatal';
  message: string;
  stack?: string;
  context?: Record<string, any>;
  userId?: string;
  environment: string;
}

class ErrorTrackingService {
  private isInitialized = false;
  private localLogs: ErrorLogEntry[] = [];

  /**
   * Initialize error tracking service
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize Sentry if enabled and DSN is provided
      if (ENV.features.enableCrashReporting && this.getSentryDSN()) {
        Sentry.init({
          dsn: this.getSentryDSN(),
          environment: ENV.environment,
          enableAutoSessionTracking: true,
          sessionTrackingIntervalMillis: 30000,
          enableAutoPerformanceTracing: true,
          // Only send in production/staging
          beforeSend: (event) => {
            if (ENV.environment === 'development') {
              console.log('Sentry Event (dev):', event);
              return null; // Don't send in development
            }
            return event;
          },
        });
      }

      // Load existing local logs
      await this.loadLocalLogs();
      
      this.isInitialized = true;
      this.logInfo('Error tracking service initialized', {
        sentryEnabled: !!this.getSentryDSN(),
        environment: ENV.environment,
      });
    } catch (error) {
      console.error('Failed to initialize error tracking:', error);
    }
  }

  /**
   * Log info level message
   */
  logInfo(message: string, context?: Record<string, any>): void {
    this.log('info', message, undefined, context);
  }

  /**
   * Log warning level message
   */
  logWarning(message: string, error?: Error, context?: Record<string, any>): void {
    this.log('warning', message, error, context);
  }

  /**
   * Log error level message
   */
  logError(message: string, error?: Error, context?: Record<string, any>): void {
    this.log('error', message, error, context);
  }

  /**
   * Log fatal error
   */
  logFatal(message: string, error?: Error, context?: Record<string, any>): void {
    this.log('fatal', message, error, context);
  }

  /**
   * Log API errors with specific context
   */
  logApiError(error: any, endpoint: string, method: string = 'GET'): void {
    const context = {
      endpoint,
      method,
      status: error.response?.status,
      data: error.response?.data,
    };

    this.logError(`API Error: ${method} ${endpoint}`, error, context);
  }

  /**
   * Log navigation errors
   */
  logNavigationError(error: Error, route: string): void {
    this.logError(`Navigation Error: ${route}`, error, { route });
  }

  /**
   * Log authentication errors
   */
  logAuthError(error: Error, action: string): void {
    this.logError(`Auth Error: ${action}`, error, { action });
  }

  /**
   * Set user context for error tracking
   */
  setUserContext(userId: string, email?: string, additionalData?: Record<string, any>): void {
    if (this.isInitialized && ENV.features.enableCrashReporting) {
      Sentry.setUser({
        id: userId,
        email,
        ...additionalData,
      });
    }
  }

  /**
   * Clear user context (on logout)
   */
  clearUserContext(): void {
    if (this.isInitialized && ENV.features.enableCrashReporting) {
      Sentry.setUser(null);
    }
  }

  /**
   * Add breadcrumb for tracking user actions
   */
  addBreadcrumb(message: string, category: string, data?: Record<string, any>): void {
    if (this.isInitialized && ENV.features.enableCrashReporting) {
      Sentry.addBreadcrumb({
        message,
        category,
        data,
        level: 'info',
        timestamp: Date.now() / 1000,
      });
    }

    // Also log locally for development
    if (ENV.features.enableDebugMode) {
      console.log(`[Breadcrumb] ${category}: ${message}`, data);
    }
  }

  /**
   * Get local error logs
   */
  async getLocalLogs(): Promise<ErrorLogEntry[]> {
    return this.localLogs;
  }

  /**
   * Clear local error logs
   */
  async clearLocalLogs(): Promise<void> {
    this.localLogs = [];
    await AsyncStorage.removeItem(STORAGE_KEYS.ERROR_LOGS);
  }

  /**
   * Export logs for debugging or support
   */
  async exportLogs(): Promise<string> {
    const logs = await this.getLocalLogs();
    return JSON.stringify(logs, null, 2);
  }

  /**
   * Core logging method
   */
  private log(
    level: ErrorLogEntry['level'],
    message: string,
    error?: Error,
    context?: Record<string, any>
  ): void {
    const logEntry: ErrorLogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      level,
      message,
      stack: error?.stack,
      context,
      environment: ENV.environment,
    };

    // Store locally
    this.localLogs.push(logEntry);
    this.saveLocalLogs();

    // Console logging based on environment
    if (ENV.features.enableDebugMode) {
      const consoleMethod = level === 'fatal' || level === 'error' ? 'error' : 
                           level === 'warning' ? 'warn' : 'log';
      console[consoleMethod](`[${level.toUpperCase()}] ${message}`, {
        error: error?.message,
        stack: error?.stack,
        context,
      });
    }

    // Send to Sentry if enabled
    if (this.isInitialized && ENV.features.enableCrashReporting) {
      if (error) {
        Sentry.withScope((scope) => {
          scope.setLevel(level as any);
          scope.setContext('errorContext', context || {});
          if (level === 'fatal') {
            Sentry.captureException(error);
          } else {
            Sentry.captureException(error);
          }
        });
      } else {
        Sentry.withScope((scope) => {
          scope.setLevel(level as any);
          scope.setContext('messageContext', context || {});
          Sentry.captureMessage(message);
        });
      }
    }

    // Keep only last 100 local logs to prevent memory issues
    if (this.localLogs.length > 100) {
      this.localLogs = this.localLogs.slice(-100);
    }
  }

  /**
   * Load local logs from storage
   */
  private async loadLocalLogs(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.ERROR_LOGS);
      if (stored) {
        this.localLogs = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load local logs:', error);
    }
  }

  /**
   * Save logs to local storage
   */
  private async saveLocalLogs(): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ERROR_LOGS, JSON.stringify(this.localLogs));
    } catch (error) {
      console.error('Failed to save local logs:', error);
    }
  }

  /**
   * Get Sentry DSN from environment or config
   */
  private getSentryDSN(): string | undefined {
    // Add your Sentry DSN here or get it from environment variables
    // return process.env.SENTRY_DSN || 'your-sentry-dsn-here';
    return undefined; // Set this when you have a Sentry project
  }
}

// Export singleton instance
export const errorTracker = new ErrorTrackingService();

// Export convenience functions
export const logInfo = (message: string, context?: Record<string, any>) => 
  errorTracker.logInfo(message, context);

export const logWarning = (message: string, error?: Error, context?: Record<string, any>) => 
  errorTracker.logWarning(message, error, context);

export const logError = (message: string, error?: Error, context?: Record<string, any>) => 
  errorTracker.logError(message, error, context);

export const logFatal = (message: string, error?: Error, context?: Record<string, any>) => 
  errorTracker.logFatal(message, error, context);

export const logApiError = (error: any, endpoint: string, method?: string) => 
  errorTracker.logApiError(error, endpoint, method);

export const addBreadcrumb = (message: string, category: string, data?: Record<string, any>) => 
  errorTracker.addBreadcrumb(message, category, data);
