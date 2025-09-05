export default ({ config }) => {
  const environment = process.env.ENVIRONMENT || 'development';
  const isDev = environment === 'development';
  const isStaging = environment === 'staging';
  const isProduction = environment === 'production';
  
  return {
    ...config,
    expo: {
      name: isProduction ? 'PVTL MobApp' : `PVTL MobApp (${environment})`,
      slug: 'mob-app-boilerplate',
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
          projectId: '693d5aca-1e24-4bc1-af50-32e15e08a121'
        },
        apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api',
        environment: environment,
        features: {
          enableAnalytics: isProduction,
          enableDebugMode: isDev,
          enableCrashReporting: isProduction || isStaging
        }
      },
      owner: 'code.colors',
      updates: {
        url: 'https://u.expo.dev/693d5aca-1e24-4bc1-af50-32e15e08a121'
      },
      runtimeVersion: {
        policy: 'sdkVersion'
      },
      plugins: [
        'expo-secure-store',
        'expo-local-authentication',
        'expo-camera',
        'expo-image-picker',
        'expo-notifications',
        'expo-splash-screen'
      ]
    }
  };
};
