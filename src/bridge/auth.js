import { STORAGE_KEYS } from "./constants";
import { storage } from "./storage";

const STORAGE_USER_KEY = "auth_user";

export const getCurrentUser = async () => {
  return await storage.get(STORAGE_USER_KEY, null);
};

export const loginWithEmailPassword = async (email, password) => {
  const trimmed = (email || "").trim();
  if (!trimmed || !password) throw new Error("Please enter email and password");

  // Get stored users
  const storedUsers = (await storage.get("mock_users", [])) || [];
  const builtinUsers = [
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
  const allUsers = [...storedUsers, ...builtinUsers];

  const inputEmail = String(trimmed).toLowerCase();
  const inputPassword = String(password);

  const foundUser = allUsers.find(
    (u) =>
      String(u.email || "").toLowerCase() === inputEmail &&
      String(u.password || "") === inputPassword
  );

  if (foundUser) {
    const userData = {
      uid: foundUser.id || Date.now().toString(),
      email: foundUser.email,
      name: foundUser.name || foundUser.email?.split("@")[0] || "User",
      createdAt: foundUser.createdAt || new Date().toISOString(),
      provider: "local",
    };
    await storage.set(STORAGE_KEYS.AUTH_LOGGED_IN, true);
    await storage.set(STORAGE_USER_KEY, userData);
    return userData;
  }

  throw new Error("Invalid email or password");
};

export const signupWithEmailPassword = async (email, password) => {
  const trimmed = (email || "").trim();
  if (!trimmed || !password) throw new Error("Please fill all fields");

  // Check if user already exists
  const existingUsers = (await storage.get("mock_users", [])) || [];
  const normalizedEmail = String(trimmed).toLowerCase();
  const userExists = existingUsers.some(
    (u) => String(u.email || "").toLowerCase() === normalizedEmail
  );

  if (userExists) {
    throw new Error("User already exists");
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    email: normalizedEmail,
    password,
    name: normalizedEmail.split("@")[0], // Use email prefix as name
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...existingUsers, newUser];
  await storage.set("mock_users", updatedUsers);

  const userData = {
    uid: newUser.id,
    email: newUser.email,
    name: newUser.name,
    createdAt: newUser.createdAt,
    provider: "local",
  };

  await storage.set(STORAGE_KEYS.AUTH_LOGGED_IN, true);
  await storage.set(STORAGE_USER_KEY, userData);
  return userData;
};

export const logout = async () => {
  await storage.set(STORAGE_KEYS.AUTH_LOGGED_IN, false);
  await storage.remove(STORAGE_USER_KEY);
};

export const subscribeAuthState = (callback) => {
  // Provide current value once and a no-op unsubscribe
  (async () => callback(await getCurrentUser()))();
  return () => {};
};
