import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { COLORS, SPACING } from '../constants';
import { checkAuthStatus } from '../store/slices/authSlice';
import { AppDispatch } from '../store';

const LoadingScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log('LoadingScreen: Component mounted with yellow background');
    // Check auth status in background while loading screen is shown
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* App Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>PVTL MobApp</Text>
        <Text style={styles.tagline}>Mobile App Boilerplate</Text>
      </View>

      {/* Loading Indicator */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator 
          size="large" 
          color={COLORS.white}
          style={styles.spinner}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          App by Pivotal Agency
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
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
    width: 75,
    height: 75,
    marginBottom: SPACING.lg,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.white,
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
    color: COLORS.white,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.white,
  },
});

export default LoadingScreen;
