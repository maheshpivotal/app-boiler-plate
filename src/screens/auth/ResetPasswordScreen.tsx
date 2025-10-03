import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store';
import { forgotPassword } from '../../store/slices/authSlice';

import { COLORS, SPACING, VALIDATION } from '../../constants';
import { AuthScreenProps } from '../../navigation/navigationUtils';
import { ResetPasswordRequest } from '../../types';

// Validation schema
const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(VALIDATION.email.pattern, VALIDATION.email.message),
});

type ResetPasswordScreenProps = AuthScreenProps<'ResetPassword'>;

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordRequest>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ResetPasswordRequest) => {
    try {
      const result = await dispatch(forgotPassword(data));
      if (forgotPassword.fulfilled.match(result)) {
        Alert.alert(
          'Reset Link Sent',
          'If an account with this email exists, you will receive a password reset link.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ]
        );
      } else {
        Alert.alert('Error', error || 'Failed to send reset email');
      }
    } catch (err) {
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your email address and we'll send you a link to reset your password.
        </Text>
      </View>

      <View style={styles.form}>
        {/* Email Field */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={!!errors.email}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="email" />}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        {/* Reset Button */}
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.resetButton}
          labelStyle={styles.resetButtonText}
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </View>

      {/* Back to Login Link */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Remember your password?{' '}
          <Text style={styles.linkText} onPress={navigateToLogin}>
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
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
  form: {
    marginBottom: SPACING.xl,
  },
  input: {
    marginBottom: SPACING.md,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: -SPACING.sm,
    marginBottom: SPACING.md,
    marginLeft: SPACING.sm,
  },
  resetButton: {
    backgroundColor: COLORS.primary,
    marginTop: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default ResetPasswordScreen;
