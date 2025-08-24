// Firebase Services Index
// This file exports all Firebase-related services and utilities

export { auth, db, firebaseAuth, firestore } from "./firebase";

// Export error handling utilities
export {
  firebaseErrorCodes,
  getFirebaseErrorMessage,
  handleFirebaseOperation,
  logFirebaseError,
  setErrorHandler,
} from "./firebaseErrorHandler";
