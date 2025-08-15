## City Pulse – Local Events Explorer

JavaScript (Expo) app to discover local events with search, favorites, multilingual UI (EN/AR), and clean modular architecture.

### Features

- Search events by keyword and city (Ticketmaster Discovery API)
- Event detail screen
- Favorites with local persistence
- English/Arabic UI with RTL layout effects
- Navigation: Splash → Home → Event Details → Profile

### Tech Stack

- Expo (React Native)
- React Navigation (Stack + Bottom Tabs)
- AsyncStorage for local persistence
- i18n-js + expo-localization
- Expo Vector Icons, LinearGradient

### Setup

1. Prereqs: Node 18+, Expo CLI, Android Studio or Xcode for device/simulator
2. Install deps:

   ```bash
   npm install
   ```

3. Start:

   ```bash
   npm start
   ```

4. Press `i` (iOS) or `a` (Android) in Expo CLI, or scan QR with Expo Go.

### Project Structure

```
src/
  bridge/               # Common bridging layer for business logic
    constants.js        # Shared constants (e.g., storage keys)
    storage.js          # AsyncStorage wrapper
    hooks.js            # Reusable hooks (usePersistedState, useFavorites)
  components/
    Button.js
  context/
    AppContext.js       # Global state using bridging layer
  navigation/
    AppNavigator.js
    MainTabNavigator.js
  screens/
    SplashScreen.js
    HomeScreen.js
    EventDetailsScreen.js
    FavoritesScreen.js
    ProfileScreen.js
  utils/
    api.js              # Ticketmaster Discovery API integration
    i18n.js             # Translations and locale init
    styles.js           # Tailwind-like utility styles
App.js
```

### Local Persistence

- Implemented via AsyncStorage in `src/bridge/storage.js`.
- Favorites, language, and theme saved using keys in `src/bridge/constants.js`.
- `usePersistedState` and `useFavorites` in `src/bridge/hooks.js` centralize logic.

### API Configuration (Ticketmaster)

- Using the official Discovery API v2 docs: [Discovery API v2](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-events-v2).
- Configure API key via environment var (recommended):
  - `export EXPO_PUBLIC_TICKETMASTER_API_KEY=YOUR_KEY`
  - Or update `src/bridge/config.js` (demo key `wkYdkQM7vfPL9ygYyq5BgxaaRkIi2nuA` is included for testing).
- Endpoints used:
  - Search: `GET /discovery/v2/events.json?keyword=...&city=...&apikey=...`
  - Event Details: `GET /discovery/v2/events/{id}.json?apikey=...`
  - Example: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=wkYdkQM7vfPL9ygYyq5BgxaaRkIi2nuA`

### Assumptions

- Using mock data for initial build; replace with real API when ready.
- RTL layout impact handled at component level via textAlign and container direction if needed.
- Tailwind-like styling is provided via `styles.js` utilities instead of NativeWind to avoid CSS bundling issues.

### Scripts

- `npm start` – launch Expo dev server
- `npm run ios` – open iOS simulator
- `npm run android` – open Android emulator
- `npm run web` – open web preview

### Notes

- If you change storage keys or structure, consider adding a migration in `storage.js`.

# City Pulse App

A local events discovery app that helps you find exciting events in your area.

## Features

- **Event Discovery**: Browse and search local events
- **Favorites**: Save and manage your favorite events
- **User Authentication**: Secure login and signup system
- **Biometric Login**: Support for fingerprint and face recognition
- **Multi-language**: English and Arabic support
- **Theme Support**: Light and dark mode
- **Local Storage**: Data persistence using AsyncStorage

## Authentication System

The app includes a robust authentication system with both Firebase and mock authentication support:

### Mock Authentication (Default)

- **Demo Account**: `demo@citypulse.app` / `password123`
- **Test Account**: `test@citypulse.app` / `test123`
- **Admin Account**: `admin@citypulse.app` / `admin123`

### Features

- User registration with email validation
- Secure password requirements (minimum 6 characters)
- Local data persistence
- **Face ID & Touch ID Support**: Secure biometric authentication
- Automatic fallback to mock auth if Firebase is not configured

## Setup Instructions

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run the App**

   ```bash
   npx expo start
   ```

3. **Authentication Testing**
   - Use any of the mock accounts above to login
   - Create new accounts through the signup page
   - **Face ID Setup**:
     - Go to Profile → Biometric Login → Toggle ON
     - Verify your identity when prompted
     - Face ID will now auto-prompt on app launch

## Project Structure

```
src/
├── bridge/           # Business logic and hooks
│   ├── hooks.js     # Custom hooks including useAuth
│   ├── storage.js   # Local storage utilities
│   └── constants.js # App constants
├── components/       # Reusable UI components
├── context/         # React context providers
├── navigation/      # Navigation configuration
├── screens/         # App screens
│   └── auth/       # Authentication screens
└── utils/           # Utility functions and styles
```

## Assumptions Made

1. **Local Data Storage**: User data is stored locally using AsyncStorage for privacy and offline functionality
2. **Mock Authentication**: Provides a working authentication system without requiring external services
3. **Fallback Strategy**: Firebase authentication is attempted first, with automatic fallback to mock auth
4. **Biometric Support**: Optional biometric authentication for enhanced security
5. **Responsive Design**: UI adapts to different screen sizes and orientations

## Dependencies

- React Native & Expo
- AsyncStorage for local data persistence
- Expo Local Authentication for biometric features
- React Navigation for routing
- Expo Linear Gradient for UI enhancements

## Face ID & Touch ID Configuration

### iOS Setup

1. **Enable in App**: Go to Profile → Biometric Login → Toggle ON
2. **Verify Identity**: Complete Face ID/Touch ID verification when prompted
3. **Auto-Login**: Face ID will automatically prompt on app launch when enabled

### Android Setup

1. **Enable in App**: Go to Profile → Biometric Login → Toggle ON
2. **Verify Identity**: Complete fingerprint verification when prompted
3. **Auto-Login**: Fingerprint will automatically prompt on app launch when enabled

### Security Features

- Biometric data is handled by the device's secure enclave
- No biometric data is stored in the app
- Fallback to passcode/pattern is available
- Settings can be changed in Profile screen

## Security Notes

- Passwords are stored locally (mock system only)
- Biometric data is handled by the device's secure enclave
- No sensitive data is transmitted to external servers in mock mode
- Firebase integration provides enterprise-grade security when configured
