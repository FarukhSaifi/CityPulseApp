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
