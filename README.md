# CityPulseApp

A modern React Native mobile application for discovering and managing local events. Built with Expo and featuring a clean, modular architecture with local storage persistence.

## 🚀 Features

- **Event Discovery**: Search and browse local events using the Ticketmaster Discovery API
- **User Authentication**: Secure login and signup system with local user management
- **Favorites Management**: Save and organize your favorite events with local persistence
- **Biometric Authentication**: Support for Face ID and Touch ID (iOS/Android)
- **Multi-language Support**: English and Arabic interface with RTL layout support
- **Theme System**: Light and dark mode support
- **Offline Capability**: Local data persistence using AsyncStorage
- **Responsive Design**: Optimized for various screen sizes and orientations
- **Error Handling**: Comprehensive error management with user-friendly alerts
- **Firebase Integration**: Ready for cloud backend integration (currently local-only)

## 🛠 Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: React Context API
- **Local Storage**: AsyncStorage for data persistence
- **Authentication**: Local user management with biometric support
- **Internationalization**: i18n-js with expo-localization
- **UI Components**: Expo Vector Icons, LinearGradient
- **Maps**: React Native Maps integration
- **Animations**: React Native Reanimated
- **Error Handling**: Custom error context and alert system

## 📱 Screens

- **Splash Screen**: App initialization and loading
- **Home Screen**: Event search and discovery
- **Event Details**: Comprehensive event information
- **Favorites**: Saved events management
- **Profile**: User settings and preferences
- **Authentication**: Login and signup flows

## 🏗 Project Structure

```
src/
├── bridge/                    # Business logic and core services
│   ├── config/               # Configuration files
│   │   ├── apiConfig.js      # API configuration
│   │   └── firebaseConfig.js # Firebase setup (future)
│   ├── services/             # Service layer
│   │   ├── eventService.js   # Event API integration
│   │   ├── firebase/         # Firebase services
│   │   │   ├── firebase.js   # Firebase core functionality
│   │   │   ├── firebaseErrorHandler.js # Error handling
│   │   │   └── index.js      # Service exports
│   │   ├── utilityService.js # Utility functions
│   │   ├── validationService.js # Input validation
│   │   └── index.js          # Service exports
│   ├── types/                # TypeScript definitions
│   ├── auth.js               # Authentication logic
│   ├── constants.js          # App constants and configuration
│   ├── hooks.js              # Custom React hooks
│   └── storage.js            # Local storage utilities
├── components/                # Reusable UI components
│   ├── common/               # Shared components
│   │   ├── Toast.js          # Toast notification component
│   │   └── VirtualizedList.js # Optimized list component
│   ├── ErrorAlertBar.js      # Error display component
│   ├── FirebaseStatus.js     # Firebase connection status
│   ├── TestErrorAlerts.js    # Error testing component
│   └── ThemeExample.js       # Theme demonstration
├── context/                   # React Context providers
│   ├── AppContext.js         # Main app state
│   ├── ErrorContext.js       # Error handling
│   └── ThemeContext.js       # Theme management
├── navigation/                # Navigation configuration
│   ├── AppNavigator.js       # Main navigation
│   └── MainTabNavigator.js   # Tab navigation
├── screens/                   # App screens
│   ├── auth/                 # Authentication screens
│   │   ├── LoginScreen.js    # User login
│   │   └── SignupScreen.js   # User registration
│   ├── EventDetailsScreen.js # Event information
│   ├── FavoritesScreen.js    # Saved events
│   ├── HomeScreen.js         # Main discovery
│   ├── ProfileScreen.js      # User profile
│   └── SplashScreen.js       # App loading
└── utils/                     # Utility functions
    ├── i18n.js               # Internationalization
    ├── styles.js             # Styling utilities
    ├── theme.js              # Theme configuration
    └── unifiedStyles.js      # Unified styling system
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator (Xcode) or Android Emulator (Android Studio)
- Expo Go app for device testing

### Installation

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd CityPulseApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app

### Available Scripts

- `npm start` - Launch Expo development server
- `npm run ios` - Open iOS simulator
- `npm run android` - Open Android emulator
- `npm run web` - Open web preview
- `npm run build:android` - Build Android APK
- `npm run build:ios` - Build iOS app

## 🔑 API Configuration

### Ticketmaster Discovery API

The app integrates with the Ticketmaster Discovery API v2 for event data:

- **Base URL**: `https://app.ticketmaster.com/discovery/v2`
- **API Key**: Configure in `src/bridge/config/apiConfig.js`
- **Endpoints**:
  - Search Events: `GET /events.json`
  - Event Details: `GET /events/{id}.json`
