import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList, AuthStackParamList, MainTabParamList } from '../types';

// Navigation prop types for type-safe navigation
export type RootNavigationProp = NavigationProp<RootStackParamList>;
export type AuthNavigationProp = NavigationProp<AuthStackParamList>;
export type MainNavigationProp = NavigationProp<MainTabParamList>;

// Route prop types for type-safe route params
export type RootRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
export type AuthRouteProp<T extends keyof AuthStackParamList> = RouteProp<AuthStackParamList, T>;
export type MainRouteProp<T extends keyof MainTabParamList> = RouteProp<MainTabParamList, T>;

// Screen prop types combining navigation and route
export type RootScreenProps<T extends keyof RootStackParamList> = {
  navigation: NavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> = {
  navigation: NavigationProp<AuthStackParamList, T>;
  route: RouteProp<AuthStackParamList, T>;
};

export type MainScreenProps<T extends keyof MainTabParamList> = {
  navigation: NavigationProp<MainTabParamList, T>;
  route: RouteProp<MainTabParamList, T>;
};

// Deep linking configuration
export const linking = {
  prefixes: ['mobapp://', 'https://mobapp.com'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
          Register: 'register',
          ResetPassword: 'reset-password',
          VerifyEmail: 'verify-email',
        },
      },
      Main: {
        screens: {
          Home: 'home',
          Account: 'account',
          Subscriptions: 'subscriptions',
        },
      },
    },
  },
};

// Screen options helpers
export const defaultScreenOptions = {
  headerShown: false,
  gestureEnabled: true,
};

export const authScreenOptions = {
  ...defaultScreenOptions,
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

// Navigation guards
export const requireAuth = (isAuthenticated: boolean, navigation: any) => {
  if (!isAuthenticated) {
    navigation.replace('Auth');
    return false;
  }
  return true;
};

export const requireNoAuth = (isAuthenticated: boolean, navigation: any) => {
  if (isAuthenticated) {
    navigation.replace('Main');
    return false;
  }
  return true;
};
