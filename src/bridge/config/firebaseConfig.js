// Firebase Configuration
// Set values via .env (see .env.example). Never commit real keys to git.

const env = (key, fallback = "") => process.env[key] ?? fallback;

export const firebaseConfig = {
  apiKey: env("EXPO_PUBLIC_FIREBASE_API_KEY"),
  authDomain: env("EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: env("EXPO_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: env("EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: env("EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: env("EXPO_PUBLIC_FIREBASE_APP_ID"),
};

export const isFirebaseConfigured = () => {
  const { apiKey, projectId } = firebaseConfig;
  return Boolean(apiKey && projectId && apiKey !== "your-api-key-here" && projectId !== "your-project-id");
};

// Firebase project settings
export const firebaseSettings = {
  enableOfflinePersistence: true,
  cacheSizeBytes: 50 * 1024 * 1024,
  auth: {
    requireEmailVerification: false,
    enablePasswordReset: true,
    enableAccountDeletion: true,
  },
};

export const collections = {
  USERS: "users",
  EVENTS: "events",
  FAVORITES: "favorites",
  USER_PREFERENCES: "user_preferences",
};

export const securityRules = {
  users: `
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /users/{userId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
        
        match /events/{eventId} {
          allow read: if true;
          allow create: if request.auth != null;
          allow update, delete: if request.auth != null && 
            request.auth.uid == resource.data.createdBy;
        }
      }
    }
  `,
};
