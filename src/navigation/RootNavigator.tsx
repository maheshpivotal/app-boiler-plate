import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../types';
import { RootState } from '../store';

// Import navigators
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// Import screens
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isAppLoading, setIsAppLoading] = useState(true); // Separate loading state for styling

  console.log('App State:', { isAuthenticated, isAppLoading }); // Debug log

  // Force show loading screen for 1 second regardless of auth state
  useEffect(() => {
    console.log('RootNavigator: Starting independent 1-second loading timer');
    const timer = setTimeout(() => {
      console.log('RootNavigator: 1 second completed, hiding loading screen');
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
