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

*This file has been updated with navigation architecture setup commands. Last updated: Navigation Architecture Phase Complete.*
