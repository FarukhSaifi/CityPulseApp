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

# City Pulse - Local Events Explorer

A React Native app for discovering and exploring local events in your area. Built with Expo, React Navigation, and styled with Tailwind CSS (NativeWind).

## Features

- 🔍 **Event Search**: Search for events by keyword and city
- 📱 **Event Details**: View comprehensive event information
- ❤️ **Favorites**: Save and manage your favorite events
- 🌐 **Internationalization**: Support for English and Arabic (RTL layout)
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📱 **Cross-platform**: Works on both iOS and Android

## Screens

1. **Splash Screen**: App introduction with loading animation
2. **Home Screen**: Search for events and view results
3. **Event Details**: Full event information and actions
4. **Favorites**: Manage your saved events
5. **Profile**: User settings and app preferences

## Tech Stack

- **React Native** with Expo
- **React Navigation** for navigation
- **NativeWind** (Tailwind CSS for React Native)
- **AsyncStorage** for local data persistence
- **i18n-js** for internationalization
- **Expo Vector Icons** for icons

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
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
   - Scan QR code with Expo Go app on your device

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # App screens
│   ├── SplashScreen.js
│   ├── HomeScreen.js
│   ├── EventDetailsScreen.js
│   ├── FavoritesScreen.js
│   └── ProfileScreen.js
├── navigation/         # Navigation configuration
│   ├── AppNavigator.js
│   └── MainTabNavigator.js
├── context/            # React Context for state management
│   └── AppContext.js
├── utils/              # Utility functions
│   ├── api.js          # Mock API service
│   └── i18n.js        # Internationalization
└── assets/             # Images and other assets
```

## Configuration

### Tailwind CSS

The app uses NativeWind for styling. The configuration is in `tailwind.config.js`.

### Internationalization

- English and Arabic support
- RTL layout for Arabic
- Language switching in Profile screen

### API Integration

Configured with Ticketmaster out of the box. See API Configuration above for keys.

## Features in Detail

### Event Search

- Search by keyword (event name, description, category)
- Filter by city
- Real-time results with loading states

### Event Management

- Add/remove events from favorites
- Persistent storage using AsyncStorage
- Favorite count tracking

### User Experience

- Smooth navigation transitions
- Loading states and error handling
- Responsive design for different screen sizes
- Pull-to-refresh functionality

## Customization

### Colors

Update the color scheme in `tailwind.config.js`:

```javascript
colors: {
  primary: '#3B82F6',    // Main brand color
  secondary: '#10B981',  // Secondary actions
  accent: '#F59E0B',     // Accent elements
  // ... more colors
}
```

### Icons

The app uses Expo Vector Icons. Change icons in the components by updating the `name` prop.

### Languages

Add new languages in `src/utils/i18n.js`:

```javascript
const i18n = new I18n({
  en: {
    /* English translations */
  },
  ar: {
    /* Arabic translations */
  },
  fr: {
    /* French translations */
  }, // Add new language
});
```

## Building for Production

1. **Configure app.json** with your app details
2. **Build the app**:

   ```bash
   expo build:android  # For Android
   expo build:ios      # For iOS
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:

- Create an issue in the repository
- Check the Expo documentation
- Review React Native best practices

---

**Note**: This app currently uses mock data for demonstration purposes. In production, integrate with real event APIs like Ticketmaster Discovery API or similar services.
