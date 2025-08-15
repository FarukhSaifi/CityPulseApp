import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { STORAGE_KEYS } from "./constants";
import { ensureFirebase, firebaseAuth, isFirebaseConfigured } from "./firebase";
import { storage } from "./storage";

const MOCK_CREDENTIAL = {
  email: "demo@citypulse.app",
  password: "password123",
};
const STORAGE_USER_KEY = "auth_user";

export const isUsingFirebase = () => isFirebaseConfigured();

export const getCurrentUser = async () => {
  if (isUsingFirebase()) {
    ensureFirebase();
    const auth = firebaseAuth();
    const u = auth.currentUser;
    return u ? { uid: u.uid, email: u.email || "" } : null;
  }
  return await storage.get(STORAGE_USER_KEY, null);
};

export const loginWithEmailPassword = async (email, password) => {
  const trimmed = (email || "").trim();
  if (!trimmed || !password) throw new Error("Please enter email and password");

  if (isUsingFirebase()) {
    ensureFirebase();
    const auth = firebaseAuth();
    const cred = await signInWithEmailAndPassword(auth, trimmed, password);
    const user = { uid: cred.user.uid, email: cred.user.email || trimmed };
    await storage.set(STORAGE_KEYS.AUTH_LOGGED_IN, true);
    await storage.set(STORAGE_USER_KEY, user);
    return user;
  }

  if (
    trimmed === MOCK_CREDENTIAL.email &&
    password === MOCK_CREDENTIAL.password
  ) {
    const user = { uid: "mock-uid", email: trimmed };
    await storage.set(STORAGE_KEYS.AUTH_LOGGED_IN, true);
    await storage.set(STORAGE_USER_KEY, user);
    return user;
  }
  throw new Error("Invalid email or password");
};

export const signupWithEmailPassword = async (email, password) => {
  const trimmed = (email || "").trim();
  if (!trimmed || !password) throw new Error("Please fill all fields");

  if (isUsingFirebase()) {
    ensureFirebase();
    const auth = firebaseAuth();
    const cred = await createUserWithEmailAndPassword(auth, trimmed, password);
    return { uid: cred.user.uid, email: cred.user.email || trimmed };
  }

  // Mock: accept any signup, no persistence needed here
  return { uid: "mock-uid", email: trimmed };
};

export const logout = async () => {
  if (isUsingFirebase()) {
    ensureFirebase();
    const auth = firebaseAuth();
    try {
      await signOut(auth);
    } catch {}
  }
  await storage.set(STORAGE_KEYS.AUTH_LOGGED_IN, false);
  await storage.remove(STORAGE_USER_KEY);
};

export const subscribeAuthState = (callback) => {
  if (isUsingFirebase()) {
    ensureFirebase();
    const auth = firebaseAuth();
    return onAuthStateChanged(auth, (u) => {
      callback(u ? { uid: u.uid, email: u.email || "" } : null);
    });
  }
  // Mock: no live events. Provide current value once and a no-op unsubscribe
  (async () => callback(await getCurrentUser()))();
  return () => {};
};
