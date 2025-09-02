import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../types';

// Create a ref for the navigation container
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Navigation functions that can be called from anywhere in the app
export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function reset(routeName: keyof RootStackParamList) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: routeName as never }],
    });
  }
}

// Get current route name
export function getCurrentRoute() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute();
  }
  return null;
}
