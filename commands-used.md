# Commands Used for Mobile App Boilerplate Development

## Project Setup Commands

### 1. Create Expo Project
```bash
# Create Expo project with TypeScript template in current directory
npx create-expo-app@latest . --template blank-typescript
```

### 2. Initialize EAS
```bash
# Initialize EAS configuration
eas init
```

Now let's create the eas.json configuration file with staging and production profiles:
Now let's convert the static app.json to a dynamic app.config.js to support environment-specific configurations:

### 3. Create Project Structure
```bash
# Create organized folder structure
mkdir -p src/{components,screens,navigation,services,store,utils,constants,types,hooks,config}
mkdir -p src/screens/{auth,main} src/components/{common,forms} src/services/api
```

### 4. Install Core Dependencies
```bash
# Navigation dependencies
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context

# State management
npm install @reduxjs/toolkit react-redux

# HTTP client and storage
npm install axios @react-native-async-storage/async-storage

# Expo modules
npm install expo-constants expo-device expo-image expo-local-authentication expo-notifications expo-permissions expo-secure-store expo-camera expo-image-picker expo-in-app-purchases

# UI and animations
npm install react-native-paper react-native-reanimated lottie-react-native

# Form handling and validation
npm install react-hook-form yup @hookform/resolvers

# State persistence and additional dependencies
npm install redux-persist

# React Navigation gesture handler
npx expo install react-native-gesture-handler

# Development dependencies
npm install --save-dev @types/react @types/react-native eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks
```

## EAS Build Commands

### Development Builds
```bash
# Build development version with development client
eas build --profile development --platform ios
eas build --profile development --platform android
eas build --profile development --platform all
```

### Staging Builds
```bash
# Build staging version for internal testing
eas build --profile staging --platform ios
eas build --profile staging --platform android
eas build --profile staging --platform all
```

### Production Builds
```bash
# Build production version for app store
eas build --profile production --platform ios
eas build --profile production --platform android
eas build --profile production --platform all
```

## EAS Submit Commands

### Staging Submissions
```bash
# Submit to TestFlight (iOS staging)
eas submit --profile staging --platform ios

# Submit to Google Play Internal Testing (Android staging)
eas submit --profile staging --platform android
```

### Production Submissions
```bash
# Submit to App Store (iOS production)
eas submit --profile production --platform ios

# Submit to Google Play Store (Android production)
eas submit --profile production --platform android
```

## EAS Update Commands

### Deploy Over-the-Air Updates
```bash
# Deploy update to staging
eas update --branch staging --message "Bug fixes for staging"

# Deploy update to production
eas update --branch production --message "Feature update"

# Deploy with specific channel
eas update --channel staging --message "Testing new feature"
eas update --channel production --message "Critical bug fix"
```

## Development Commands

### Start Development Server
```bash
# Start Expo development server
npm start

# Start with specific platform
npm run ios
npm run android
npm run web

# Start with cleared cache
npm run reset  # or npx expo r -c
```

### Test Navigation Architecture
```bash
# Start development server and test the app
npm start

# Navigation flow testing:
# 1. App starts with LoadingScreen
# 2. Shows LoginScreen (not authenticated)
# 3. Login with any email/password (mock authentication)
# 4. Redirects to MainNavigator with tabs
# 5. Test all tabs: Home, Account, Subscriptions
# 6. Logout from Account screen
# 7. Returns to LoginScreen
```

### Code Quality Commands
```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Type checking
npm run type-check
```

## Project Management Commands

### Install Project Dependencies
```bash
# Install all dependencies
npm install

# Install and save as dependency
npm install <package-name>

# Install and save as dev dependency
npm install --save-dev <package-name>

# Update dependencies
npm update
```

### Git Commands
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote origin
git remote add origin <repository-url>

# Push to remote
git push -u origin main
```

## Environment Setup Commands

### Check Versions
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Expo CLI version
npx expo --version

# Check EAS CLI version
eas --version
```

