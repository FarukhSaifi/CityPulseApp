import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { I18nManager } from "react-native";
import { STORAGE_KEYS } from "../bridge/constants";
import { useFavorites, usePersistedState } from "../bridge/hooks";
import i18n from "../utils/i18n";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = usePersistedState(
    STORAGE_KEYS.LANGUAGE,
    "en"
  );
  const [theme, setTheme] = usePersistedState(STORAGE_KEYS.THEME, "light");
  const [loginState, setLoginState] = usePersistedState(
    STORAGE_KEYS.AUTH_LOGGED_IN,
    false
  );
  const [biometricEnabled, setBiometricEnabled] = usePersistedState(
    STORAGE_KEYS.BIOMETRICS_ENABLED,
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

  const changeLanguage = async (newLanguage) => {
    await setLanguage(newLanguage);
    // No full reload; direction is handled by context-driven isRTL
  };

  const changeTheme = async (newTheme) => {
    await setTheme(newTheme);
  };

  const setBiometric = async (value) => {
    setBiometricEnabled(!!value);
  };

  const value = useMemo(
    () => ({
      language,
      changeLanguage,
      favorites,
      toggleFavorite,
      isFavorite,
      clearFavorites,
      theme,
      changeTheme,
      isRTL,
      loginState,
      setLoginState,
      biometricEnabled,
      setBiometric,
    }),
    [
      language,
      favorites,
      isFavorite,
      theme,
      isRTL,
      loginState,
      biometricEnabled,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
