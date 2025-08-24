import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getFirebaseErrorMessage } from "./firebaseErrorHandler";

// Firebase configuration
import { firebaseConfig } from "../../config/firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Authentication functions
export const firebaseAuth = {
  // Sign up with email and password
  async signUp(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update profile with display name
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: displayName || user.email?.split("@")[0] || "User",
        createdAt: new Date().toISOString(),
        favorites: [],
        preferences: {
          language: "en",
          theme: "light",
          biometricEnabled: false,
        },
      });

      return { success: true, user: user };
    } catch (error) {
      console.error("Firebase signup error:", error);
      return {
        success: false,
        error: getFirebaseErrorMessage(error),
      };
    }
  },

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error("Firebase signin error:", error);
      return {
        success: false,
        error: getFirebaseErrorMessage(error),
      };
    }
  },

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error("Firebase signout error:", error);
      return {
        success: false,
        error: getFirebaseErrorMessage(error),
      };
    }
  },

  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  },
};

// Firestore functions
export const firestore = {
  // User operations
  users: {
    // Get user document
    async get(userId) {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          return { success: true, data: userDoc.data() };
        } else {
          return { success: false, error: "User not found" };
        }
      } catch (error) {
        console.error("Firestore get user error:", error);
        return { success: false, error: error.message };
      }
    },

    // Update user document
    async update(userId, data) {
      try {
        await updateDoc(doc(db, "users", userId), data);
        return { success: true };
      } catch (error) {
        console.error("Firestore update user error:", error);
        return { success: false, error: error.message };
      }
    },

    // Update user preferences
    async updatePreferences(userId, preferences) {
      try {
        await updateDoc(doc(db, "users", userId), {
          preferences: preferences,
        });
        return { success: true };
      } catch (error) {
        console.error("Firestore update preferences error:", error);
        return { success: false, error: error.message };
      }
    },
  },

  // Favorites operations
  favorites: {
    // Get user favorites
    async get(userId) {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          return { success: true, data: userData.favorites || [] };
        } else {
          return { success: false, error: "User not found" };
        }
      } catch (error) {
        console.error("Firestore get favorites error:", error);
        return { success: false, error: error.message };
      }
    },

    // Add event to favorites
    async add(userId, event) {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const favorites = userData.favorites || [];

          // Check if event already exists
          if (!favorites.find((fav) => fav.id === event.id)) {
            const updatedFavorites = [...favorites, event];
            await updateDoc(doc(db, "users", userId), {
              favorites: updatedFavorites,
            });
            return { success: true, data: updatedFavorites };
          } else {
            return { success: false, error: "Event already in favorites" };
          }
        } else {
          return { success: false, error: "User not found" };
        }
      } catch (error) {
        console.error("Firestore add favorite error:", error);
        return { success: false, error: error.message };
      }
    },

    // Remove event from favorites
    async remove(userId, eventId) {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const favorites = userData.favorites || [];

          const updatedFavorites = favorites.filter(
            (fav) => fav.id !== eventId
          );
          await updateDoc(doc(db, "users", userId), {
            favorites: updatedFavorites,
          });
          return { success: true, data: updatedFavorites };
        } else {
          return { success: false, error: "User not found" };
        }
      } catch (error) {
        console.error("Firestore remove favorite error:", error);
        return { success: false, error: error.message };
      }
    },

    // Clear all favorites
    async clear(userId) {
      try {
        await updateDoc(doc(db, "users", userId), {
          favorites: [],
        });
        return { success: true };
      } catch (error) {
        console.error("Firestore clear favorites error:", error);
        return { success: false, error: error.message };
      }
    },
  },

  // Events operations (for future use)
  events: {
    // Save event to Firestore (for user-created events)
    async save(eventData) {
      try {
        const docRef = await addDoc(collection(db, "events"), {
          ...eventData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        return { success: true, id: docRef.id };
      } catch (error) {
        console.error("Firestore save event error:", error);
        return { success: false, error: error.message };
      }
    },

    // Get user-created events
    async getUserEvents(userId) {
      try {
        const q = query(
          collection(db, "events"),
          where("createdBy", "==", userId),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: events };
      } catch (error) {
        console.error("Firestore get user events error:", error);
        return { success: false, error: error.message };
      }
    },
  },
};

export default { auth: firebaseAuth, firestore, db };
