import { useCallback, useEffect, useState } from "react";
import { useError } from "../context/ErrorContext";
import { STORAGE_KEYS } from "./constants";
import {
  auth,
  firebaseAuth,
  firestore,
  setErrorHandler,
} from "./services/firebase";
import { storage } from "./storage";

export const usePersistedState = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const stored = await storage.get(key, initialValue);
      if (mounted && stored !== null && stored !== undefined) setValue(stored);
    })();
    return () => {
      mounted = false;
    };
  }, [key]);

  const update = useCallback(
    async (next) => {
      setValue(next);
      await storage.set(key, next);
    },
    [key]
  );

  return [value, update];
};

export const useFavorites = () => {
  const [favorites, setFavorites] = usePersistedState(
    STORAGE_KEYS.FAVORITES,
    []
  );
  const { user } = useAuth();

  const isFavorite = useCallback(
    (id) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (event) => {
      try {
        if (user?.id) {
          // Use Firebase for all users
          if (isFavorite(event.id)) {
            // Remove from favorites
            const result = await firestore.favorites.remove(user.id, event.id);
            if (result.success) {
              await setFavorites(result.data);
            } else {
              console.error(
                "Failed to remove from Firebase favorites:",
                result.error
              );
              // Fallback to local storage
              const next = favorites.filter((f) => f.id !== event.id);
              await setFavorites(next);
            }
          } else {
            // Add to favorites
            const result = await firestore.favorites.add(user.id, event);
            if (result.success) {
              await setFavorites(result.data);
            } else {
              console.error(
                "Failed to add to Firebase favorites:",
                result.error
              );
              // Fallback to local storage
              const next = [...favorites, event];
              await setFavorites(next);
            }
          }
        } else {
          // No user authenticated - use local storage only
          const next = isFavorite(event.id)
            ? favorites.filter((f) => f.id !== event.id)
            : [...favorites, event];
          await setFavorites(next);
        }
      } catch (error) {
        console.error("Toggle favorite error:", error);
        // Fallback to local storage
        const next = isFavorite(event.id)
          ? favorites.filter((f) => f.id !== event.id)
          : [...favorites, event];
        await setFavorites(next);
      }
    },
    [favorites, isFavorite, setFavorites, user]
  );

  const clearFavorites = useCallback(async () => {
    try {
      if (user?.id) {
        // Use Firebase for all users
        const result = await firestore.favorites.clear(user.id);
        if (result.success) {
          await setFavorites([]);
        } else {
          console.error("Failed to clear Firebase favorites:", result.error);
          // Fallback to local storage
          await setFavorites([]);
        }
      } else {
        // No user authenticated - use local storage only
        await setFavorites([]);
      }
    } catch (error) {
      console.error("Clear favorites error:", error);
      // Fallback to local storage
      await setFavorites([]);
    }
  }, [setFavorites, user]);

  // Load favorites from Firebase on mount for authenticated users
  useEffect(() => {
    const loadFirebaseFavorites = async () => {
      if (user?.id) {
        try {
          const result = await firestore.favorites.get(user.id);
          if (result.success) {
            await setFavorites(result.data);
          }
        } catch (error) {
          console.error("Failed to load Firebase favorites:", error);
        }
      }
    };

    loadFirebaseFavorites();
  }, [user, setFavorites]);

  return { favorites, toggleFavorite, isFavorite, clearFavorites };
};

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = usePersistedState(
    STORAGE_KEYS.AUTH_LOGGED_IN,
    false
  );
  const [user, setUser] = usePersistedState("auth_user", null);

  // Monitor Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Firebase user is authenticated
        console.log("🔥 Firebase user authenticated:", firebaseUser.uid);

        // If we have a local user but it's different from Firebase user, update it
        if (
          !user ||
          user.id !== firebaseUser.uid ||
          user.provider !== "firebase"
        ) {
          try {
            // Get user data from Firestore
            const userDataResult = await firestore.users.get(firebaseUser.uid);

            if (userDataResult.success) {
              const userData = {
                id: firebaseUser.uid,
                email: firebaseUser.email,
                name:
                  userDataResult.data.displayName ||
                  firebaseUser.displayName ||
                  firebaseUser.email?.split("@")[0] ||
                  "User",
                createdAt:
                  userDataResult.data.createdAt || new Date().toISOString(),
                provider: "firebase",
                preferences: userDataResult.data.preferences || {
                  language: "en",
                  theme: "light",
                  biometricEnabled: false,
                },
              };

              await setUser(userData);
              await setIsLoggedIn(true);
              console.log("✅ Firebase user data synced to local storage");
            } else {
              // Fallback to basic user data if Firestore fails
              const userData = {
                id: firebaseUser.uid,
                email: firebaseUser.email,
                name:
                  firebaseUser.displayName ||
                  firebaseUser.email?.split("@")[0] ||
                  "User",
                createdAt: new Date().toISOString(),
                provider: "firebase",
                preferences: {
                  language: "en",
                  theme: "light",
                  biometricEnabled: false,
                },
              };

              await setUser(userData);
              await setIsLoggedIn(true);
              console.log("✅ Firebase user data synced (fallback)");
            }
          } catch (error) {
            console.error("Failed to sync Firebase user data:", error);
            // Still set basic user data
            const userData = {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name:
                firebaseUser.displayName ||
                firebaseUser.email?.split("@")[0] ||
                "User",
              createdAt: new Date().toISOString(),
              provider: "firebase",
              preferences: {
                language: "en",
                theme: "light",
                biometricEnabled: false,
              },
            };
            await setUser(userData);
            await setIsLoggedIn(true);
          }
        }
      } else {
        // Firebase user is not authenticated
        console.log("🔥 Firebase user not authenticated");

        // Clear local user data since we only support Firebase users
        if (user) {
          console.log(
            "🧹 Clearing local user data - no Firebase authentication"
          );
          await setUser(null);
          await setIsLoggedIn(false);
        }
      }
    });

    return unsubscribe;
  }, [user, setUser, setIsLoggedIn]);

  const login = useCallback(
    async (email, password) => {
      try {
        // Use Firebase authentication only
        const result = await firebaseAuth.signIn(email, password);

        if (result.success) {
          const firebaseUser = result.user;

          // Get user data from Firestore
          const userDataResult = await firestore.users.get(firebaseUser.uid);

          if (userDataResult.success) {
            const userData = {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name:
                userDataResult.data.displayName ||
                firebaseUser.email?.split("@")[0] ||
                "User",
              createdAt:
                userDataResult.data.createdAt || new Date().toISOString(),
              provider: "firebase",
              preferences: userDataResult.data.preferences || {
                language: "en",
                theme: "light",
                biometricEnabled: false,
              },
            };

            await setUser(userData);
            await setIsLoggedIn(true);

            // Sync preferences to local storage
            if (userData.preferences) {
              await storage.set(
                STORAGE_KEYS.LANGUAGE,
                userData.preferences.language || "en"
              );
              await storage.set(
                STORAGE_KEYS.THEME,
                userData.preferences.theme || "light"
              );
              await storage.set(
                STORAGE_KEYS.BIOMETRICS_ENABLED,
                userData.preferences.biometricEnabled || false
              );
            }

            return { success: true, user: userData };
          } else {
            // Fallback to basic user data if Firestore fails
            const userData = {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name:
                firebaseUser.displayName ||
                firebaseUser.email?.split("@")[0] ||
                "User",
              createdAt: new Date().toISOString(),
              provider: "firebase",
              preferences: {
                language: "en",
                theme: "light",
                biometricEnabled: false,
              },
            };

            await setUser(userData);
            await setIsLoggedIn(true);
            return { success: true, user: userData };
          }
        } else {
          return {
            success: false,
            error: result.error || "Invalid email or password",
          };
        }
      } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: error.message || "Login failed" };
      }
    },
    [setUser, setIsLoggedIn]
  );

  const signup = useCallback(
    async (email, password, displayName) => {
      try {
        // Use Firebase signup only
        const result = await firebaseAuth.signUp(email, password, displayName);

        if (result.success) {
          const firebaseUser = result.user;

          // Get user data from Firestore
          const userDataResult = await firestore.users.get(firebaseUser.uid);

          if (userDataResult.success) {
            const userData = {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name:
                userDataResult.data.displayName ||
                firebaseUser.email?.split("@")[0] ||
                "User",
              createdAt:
                userDataResult.data.createdAt || new Date().toISOString(),
              provider: "firebase",
              preferences: userDataResult.data.preferences || {
                language: "en",
                theme: "light",
                biometricEnabled: false,
              },
            };

            await setUser(userData);
            await setIsLoggedIn(true);

            // Sync preferences to local storage
            if (userData.preferences) {
              await storage.set(
                STORAGE_KEYS.LANGUAGE,
                userData.preferences.language || "en"
              );
              await storage.set(
                STORAGE_KEYS.THEME,
                userData.preferences.theme || "light"
              );
              await storage.set(
                STORAGE_KEYS.BIOMETRICS_ENABLED,
                userData.preferences.biometricEnabled || false
              );
            }

            return { success: true, user: userData };
          } else {
            return { success: false, error: "Failed to create user profile" };
          }
        } else {
          return { success: false, error: result.error || "Signup failed" };
        }
      } catch (error) {
        console.error("Signup error:", error);
        return { success: false, error: error.message || "Signup failed" };
      }
    },
    [setUser, setIsLoggedIn]
  );

  const logout = useCallback(async () => {
    try {
      // Try Firebase logout first
      if (user?.provider === "firebase") {
        await firebaseAuth.signOut();
      }

      // Clear local state
      await setUser(null);
      await setIsLoggedIn(false);

      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if Firebase logout fails
      await setUser(null);
      await setIsLoggedIn(false);
      return { success: false, error: error.message || "Logout failed" };
    }
  }, [setUser, setIsLoggedIn, user]);

  const getCurrentUser = useCallback(() => user, [user]);

  // Function to manually check and clean up stale Firebase user data
  const cleanupStaleData = useCallback(async () => {
    try {
      const currentFirebaseUser = auth.currentUser;

      if (!currentFirebaseUser && user) {
        console.log("🧹 Manual cleanup: Removing stale user data");
        await setUser(null);
        await setIsLoggedIn(false);
        return { success: true, message: "Stale data cleaned up" };
      }

      return { success: true, message: "No cleanup needed" };
    } catch (error) {
      console.error("Cleanup error:", error);
      return { success: false, error: error.message };
    }
  }, [user, setUser, setIsLoggedIn]);

  // Function to clear all local storage data
  const clearAllLocalData = useCallback(async () => {
    try {
      console.log("🧹 Clearing all local storage data");

      // Clear user data
      await setUser(null);
      await setIsLoggedIn(false);

      // Clear other stored data
      await storage.remove(STORAGE_KEYS.FAVORITES);

      return { success: true, message: "All local data cleared" };
    } catch (error) {
      console.error("Clear all data error:", error);
      return { success: false, error: error.message };
    }
  }, [setUser, setIsLoggedIn]);

  return {
    isLoggedIn,
    user: getCurrentUser(),
    login,
    signup,
    logout,
    cleanupStaleData,
    clearAllLocalData,
  };
};

