import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, SPACING } from '../../constants';
import { AuthScreenProps } from '../../navigation/navigationUtils';

type VerifyEmailScreenProps = AuthScreenProps<'VerifyEmail'>;

const VerifyEmailScreen: React.FC<VerifyEmailScreenProps> = ({ navigation, route }) => {
  const { email } = route.params;

  const handleResendEmail = () => {
    // TODO: Implement resend email logic
    Alert.alert('Email Sent', 'Verification email has been resent.');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Email Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="mail" size={80} color={COLORS.primary} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Check Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a verification link to{'\n'}
            <Text style={styles.email}>{email}</Text>
          </Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Click the link in the email to verify your account. 
            If you don't see the email, check your spam folder.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={handleResendEmail}
            style={styles.resendButton}
            labelStyle={styles.resendButtonText}
          >
            Resend Email
          </Button>

          <Button
            mode="text"
            onPress={navigateToLogin}
            style={styles.backButton}
            labelStyle={styles.backButtonText}
          >
            Back to Sign In
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  email: {
    fontWeight: '600',
    color: COLORS.primary,
  },
  instructions: {
    marginBottom: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  instructionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  actions: {
    width: '100%',
    alignItems: 'center',
  },
  resendButton: {
    width: '100%',
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    width: '100%',
  },
  backButtonText: {
    fontSize: 14,
    color: COLORS.primary,
  },
});

export default VerifyEmailScreen;