### Clear Cache (if needed)
```bash
# Clear npm cache
npm cache clean --force

# Clear Expo cache
npx expo r -c

# Clear Metro cache
npx expo r --clear
```

## Build Troubleshooting Commands

### Local Development Issues
```bash
# Reset Metro bundler
npx expo r -c

# Reinstall node modules
rm -rf node_modules package-lock.json && npm install

# Check Expo doctor for issues
npx expo doctor

# Fix package version compatibility issues
npx expo install --fix
```

### Package Version Compatibility
```bash
# When you see version warnings like:
# "The following packages should be updated for best compatibility..."

# Fix all package versions to match Expo SDK
npx expo install --fix

# Install specific package versions compatible with your Expo SDK
npx expo install @react-native-async-storage/async-storage
npx expo install lottie-react-native
npx expo install react-native-reanimated
npx expo install react-native-safe-area-context
npx expo install react-native-screens

# Fix specific version incompatibilities that cause Expo Go crashes
# Use this when you see exact version mismatches in Metro bundler output
npm install @react-native-async-storage/async-storage@2.1.2 lottie-react-native@7.2.2 react-native@0.79.5 react-native-reanimated@3.17.4 react-native-safe-area-context@5.4.0 react-native-screens@4.11.1
```

### EAS Build Issues
```bash
# Check build status
eas build:list

# View build logs
eas build:view <build-id>

# Cancel build
eas build:cancel <build-id>
```

## Configuration Commands

### EAS Configuration
```bash
# Configure EAS build
eas build:configure

# Configure EAS submit
eas submit:configure

# Configure EAS update
eas update:configure
```

### Expo Configuration
```bash
# Configure app
npx expo config

# Install Expo modules
npx expo install

# Check configuration
npx expo config --type public
```

## Testing Commands

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### E2E Testing (if using Detox)
```bash
# Build for testing
detox build --configuration ios.sim.debug

# Run E2E tests
detox test --configuration ios.sim.debug
```

## Additional Useful Commands

### Bundle Analysis
```bash
# Analyze bundle size
npx expo export --dump-sourcemap
npx react-native-bundle-visualizer
```

### Performance Monitoring
```bash
# Generate sourcemaps for debugging
npx expo export --dev --public-url https://myapp.com/dist

# Profile bundle
npx expo export --dump-sourcemap --platform ios
```

---

## Navigation Architecture Commands

### Navigation & Redux Setup
```bash
# Navigation and state management (already installed above)
# These commands set up the complete navigation architecture:

# 1. Install navigation dependencies
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context

# 2. Install state management
npm install @reduxjs/toolkit react-redux redux-persist

# 3. Install form handling
npm install react-hook-form yup @hookform/resolvers

# 4. Install required gesture handler
npx expo install react-native-gesture-handler

# 5. Test the navigation flow
npm start
# Then follow the authentication flow in the app
```

## Quick Reference

| Command | Description |
|---------|-------------|
| `npx create-expo-app` | Create new Expo project |
| `eas init` | Initialize EAS |
| `eas build` | Build app with EAS |
| `eas submit` | Submit to app stores |
| `eas update` | Deploy OTA updates |
| `npm start` | Start development server |
| `npx expo doctor` | Check for common issues |
| `npx expo install --fix` | Fix package version compatibility |
| `eas build:list` | View build history |
| `npm run lint` | Check code quality |
| `npm run type-check` | Run TypeScript checks |

---

## Splash Screen Configuration Commands

### Fix Splash Screen During Bundle Loading
```bash
# Install expo-splash-screen package
npm install expo-splash-screen

# Add to app.config.js plugins array
plugins: [
  'expo-splash-screen'
]

# Configure splash screen
splash: {
  image: './assets/splash-icon.png',
  resizeMode: 'cover',        # Use 'cover' not 'contain'
  backgroundColor: '#ffcb05'  # Your brand color
}

# Change package.json entry point (matches successful apps)
"main": "node_modules/expo/AppEntry.js"

# Clear all caches and restart
rm -rf .expo && rm -rf node_modules/.cache && npx expo start --clear
```

