// Firebase Configuration
// Configuration constants for Firebase services

export const firebaseConfig = {
  apiKey: "AIzaSyCyEc8raPTNVCAYI_eOkS8G9pL-NVSq9uE",
  authDomain: "citypulseapp-c4cb6.firebaseapp.com",
  projectId: "citypulseapp-c4cb6",
  storageBucket: "citypulseapp-c4cb6.firebasestorage.app",
  messagingSenderId: "1046941398131",
  appId: "1:1046941398131:web:1652b7de2f407f3a532606",
};

// Firebase project settings
export const firebaseSettings = {
  // Enable offline persistence for Firestore
  enableOfflinePersistence: true,

  // Firestore cache size (in MB)
  cacheSizeBytes: 50 * 1024 * 1024, // 50MB

  // Authentication settings
  auth: {
    // Enable email verification (optional)
    requireEmailVerification: false,

    // Password reset settings
    enablePasswordReset: true,

    // Account deletion settings
    enableAccountDeletion: true,
  },
};

// Collection names for Firestore
export const collections = {
  USERS: "users",
  EVENTS: "events",
  FAVORITES: "favorites",
  USER_PREFERENCES: "user_preferences",
};

// Security rules (for reference - set these in Firebase Console)
export const securityRules = {
  users: `
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // Users can only read/write their own data
        match /users/{userId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
        
        // Events can be read by anyone, but only created by authenticated users
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
