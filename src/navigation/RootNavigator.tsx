import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../types';
import { RootState, useAppSelector, store } from '../store';

// Import navigators
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// Import screens
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  // Use separate selectors to avoid unnecessary re-renders
  // Add more defensive checks for state access
  const isAuthenticated = useAppSelector((state) => {
    // Ensure state exists and auth slice exists before accessing properties
    if (!state || typeof state !== 'object' || !state.auth) {
      return false;
    }
    return state.auth.isAuthenticated || false;
  });
  
  const isLoading = useAppSelector((state) => {
    if (!state || typeof state !== 'object' || !state.auth) {
      return true; // Show loading if state is not ready
    }
    return state.auth.isLoading || false;
  });
  
  const [isAppLoading, setIsAppLoading] = useState(true); // Separate loading state for styling

  // Force show loading screen for 1 second regardless of auth state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1000); // 1 second - back to normal

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen for 1 second
  if (isAppLoading) {
    return (
      <NavigationContainer theme={{ 
        dark: false, 
        colors: { 
          primary: '#ffcb05', 
          background: '#ffcb05', 
          card: '#ffcb05', 
          text: '#ffffff', 
          border: '#ffcb05', 
          notification: '#ffcb05' 
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: 'bold',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '700',
          },
        }
      }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // After loading, show auth or main based on authentication
  return (
    <NavigationContainer theme={{
      dark: false,
      colors: {
        primary: '#007AFF',
        background: '#ffffff',
        card: '#ffffff',
        text: '#000000',
        border: '#e0e0e0',
        notification: '#007AFF'
      },
      fonts: {
        regular: {
          fontFamily: 'System',
          fontWeight: '400',
        },
        medium: {
          fontFamily: 'System',
          fontWeight: '500',
        },
        bold: {
          fontFamily: 'System',
          fontWeight: 'bold',
        },
        heavy: {
          fontFamily: 'System',
          fontWeight: '700',
        },
      }
    }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
