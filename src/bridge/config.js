// Centralized API configuration
// Note: Do not commit real secrets for production apps. Prefer environment vars.

const DEFAULTS = {
  TICKETMASTER_API_BASE: "https://app.ticketmaster.com/discovery/v2",
  // Fallback to the provided demo key if no env is set. Replace for production.
  TICKETMASTER_API_KEY:
    process.env.EXPO_PUBLIC_TICKETMASTER_API_KEY ||
    process.env.TICKETMASTER_API_KEY ||
    "wkYdkQM7vfPL9ygYyq5BgxaaRkIi2nuA",
};

export const CONFIG = {
  TM_BASE: DEFAULTS.TICKETMASTER_API_BASE,
  TM_KEY: DEFAULTS.TICKETMASTER_API_KEY,
  FIREBASE: {
    apiKey: "AIzaSyCqVKY9jDRxM3qkLMgcHAqmVnNxNcadcpM",
    authDomain: "reactdash-38979.firebaseapp.com",
    databaseURL: "https://reactdash-38979.firebaseio.com",
    projectId: "reactdash-38979",
    storageBucket: "reactdash-38979.firebasestorage.app",
    messagingSenderId: "503588692738",
    appId: "1:503588692738:web:b1f4e65b7bee52fbc5d81b",
    measurementId: "G-1D80WNEB9C",
  },
};
