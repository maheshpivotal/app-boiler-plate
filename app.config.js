export default ({ config }) => {
  const environment = process.env.ENVIRONMENT || 'development';
  const isDev = environment === 'development';
  const isStaging = environment === 'staging';
  const isProduction = environment === 'production';
  
  return {
    ...config,
    expo: {
      name: isProduction ? 'PVTL MobApp' : `PVTL MobApp (${environment})`,
      slug: 'pvtl-app-boilerplate',
      version: '1.0.0',
      orientation: 'portrait',
      icon: './assets/icon.png',
      userInterfaceStyle: 'light',
      newArchEnabled: true,
      splash: {
        image: './assets/splash-icon.png',
        resizeMode: 'cover',
        backgroundColor: '#ffcb05'
      },
      ios: {
        supportsTablet: true,
        bundleIdentifier: isProduction 
          ? 'com.yourcompany.mobapp' 
          : `com.yourcompany.mobapp.${environment}`
      },
      android: {
        adaptiveIcon: {
          foregroundImage: './assets/adaptive-icon.png',
          backgroundColor: '#ffcb05'
        },
        edgeToEdgeEnabled: true,
        package: isProduction 
          ? 'com.yourcompany.mobapp' 
          : `com.yourcompany.mobapp.${environment}`
      },
      web: {
        favicon: './assets/favicon.png'
      },
      extra: {
        eas: {
          projectId: '0479c413-b994-4ab1-87b5-e4fd3994e6ae'
        },
        apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api',
        environment: environment,
        features: {
          enableAnalytics: isProduction,
          enableDebugMode: isDev,
          enableCrashReporting: isProduction || isStaging
        }
      },
      owner: 'code-colors',
      updates: {
        url: 'https://u.expo.dev/0479c413-b994-4ab1-87b5-e4fd3994e6ae'
      },
      runtimeVersion: '1.0.0',
      plugins: [
        // Comment out these plugins temporarily to use with Expo Go
        // Uncomment when using development builds
        // 'expo-secure-store',
        // 'expo-local-authentication',
        // 'expo-camera',
        // 'expo-image-picker',
        // 'expo-notifications',
        'expo-splash-screen',
        [
          '@sentry/react-native/expo',
          {
            organization: process.env.SENTRY_ORG || 'your-org',
            project: process.env.SENTRY_PROJECT || 'mob-app-boilerplate',
            // Only enable in production/staging
            disabled: isDev,
          }
        ]
      ]
    }
  };
};