### Expo Go Limitations
```bash
# Note: Expo Go may show white background during "building JavaScript bundle"
# This is a development-only limitation of Expo Go app
# Production builds and development builds will respect splash screen settings

# To see proper splash screen in development:
npx expo run:ios      # Creates custom development app
npx expo run:android  # Creates custom development app

# Check configuration is correct:
npx expo config --type public
# Should show your splash backgroundColor and image paths
```

### Asset Size Requirements
```bash
# Icon requirements:
# - icon.png: 1024x1024 pixels minimum
# - splash-icon.png: High resolution (e.g., 1284x2779)
# - adaptive-icon.png: 1024x1024 pixels

# Check current asset sizes:
file assets/icon.png && file assets/splash-icon.png

# Assets must be large enough for Expo to display properly
# Small assets (e.g., 56x55) may be ignored or cached
```

### Extend Loading Screen for Styling
```bash
# To extend loading screen duration for styling work:
# In src/navigation/RootNavigator.tsx, change:
}, 1000); // 1 second - back to normal
# To:
}, 60000); // 60 seconds for styling

# Remember to change back to 1000ms when done styling!
```

---

## Error Tracking and Logging Commands

### Setup Error Tracking
```bash
# Install error tracking dependencies
npm install @sentry/react-native expo-error-recovery

# Add Sentry plugin to app.config.js
plugins: [
  [
    '@sentry/react-native/expo',
    {
      organization: process.env.SENTRY_ORG || 'your-org',
      project: process.env.SENTRY_PROJECT || 'mob-app-boilerplate',
      disabled: isDev, // Only enable in production
    }
  ]
]
```

### Error Tracking Usage
```typescript
// Import the hook in any component
import { useErrorTracking } from '../hooks/useErrorTracking';

const MyComponent = () => {
  const { logError, logWarning, logInfo, addBreadcrumb } = useErrorTracking();

  // Log different types of errors
  logInfo('User performed action', { action: 'button_click' });
  logWarning('Deprecated API used', error, { api: 'old_endpoint' });
  logError('Failed to save data', error, { userId: '123' });
  
  // Add breadcrumbs for user actions
  addBreadcrumb('User navigated to screen', 'navigation', { screen: 'Home' });
  
  // Wrap async operations
  const handleSave = wrapAsync(async () => {
    await saveData();
  }, 'Failed to save user data', { component: 'UserForm' });
};
```

### API Error Tracking
```typescript
// In API service files
import { handleApiError } from '../utils';

try {
  const response = await axios.get('/api/users');
  return response.data;
} catch (error) {
  // This automatically logs the error with enhanced context
  return handleApiError(error, '/api/users', 'GET');
}
```

### User Context Tracking
```typescript
// Set user context for error tracking (in auth slice)
import { errorTracker } from '../services/errorTracking';

// On login
errorTracker.setUserContext(user.id, user.email, {
  subscription: user.subscription,
  role: user.role
});

// On logout
errorTracker.clearUserContext();
```

### View Error Logs
```bash
# Access error logs in development
# Navigate to ErrorLogsScreen component to view:
# - All logged errors with timestamps
# - Filter by error level (info, warning, error, fatal)
# - Search through error messages
# - Export logs for debugging
# - Clear local logs

# Error logs are stored locally and sent to Sentry in production
```

### Sentry Configuration
```bash
# Set environment variables for Sentry
export SENTRY_ORG="your-sentry-organization"
export SENTRY_PROJECT="mob-app-boilerplate"
export SENTRY_DSN="your-sentry-dsn-url"

# In src/services/errorTracking.ts, update getSentryDSN method:
private getSentryDSN(): string | undefined {
  return process.env.SENTRY_DSN || 'your-sentry-dsn-here';
}
```

