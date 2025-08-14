import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  get: async (key, defaultValue = null) => {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (raw == null) return defaultValue;
      try {
        return JSON.parse(raw);
      } catch {
        return raw;
      }
    } catch (e) {
      console.warn("storage.get error", key, e);
      return defaultValue;
    }
  },
  set: async (key, value) => {
    try {
      const toStore = typeof value === "string" ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, toStore);
    } catch (e) {
      console.warn("storage.set error", key, e);
    }
  },
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.warn("storage.remove error", key, e);
    }
  },
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.warn("storage.clear error", e);
    }
  },
};
