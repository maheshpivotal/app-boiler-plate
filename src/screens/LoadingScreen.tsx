import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { COLORS, SPACING } from '../constants';
import { checkAuthStatus } from '../store/slices/authSlice';
import { AppDispatch } from '../store';

const LoadingScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (hasInitialized.current) {
      return;
    }
    
    hasInitialized.current = true;

    // Check authentication status when the loading screen mounts
    const initializeApp = async () => {
      try {
        console.log('LoadingScreen: Starting auth check (first time only)');
        // Add a small delay for smoother UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user is authenticated
        dispatch(checkAuthStatus());
      } catch (error) {
        console.error('Error initializing app:', error);
        // Dispatch action to handle error
        dispatch(checkAuthStatus());
      }
    };

    initializeApp();
  }, []); // Remove dispatch from dependencies to prevent re-runs

  return (
    <View style={styles.container}>
      {/* App Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>MobApp</Text>
        <Text style={styles.tagline}>Mobile App Boilerplate</Text>
      </View>

      {/* Loading Indicator */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator 
          size="large" 
          color={COLORS.primary}
          style={styles.spinner}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Powered by Expo & React Native
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: SPACING.lg,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  spinner: {
    marginBottom: SPACING.md,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
});

export default LoadingScreen;
