# 📱 Mobile App Boilerplate

A production-ready React Native mobile app boilerplate built with Expo and TypeScript, designed for rapid client deployment with Laravel backend integration.

![Expo](https://img.shields.io/badge/Expo-~53.0.22-000020?style=flat&logo=expo)
![React Native](https://img.shields.io/badge/React_Native-0.79.6-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-~5.8.3-3178C6?style=flat&logo=typescript)
![EAS](https://img.shields.io/badge/EAS-Build_&_Deploy-000020?style=flat&logo=expo)

## 🚀 Features

### ✅ **Ready-to-Use Screens**
- 🔐 **Authentication Flow** - Login, Register, Reset Password
- 🏠 **Home Dashboard** - Customizable sections and quick actions
- ⚙️ **Settings & Account** - Profile management, app preferences
- 💳 **Subscription Management** - In-app purchases, billing history
- 📱 **Loading Screen** - Animated splash with client branding

### 🏗️ **Architecture & Tech Stack**
- ⚡ **Expo** - Managed workflow with EAS Build & Deploy
- 🎯 **TypeScript** - Full type safety and better developer experience
- 🧭 **React Navigation** - Stack and tab navigation with authentication guards
- 🗃️ **Redux Toolkit** - Predictable state management
- 🎨 **React Native Paper** - Material Design UI components
- 📡 **Axios** - HTTP client with interceptors and error handling
- 🔒 **Expo SecureStore** - Secure storage for sensitive data
- 🔔 **Push Notifications** - Expo Notifications integration
- 📷 **Camera & Media** - Image picker, camera access
- 💰 **In-App Purchases** - Apple/Google store integration
- 🔐 **Biometric Auth** - Face ID, Touch ID, Fingerprint

### 🌍 **Environment Management**
- 🏗️ **Development** - Local development with hot reload
- 🧪 **Staging** - Internal testing builds with staging API
- 🚀 **Production** - App store releases with production API
- 📱 **EAS Build** - Cloud builds for iOS and Android
- 🔄 **OTA Updates** - Over-the-air updates with EAS Update

### 🔗 **Laravel Integration Ready**
- 🌐 Environment-based API URLs
- 🔑 JWT token authentication
- 🔄 Automatic token refresh
- 📊 Error handling and retry logic
- 🛡️ Request/response interceptors

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18.18.0 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo CLI** - `npm install -g @expo/cli`
- **EAS CLI** - `npm install -g eas-cli`
- **iOS Development**: Xcode (macOS only)
- **Android Development**: Android Studio
- **Expo Account** - [Sign up](https://expo.dev/)

## 🛠️ Quick Start

### 1. Clone & Setup
```bash
git clone <your-repo-url>
cd mob-app-boilerplate
npm install
```

### 2. Configure Environment
```bash
# Copy and configure your environment settings
cp eas.json.example eas.json
# Update API URLs in eas.json for your backend
```

### 3. Start Development
```bash
npm start
# Choose your platform:
# - Press 'i' for iOS simulator
# - Press 'a' for Android emulator
# - Scan QR code with Expo Go app
```

## 📁 Project Structure

```
mob-app-boilerplate/
├── 📁 assets/                  # Images, fonts, icons
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   │   ├── 📁 common/          # Generic components
│   │   └── 📁 forms/           # Form-specific components
│   ├── 📁 screens/             # Screen components
│   │   ├── 📁 auth/            # Authentication screens
│   │   └── 📁 main/            # Main app screens
│   ├── 📁 navigation/          # Navigation configuration
│   ├── 📁 services/            # API services
│   │   └── 📁 api/             # API endpoints and client
│   ├── 📁 store/               # Redux store and slices
│   ├── 📁 hooks/               # Custom React hooks
│   ├── 📁 utils/               # Utility functions
│   ├── 📁 constants/           # App constants and config
│   ├── 📁 types/               # TypeScript type definitions
│   └── 📁 config/              # Environment configuration
├── 📄 app.config.js            # Expo app configuration
├── 📄 eas.json                 # EAS build configuration
├── 📄 package.json             # Dependencies and scripts
└── 📄 tsconfig.json            # TypeScript configuration
```

## 🎯 Available Scripts

### Development
```bash
npm start              # Start Expo development server
npm run ios           # Start on iOS simulator
npm run android       # Start on Android emulator
npm run web           # Start web development
npm run reset         # Clear cache and restart
```

### Code Quality
```bash
npm run lint          # Check for linting issues
npm run lint:fix      # Fix linting issues automatically
npm run format        # Format code with Prettier
npm run type-check    # Run TypeScript type checking
```

### Build & Deploy
```bash
# Development builds
npm run build:dev     # Build development version

# Staging builds
npm run build:staging # Build staging version
npm run submit:staging # Submit to TestFlight/Internal testing

# Production builds
npm run build:production # Build production version
npm run submit:production # Submit to App Store/Play Store

# Over-the-air updates
npm run update:staging    # Deploy OTA update to staging
npm run update:production # Deploy OTA update to production
```

## 🌍 Environment Configuration

The app supports three environments managed through EAS profiles:

### Development
- **API URL**: `http://localhost:8000/api`
- **Bundle ID**: `com.yourcompany.mobapp.development`
- **Features**: Debug mode, local API, development client

### Staging
- **API URL**: `https://staging-api.yourdomain.com/api`
- **Bundle ID**: `com.yourcompany.mobapp.staging`
- **Features**: Internal distribution, staging API, crash reporting

### Production
- **API URL**: `https://api.yourdomain.com/api`
- **Bundle ID**: `com.yourcompany.mobapp`
- **Features**: App store distribution, production API, analytics

### Configuring for Your Project

1. **Update `eas.json`**:
   ```json
   {
     "build": {
       "staging": {
         "env": {
           "API_BASE_URL": "https://your-staging-api.com/api"
         }
       },
       "production": {
         "env": {
           "API_BASE_URL": "https://your-production-api.com/api"
         }
       }
     }
   }
   ```

2. **Update `app.config.js`**:
   ```javascript
   // Update bundle identifiers and app name
   bundleIdentifier: 'com.yourclient.appname'
   ```

## 🔧 Build Commands

### iOS Builds
```bash
# Development
eas build --profile development --platform ios

# Staging
eas build --profile staging --platform ios

# Production
eas build --profile production --platform ios
```

### Android Builds
```bash
# Development
eas build --profile development --platform android

# Staging
eas build --profile staging --platform android

# Production
eas build --profile production --platform android
```

### Both Platforms
```bash
# Build for all platforms
eas build --profile production --platform all
```

## 🔗 Laravel Backend Integration

### Required Laravel API Endpoints

The app expects these endpoints to be available:

#### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/reset-password
POST /api/auth/refresh
POST /api/auth/logout
```

#### User Management
```
GET /api/user/profile
PUT /api/user/update
DELETE /api/user/delete
```

#### Subscriptions
```
GET /api/subscriptions/plans
GET /api/subscriptions/current
POST /api/subscriptions/upgrade
DELETE /api/subscriptions/cancel
```

### Authentication Flow
1. User logs in with email/password
2. Laravel returns JWT access token and refresh token
3. App stores tokens securely using Expo SecureStore
4. All API requests include Authorization header
5. Automatic token refresh when expired

## 🎨 Customization Guide

### For New Clients

1. **Branding**:
   - Replace logos in `/assets/` folder
   - Update colors in `/src/constants/index.ts`
   - Modify app name in `app.config.js`

2. **Bundle Identifiers**:
   ```javascript
   // In app.config.js
   bundleIdentifier: 'com.clientname.appname'
   ```

3. **API Configuration**:
   ```json
   // In eas.json
   "API_BASE_URL": "https://client-api.com/api"
   ```

4. **Features**:
   - Enable/disable features in `/src/constants/index.ts`
   - Add client-specific screens in `/src/screens/`

## 🧪 Testing

### Running Tests
```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Test Structure
- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API service tests
- **E2E Tests**: Full user flow tests (when configured with Detox)

## 🐛 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run reset
```

#### Metro Bundle Errors
```bash
# Reset Metro bundler
npx expo r -c
```

#### EAS Build Issues
```bash
# Check build status
eas build:list

# View specific build logs
eas build:view <build-id>
```

#### iOS Simulator Issues
```bash
# Reset iOS simulator
xcrun simctl erase all
```

### Development Tips

1. **Use Development Client** for better debugging
2. **Check EAS Build logs** for deployment issues
3. **Test on real devices** before production builds
4. **Use TypeScript strictly** for better code quality
5. **Follow React Native best practices** for performance

## 📚 Additional Resources

- **Expo Documentation**: [docs.expo.dev](https://docs.expo.dev/)
- **EAS Build & Submit**: [docs.expo.dev/build/introduction/](https://docs.expo.dev/build/introduction/)
- **React Navigation**: [reactnavigation.org](https://reactnavigation.org/)
- **Redux Toolkit**: [redux-toolkit.js.org](https://redux-toolkit.js.org/)
- **React Native Paper**: [reactnativepaper.com](https://reactnativepaper.com/)

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update API URLs in `eas.json`
- [ ] Configure proper bundle identifiers
- [ ] Test on real devices (iOS and Android)
- [ ] Verify all features work in production environment
- [ ] Set up app store accounts (Apple Developer, Google Play Console)
- [ ] Configure code signing certificates
- [ ] Test in-app purchases in sandbox mode
- [ ] Verify push notifications work
- [ ] Run final builds and submit for review

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in this repository
- Check the troubleshooting section above
- Review Expo documentation
- Contact the development team

---

**Built with ❤️ using Expo and React Native**

*This boilerplate is designed to accelerate mobile app development while maintaining high code quality and best practices.*
