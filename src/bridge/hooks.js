import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEYS } from "./constants";
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

  const isFavorite = useCallback(
    (id) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (event) => {
      const next = isFavorite(event.id)
        ? favorites.filter((f) => f.id !== event.id)
        : [...favorites, event];
      await setFavorites(next);
    },
    [favorites, isFavorite, setFavorites]
  );

  const clearFavorites = useCallback(async () => {
    await setFavorites([]);
  }, [setFavorites]);

  return { favorites, toggleFavorite, isFavorite, clearFavorites };
};

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = usePersistedState(
    STORAGE_KEYS.AUTH_LOGGED_IN,
    false
  );
  const [user, setUser] = usePersistedState("auth_user", null);

  const login = useCallback(
    async (email, password) => {
      // Mock authentication logic
      const mockUsers = [
        {
          email: "demo@citypulse.app",
          password: "password123",
          name: "Demo User",
        },
        { email: "test@citypulse.app", password: "test123", name: "Test User" },
        {
          email: "admin@citypulse.app",
          password: "admin123",
          name: "Admin User",
        },
      ];

      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const userData = {
          id: Date.now().toString(),
          email: foundUser.email,
          name: foundUser.name,
          createdAt: new Date().toISOString(),
        };
        await setUser(userData);
        await setIsLoggedIn(true);
        return { success: true, user: userData };
      }

      return { success: false, error: "Invalid email or password" };
    },
    [setUser, setIsLoggedIn]
  );

  const signup = useCallback(async (email, password) => {
    // Check if user already exists
    const existingUsers = await storage.get("mock_users", []);
    const userExists = existingUsers.some((u) => u.email === email);

    if (userExists) {
      return { success: false, error: "User already exists" };
    }

    // Create new mock user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name: email.split("@")[0], // Use email prefix as name
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...existingUsers, newUser];
    await storage.set("mock_users", updatedUsers);

    return { success: true, user: { ...newUser, password: undefined } };
  }, []);

  const logout = useCallback(async () => {
    await setUser(null);
    await setIsLoggedIn(false);
  }, [setUser, setIsLoggedIn]);

  const getCurrentUser = useCallback(() => user, [user]);

  return {
    isLoggedIn,
    user: getCurrentUser(),
    login,
    signup,
    logout,
  };
};