export const useUserPreferences = () => {
  const { user } = useAuth();
  const [language, setLanguage] = usePersistedState(
    STORAGE_KEYS.LANGUAGE,
    "en"
  );
  const [theme, setTheme] = usePersistedState(STORAGE_KEYS.THEME, "light");
  const [biometricEnabled, setBiometricEnabled] = usePersistedState(
    STORAGE_KEYS.BIOMETRICS_ENABLED,
    false
  );

  // Function to sync preferences to Firebase
  const syncToFirebase = useCallback(
    async (preferences) => {
      if (user?.id) {
        try {
          await firestore.users.updatePreferences(user.id, preferences);
          console.log("✅ Preferences synced to Firebase");
          return { success: true };
        } catch (error) {
          console.error("Failed to sync preferences to Firebase:", error);
          return { success: false, error: error.message };
        }
      }
      return { success: true }; // No user, no sync needed
    },
    [user?.id]
  );

  // Function to load preferences from Firebase
  const loadFromFirebase = useCallback(async () => {
    if (user?.id) {
      try {
        const userDoc = await firestore.users.get(user.id);
        if (userDoc.success && userDoc.data.preferences) {
          const firebasePrefs = userDoc.data.preferences;

          // Update local state with Firebase preferences
          if (firebasePrefs.language && firebasePrefs.language !== language) {
            await setLanguage(firebasePrefs.language);
          }
          if (firebasePrefs.theme && firebasePrefs.theme !== theme) {
            await setTheme(firebasePrefs.theme);
          }
          if (
            firebasePrefs.biometricEnabled !== undefined &&
            firebasePrefs.biometricEnabled !== biometricEnabled
          ) {
            await setBiometricEnabled(firebasePrefs.biometricEnabled);
          }

          console.log("✅ Preferences loaded from Firebase");
          return { success: true };
        }
      } catch (error) {
        console.error("Failed to load preferences from Firebase:", error);
        return { success: false, error: error.message };
      }
    }
    return { success: true }; // No user, no load needed
  }, [
    user?.id,
    language,
    theme,
    biometricEnabled,
    setLanguage,
    setTheme,
    setBiometricEnabled,
  ]);

  const updateLanguage = useCallback(
    async (newLanguage) => {
      await setLanguage(newLanguage);

      // Sync to Firebase
      const updatedPrefs = {
        language: newLanguage,
        theme,
        biometricEnabled,
      };
      await syncToFirebase(updatedPrefs);
    },
    [setLanguage, theme, biometricEnabled, syncToFirebase]
  );

  const updateTheme = useCallback(
    async (newTheme) => {
      await setTheme(newTheme);

      // Sync to Firebase
      const updatedPrefs = {
        language,
        theme: newTheme,
        biometricEnabled,
      };
      await syncToFirebase(updatedPrefs);
    },
    [setTheme, language, biometricEnabled, syncToFirebase]
  );

  const updateBiometric = useCallback(
    async (value) => {
      const newValue = !!value;
      await setBiometricEnabled(newValue);

      // Sync to Firebase
      const updatedPrefs = {
        language,
        theme,
        biometricEnabled: newValue,
      };
      await syncToFirebase(updatedPrefs);
    },
    [setBiometricEnabled, language, theme, syncToFirebase]
  );

  return {
    language,
    theme,
    biometricEnabled,
    updateLanguage,
    updateTheme,
    updateBiometric,
    loadFromFirebase,
    syncToFirebase,
  };
};

export const useFirebaseErrorHandler = () => {
  const { showError } = useError();

  useEffect(() => {
    // Connect the error handler to the ErrorContext
    setErrorHandler(showError);

    return () => {
      // Cleanup
      setErrorHandler(null);
    };
  }, [showError]);
};
