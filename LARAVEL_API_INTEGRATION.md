# Laravel API Integration - Testing Guide

## Overview
The React Native app has been successfully integrated with your Laravel backend API running at `http://laravel-template.pub.localhost/`. 

## What's Been Implemented

### ✅ API Configuration
- Updated environment configuration to use your testing URL
- Created robust API client with interceptors for token management
- Configured proper error handling for Laravel responses

### ✅ Authentication API Endpoints
- **Register**: `POST /api/register`
- **Login**: `POST /api/login` 
- **Forgot Password**: `POST /api/forgot-password`
- **Reset Password**: `POST /api/reset-password`

### ✅ Redux Integration
- All authentication screens now use real API calls instead of mock data
- Proper loading states and error handling
- Automatic token storage and user state management

### ✅ UI Updates
- Login, Register, and Reset Password screens show loading states
- Error messages display Laravel API validation errors
- Automatic navigation after successful authentication

## API Request/Response Format

### Register Request
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "YourSecurePassword123!",
  "password_confirmation": "YourSecurePassword123!"
}
```

### Login Request
```json
{
  "email": "john@example.com",
  "password": "YourSecurePassword123!"
}
```

### Expected Laravel Response
```json
{
  "data": {
    "user": {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here" // Optional
  },
  "message": "Login successful"
}
```

## Testing Steps

### 1. Start your Laravel API
Ensure your Laravel backend is running at `http://laravel-template.pub.localhost/`

### 2. Start the React Native App
```bash
npm start
# or
expo start
```

### 3. Test Authentication Flow
1. **Registration**: Try creating a new account
2. **Login**: Test login with existing credentials  
3. **Forgot Password**: Test password reset email flow
4. **Navigation**: Verify automatic navigation after successful auth

### 4. Monitor API Calls
Check your Laravel logs to see the incoming API requests and verify they match the expected format.

## Next Steps for Production

1. **Token Refresh**: Implement refresh token logic in Laravel API
2. **Protected Routes**: Add authenticated endpoints for user profile, etc.
3. **Error Handling**: Customize error messages for better UX
4. **Loading States**: Fine-tune loading animations
5. **Validation**: Add client-side validation to match Laravel rules

## Troubleshooting

### Common Issues
- **Network Error**: Ensure Laravel API is accessible at the configured URL
- **CORS Issues**: Make sure Laravel allows requests from your development environment
- **Token Format**: Verify Laravel returns tokens in the expected format
- **Validation Errors**: Check that Laravel validation error format matches expectations

### Debug Tips
- Check Metro logs for API request/response details
- Use network inspector to monitor HTTP traffic
- Verify Laravel API responses match expected format
- Test API endpoints directly with Postman/Insomnia first

## Files Modified
- `src/config/environment.ts` - API URL configuration
- `src/services/api/` - New API service classes
- `src/store/slices/authSlice.ts` - Real API integration
- `src/screens/auth/*.tsx` - Connected to Redux actions
- `app.config.js` - Updated default API URL
