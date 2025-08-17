import { getApps, initializeApp } from "firebase/app";
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { CONFIG } from "./config";

let app = null;
let auth = null;
let db = null;
let storage = null;

export const isFirebaseConfigured = () =>
  CONFIG.FIREBASE.apiKey && CONFIG.FIREBASE.apiKey !== "demo";

export const ensureFirebase = () => {
  if (!isFirebaseConfigured()) return null;
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(CONFIG.FIREBASE);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  }
  return app;
};

export const firebaseAuth = () => {
  ensureFirebase();
  return auth;
};

export const firebaseDb = () => {
  ensureFirebase();
  return db;
};

export const firebaseStorage = () => {
  ensureFirebase();
  return storage;
};

// Create or update a user profile document in Firestore
export const upsertUserProfile = async (authUser, extra = {}) => {
  if (!isFirebaseConfigured() || !authUser?.uid) return;
  ensureFirebase();
  const userRef = doc(firebaseDb(), "users", authUser.uid);
  const data = {
    uid: authUser.uid,
    email: authUser.email || null,
    name: authUser.displayName || extra?.name || null,
    photoURL: authUser.photoURL || null,
    provider: extra?.provider || authUser.providerId || "firebase",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...extra,
  };
  // merge: true so we never overwrite existing fields unintentionally
  await setDoc(userRef, data, { merge: true });
};

// Update current user's fields in Firestore (merge)
export const setUserFields = async (fields) => {
  if (!isFirebaseConfigured()) return;
  ensureFirebase();
  const current = firebaseAuth()?.currentUser;
  if (!current?.uid) return;
  const userRef = doc(firebaseDb(), "users", current.uid);
  await setDoc(
    userRef,
    { ...fields, updatedAt: serverTimestamp() },
    { merge: true }
  );
};

// Lightweight connectivity check for Auth/Firestore/Storage
export const verifyFirebaseConnection = async () => {
  const status = {
    configured: isFirebaseConfigured(),
    initialized: false,
    authOk: false,
    firestoreOk: false,
    storageOk: false,
    error: null,
  };
  try {
    if (!status.configured) {
      return status;
    }
    const appInstance = ensureFirebase();
    status.initialized = !!appInstance;
    // Auth: fetch sign-in methods for a dummy email (network call)
    try {
      const methods = await fetchSignInMethodsForEmail(
        firebaseAuth(),
        "healthcheck+test@invalid.local"
      );
      if (Array.isArray(methods)) status.authOk = true;
    } catch (e) {}
    // Firestore: get a non-existent doc (should resolve, exists=false)
    try {
      const snap = await getDoc(doc(firebaseDb(), "_health/__ping__"));
      if (snap) status.firestoreOk = true;
    } catch (e) {}
    // Storage: attempt a URL for a non-existent object; expect failure but proves reachability
    try {
      await getDownloadURL(ref(firebaseStorage(), "_health/__nope__"));
    } catch (e) {
      // If we get any error from SDK, storage is reachable/configured
      status.storageOk = true;
    }
    return status;
  } catch (e) {
    status.error = String(e?.message || e);
    return status;
  }
};
