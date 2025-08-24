import { API_CONFIG } from "./config/apiConfig";

// Storage Keys
export const STORAGE_KEYS = {
  LANGUAGE: "language",
  FAVORITES: "favorites",
  THEME: "theme",
  AUTH_LOGGED_IN: "auth_logged_in",
  BIOMETRICS_ENABLED: "biometrics_enabled",
};

// API Configuration
export const API_CONFIG_TICKETMASTER = {
  BASE_URL: API_CONFIG.TM_BASE,
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  TICKETMASTER_API_KEY: API_CONFIG.TM_KEY, // Add your API key here
};

// App Configuration
export const APP_CONFIG = {
  NAME: "CityPulse",
  VERSION: "1.0.0",
  SUPPORTED_LANGUAGES: ["en", "ar"],
  DEFAULT_LANGUAGE: "en",
  SUPPORTED_THEMES: ["light", "dark"],
  DEFAULT_THEME: "light",
  MAX_FAVORITES: 100,
  SEARCH_HISTORY_LIMIT: 10,
};

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  PULL_TO_REFRESH_DELAY: 1000,
  ERROR_DISPLAY_DURATION: 5000,
  SUCCESS_DISPLAY_DURATION: 3000,
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  AUTHENTICATION_ERROR: "Authentication failed. Please try again.",
  VALIDATION_ERROR: "Please check your input and try again.",
  PERMISSION_ERROR: "Permission denied. Please check your settings.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
  FIREBASE_ERROR: "Firebase service error. Please try again later.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Successfully logged in!",
  SIGNUP_SUCCESS: "Account created successfully!",
  LOGOUT_SUCCESS: "Successfully logged out!",
  FAVORITE_ADDED: "Event added to favorites!",
  FAVORITE_REMOVED: "Event removed from favorites!",
  PREFERENCES_UPDATED: "Preferences updated successfully!",
};