### Error Boundary Usage
```typescript
// Wrap any component that might crash
import ErrorBoundary from '../components/common/ErrorBoundary';

<ErrorBoundary
  fallback={<CustomErrorUI />}
  onError={(error, errorInfo) => {
    // Custom error handling
    console.log('Component crashed:', error);
  }}
>
  <YourComponent />
</ErrorBoundary>
```

### Performance Monitoring
```typescript
// The error tracking service automatically includes:
# - Session tracking (30-second intervals)
# - Performance monitoring
# - Breadcrumb trails
# - User context
# - Environment-specific filtering
# - Local storage backup (development)
# - Remote reporting (production/staging)
```

---

## EAS Build & Update Workflow

### EAS Build Commands (Creates New Binaries)
```bash
# For testing splash screen - REQUIRES BUILD, not update
eas build --platform ios --profile development
eas build --platform android --profile development

# Staging builds for testing
eas build --platform ios --profile staging
eas build --platform android --profile staging

# Production builds for release
eas build --platform ios --profile production
eas build --platform android --profile production
```

### EAS Update Commands (OTA Updates to Existing Builds)
```bash
# Send OTA update to specific channels (uses channels from build profiles)
eas update --channel development
eas update --channel staging
eas update --channel production

# Auto-detect channel from current branch (if branch names match channels)
eas update --auto

# Update with custom message
eas update --channel development --message "Fixed login bug"
```

### EAS Submit Commands (Submit to App Stores)
```bash
# Submit staging build to TestFlight/Play Console internal track
eas submit --platform ios --profile staging
eas submit --platform android --profile staging

# Submit production build to App Store/Play Store
eas submit --platform ios --profile production
eas submit --platform android --profile production
```

### Testing Splash Screen Workflow
```bash
# STEP 1: Create development build (required for splash screen testing)
eas build --platform ios --profile development

# STEP 2: Install the .ipa/.apk on device/simulator
# Download from EAS build page and install

# STEP 3: Future JavaScript updates can use OTA
eas update --channel development

# NOTE: Splash screen changes require new BUILD, not OTA update
# Native code changes (splash, icons, permissions) need eas build
# JavaScript changes (components, logic) can use eas update
```

### Development Workflow
```bash
# Daily development with Expo Go (white splash limitation)
npx expo start

# Development with custom development client (requires build first)
npx expo start --dev-client

# Weekly/milestone testing with proper splash screen
eas build --platform ios --profile development
# Install build on device, then use OTA updates for JS changes
eas update --channel development

# Pre-release testing
eas build --platform ios --profile staging
eas submit --platform ios --profile staging  # TestFlight

# Production release
eas build --platform ios --profile production
eas submit --platform ios --profile production  # App Store
```

### Bare Workflow Commands (Your Project Type)
```bash
# Your project is BARE WORKFLOW (has ios/ and android/ directories)
# Required fixes for bare workflow:

# 1. Runtime version must be string, not policy object
"runtimeVersion": "1.0.0"  # ✅ Fixed
# NOT: "runtimeVersion": {"policy": "sdkVersion"}  # ❌ Doesn't work in bare

# 2. expo-dev-client required for development builds
npx expo install expo-dev-client  # ✅ Installed

# 3. Correct development commands:
npx expo start                    # Regular Expo Go development
npx expo start --dev-client       # Custom development client
# NOT: npx expo dev  ❌ Invalid command

# 4. Build commands work same as managed workflow:
eas build --platform ios --profile development
eas build --platform android --profile development
```

### What Each Command Does
```bash
# eas build    - Creates new binary (.ipa/.apk) with native changes
# eas update   - Sends JavaScript/React Native code updates to existing builds
# eas submit   - Uploads builds to App Store Connect/Google Play Console

# For splash screen testing: USE eas build (not eas update)
# For code changes after build: USE eas update
```

---

*This file has been updated with EAS build and update workflow. Last updated: EAS Workflow Configuration Complete.*