- **Features**:
  - Intelligent caching (5-minute cache duration)
  - Retry mechanism (3 attempts)
  - Timeout handling (10 seconds)
  - Pagination support

#### Setting up your API key

1. **Environment Variable** (Recommended):

   ```bash
   export EXPO_PUBLIC_TICKETMASTER_API_KEY=your_api_key_here
   ```

2. **Direct Configuration**: Edit `src/bridge/config/apiConfig.js` and replace the demo key

**Note**: A demo API key is included for testing purposes. Replace with your own key for production use.

## 👤 Authentication System

### Local User Management

The app currently uses a local authentication system with the following features:

- **User Registration**: Create new accounts with email and password
- **User Login**: Secure authentication with stored credentials
- **Password Requirements**: Minimum 6 characters
- **Local Storage**: User data persisted in AsyncStorage
- **Data Validation**: Email format and password length validation

### Demo Accounts

For testing purposes, the following accounts are pre-configured:

- **Demo User**: `demo@citypulse.app` / `password123`
- **Test User**: `test@citypulse.app` / `test123`
- **Admin User**: `admin@citypulse.app` / `admin123`

### Biometric Authentication

- **Face ID**: iOS facial recognition support
- **Touch ID**: iOS fingerprint authentication
- **Fingerprint**: Android biometric authentication
- **Secure Storage**: Biometric data handled by device secure enclave
- **Settings**: Toggle biometric login in Profile screen

## 💾 Data Persistence

### Local Storage Strategy

- **AsyncStorage**: Primary local storage solution
- **Data Types**: User preferences, favorites, authentication state, search history
- **Offline Support**: Full functionality without internet connection
- **Cache Management**: Intelligent caching for API responses
- **Data Limits**: Maximum 100 favorites, 10 search history items

### Storage Keys

Key data is organized using constants defined in `src/bridge/constants.js`:

- User authentication state
- User profile information
- Favorite events
- App preferences and settings
- Language and theme preferences
- Biometric authentication settings

## 🌍 Internationalization

### Language Support

- **English**: Primary language
- **Arabic**: Full RTL layout support
- **Dynamic Switching**: Change language at runtime
- **Localized Content**: Event categories, UI text, and messages
- **Device Locale**: Automatic detection of user's preferred language

### Implementation

- **i18n-js**: Core internationalization library
- **expo-localization**: Device locale detection
- **RTL Support**: Automatic layout direction handling
- **Fallback**: Default to English if translation missing

## 🎨 Theming System

### Theme Features

- **Light Mode**: Default bright theme
- **Dark Mode**: Dark theme for low-light environments
- **Dynamic Switching**: Toggle themes at runtime
- **Consistent Design**: Unified color scheme and typography
- **Component Styles**: Theme-aware component styling

### Customization

Themes are defined in `src/utils/theme.js` and can be easily customized:

- Color palettes
- Typography scales
- Spacing systems
- Component-specific styling
- Animation durations

## 🔧 Development

### Code Organization

- **Bridge Pattern**: Business logic separated from UI components
- **Service Layer**: API integration and data management
- **Custom Hooks**: Reusable logic for components
- **Type Safety**: TypeScript definitions for better development experience
- **Error Boundaries**: Comprehensive error handling system

### Best Practices

- **Modular Architecture**: Clean separation of concerns
- **Error Handling**: Comprehensive error management with user feedback
- **Performance**: Optimized rendering and data loading
- **Accessibility**: Screen reader support and navigation
- **Code Reusability**: Shared components and utilities

### Error Handling

- **Error Context**: Centralized error management
- **User Feedback**: Toast notifications and alert bars
- **Graceful Degradation**: Fallback mechanisms for failures
- **Debugging Tools**: Error testing components for development

## 🚧 Future Enhancements

- **Firebase Integration**: Cloud backend and real-time sync (infrastructure ready)
- **Push Notifications**: Event reminders and updates
- **Social Features**: Event sharing and recommendations
- **Advanced Search**: Filters, categories, and preferences
- **Offline Maps**: Cached map data for offline use
- **Analytics**: User behavior tracking and insights

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check the documentation in the `/docs` folder
- Review the code comments for implementation details

---

**Built with ❤️ using React Native and Expo**
