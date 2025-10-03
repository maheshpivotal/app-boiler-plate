import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, TextInput, Checkbox } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store';
import { register } from '../../store/slices/authSlice';

import { COLORS, SPACING, VALIDATION } from '../../constants';
import { AuthScreenProps } from '../../navigation/navigationUtils';
import { RegisterCredentials } from '../../types';

// Validation schema
const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .matches(VALIDATION.name.pattern, VALIDATION.name.message),
  lastName: yup
    .string()
    .required('Last name is required')
    .matches(VALIDATION.name.pattern, VALIDATION.name.message),
  email: yup
    .string()
    .required('Email is required')
    .matches(VALIDATION.email.pattern, VALIDATION.email.message),
  password: yup
    .string()
    .required('Password is required')
    .matches(VALIDATION.password.pattern, VALIDATION.password.message),
  passwordConfirmation: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  acceptTerms: yup
    .boolean()
    .required('You must accept the terms and conditions')
    .oneOf([true], 'You must accept the terms and conditions'),
});

type RegisterScreenProps = AuthScreenProps<'Register'>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterCredentials) => {
    try {
      const result = await dispatch(register(data));
      
      if (register.fulfilled.match(result)) {
        // Registration successful, user will be automatically logged in
        Alert.alert('Success', 'Account created successfully!');
      } else {
        Alert.alert('Registration Failed', error || 'Please check your information');
      }
    } catch (err) {
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  const onError = (errors: any) => {
    Alert.alert('Validation Error', 'Please check all required fields');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us today</Text>
      </View>

      <View style={styles.form}>
        {/* First Name */}
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="First Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="words"
              error={!!errors.firstName}
              style={styles.input}
              mode="outlined"
            />
          )}
        />
        {errors.firstName && (
          <Text style={styles.errorText}>{errors.firstName.message}</Text>
        )}

        {/* Last Name */}
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Last Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="words"
              error={!!errors.lastName}
              style={styles.input}
              mode="outlined"
            />
          )}
        />
        {errors.lastName && (
          <Text style={styles.errorText}>{errors.lastName.message}</Text>
        )}

        {/* Email */}
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
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={!showPassword}
              error={!!errors.password}
              style={styles.input}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        {/* Confirm Password */}
        <Controller
          control={control}
          name="passwordConfirmation"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Confirm Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={!showConfirmPassword}
              error={!!errors.passwordConfirmation}
              style={styles.input}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
          )}
        />
        {errors.passwordConfirmation && (
          <Text style={styles.errorText}>{errors.passwordConfirmation.message}</Text>
        )}

        {/* Accept Terms Checkbox */}
        <Controller
          control={control}
          name="acceptTerms"
          render={({ field: { onChange, value } }) => (
            <View style={styles.checkboxContainer}>
              <View style={styles.checkboxWrapper}>
                <Checkbox
                  status={value ? 'checked' : 'unchecked'}
                  onPress={() => onChange(!value)}
                  color={COLORS.primary}
                />
              </View>
              <Text style={styles.checkboxText}>
                I accept the{' '}
                <Text style={styles.linkText}>Terms and Conditions</Text>
                {' '}and{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </View>
          )}
        />
        {errors.acceptTerms && (
          <Text style={[styles.errorText, { marginTop: SPACING.sm }]}>{errors.acceptTerms.message}</Text>
        )}

        {/* Register Button */}
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit, onError)}
          style={styles.registerButton}
          labelStyle={styles.registerButtonText}
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </View>

      {/* Login Link */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.linkText} onPress={navigateToLogin}>
            Sign In
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flexGrow: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  checkboxWrapper: {
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 4,
    backgroundColor: COLORS.background,
    marginRight: SPACING.sm,
  },
  checkboxText: {
    flex: 1,
    marginLeft: SPACING.xs,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    marginTop: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  registerButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center'
  },
  footerText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});

export default RegisterScreen;
