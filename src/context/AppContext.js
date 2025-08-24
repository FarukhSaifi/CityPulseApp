import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { I18nManager } from "react-native";
import { STORAGE_KEYS } from "../bridge/constants";
import {
  useAuth,
  useFavorites,
  usePersistedState,
  useUserPreferences,
} from "../bridge/hooks";
import i18n from "../utils/i18n";
import { ThemeProvider } from "./ThemeContext";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const { user } = useAuth();
  const {
    language,
    theme,
    biometricEnabled,
    updateLanguage,
    updateTheme,
    updateBiometric,
    loadFromFirebase,
  } = useUserPreferences();

  const [loginState, setLoginState] = usePersistedState(
    STORAGE_KEYS.AUTH_LOGGED_IN,
    false
  );
  const [isRTL, setIsRTL] = useState(false);
  const { favorites, toggleFavorite, isFavorite, clearFavorites } =
    useFavorites();

  // Ensure app is allowed to mirror layouts when RTL is active
  useEffect(() => {
    try {
      I18nManager.allowRTL(true);
      I18nManager.swapLeftAndRightInRTL(true);
    } catch {}
  }, []);

  useEffect(() => {
    i18n.locale = language;
    setIsRTL(language === "ar");
  }, [language]);

  // Load preferences from Firebase when user changes
  useEffect(() => {
    if (user?.id) {
      loadFromFirebase();
    }
  }, [user?.id, loadFromFirebase]);

  const value = useMemo(
    () => ({
      language,
      changeLanguage: updateLanguage,
      favorites,
      toggleFavorite,
      isFavorite,
      clearFavorites,
      theme,
      changeTheme: updateTheme,
      isRTL,
      loginState,
      setLoginState,
      biometricEnabled,
      setBiometric: updateBiometric,
    }),
    [
      language,
      favorites,
      isFavorite,
      theme,
      isRTL,
      loginState,
      biometricEnabled,
      updateLanguage,
      updateTheme,
      updateBiometric,
    ]
  );

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </ThemeProvider>
  );
};
