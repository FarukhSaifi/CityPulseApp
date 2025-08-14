import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  const [isRTL, setIsRTL] = useState(false);
  const { favorites, toggleFavorite, isFavorite, clearFavorites } =
    useFavorites();

  useEffect(() => {
    i18n.locale = language;
    setIsRTL(language === "ar");
  }, [language]);

  const changeLanguage = async (newLanguage) => {
    await setLanguage(newLanguage);
  };

  const changeTheme = async (newTheme) => {
    await setTheme(newTheme);
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
    }),
    [language, favorites, isFavorite, theme, isRTL]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
