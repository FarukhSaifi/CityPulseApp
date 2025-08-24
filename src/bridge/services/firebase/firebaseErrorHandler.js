// Firebase Error Handler
// Provides user-friendly error messages and fallback behavior

// Import the error context (we'll need to handle this carefully to avoid circular imports)
let showErrorFunction = null;

export const setErrorHandler = (showError) => {
  showErrorFunction = showError;
};

export const firebaseErrorCodes = {
  // Authentication errors
  "auth/user-not-found": "No account found with this email address",
  "auth/wrong-password": "Incorrect password",
  "auth/email-already-in-use": "An account with this email already exists",
  "auth/weak-password": "Password should be at least 6 characters",
  "auth/invalid-email": "Please enter a valid email address",
  "auth/too-many-requests": "Too many failed attempts. Please try again later",
  "auth/network-request-failed": "Network error. Please check your connection",

  // Firestore errors
  "permission-denied": "Access denied. Please check your permissions",
  "missing-or-insufficient-permissions":
    "Access denied. Please check your permissions",
  unavailable: "Service temporarily unavailable. Please try again",
  "deadline-exceeded": "Request timed out. Please try again",
  "resource-exhausted": "Service quota exceeded. Please try again later",
  "failed-precondition": "Operation failed due to invalid state",
  aborted: "Operation was aborted",
  "out-of-range": "Requested value is out of range",
  unimplemented: "Operation not implemented",
  internal: "Internal error occurred. Please try again",
  unavailable: "Service unavailable. Please try again later",
  "data-loss": "Data loss occurred. Please try again",
  unauthenticated: "Please sign in to continue",
};

export const getFirebaseErrorMessage = (error) => {
  if (!error) return "An unknown error occurred";

  // Handle Firebase Auth errors
  if (error.code && firebaseErrorCodes[error.code]) {
    return firebaseErrorCodes[error.code];
  }

  // Handle Firestore errors
  if (error.code && firebaseErrorCodes[error.code]) {
    return firebaseErrorCodes[error.code];
  }

  // Handle generic errors
  if (error.message) {
    return error.message;
  }

  // Handle string errors
  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred. Please try again.";
};

export const shouldFallbackToLocal = (error) => {
  if (!error) return false;

  // Fallback for network-related errors
  const networkErrors = [
    "auth/network-request-failed",
    "unavailable",
    "deadline-exceeded",
    "resource-exhausted",
  ];

  if (error.code && networkErrors.includes(error.code)) {
    return true;
  }

  // Fallback for permission errors (user might not be properly authenticated or rules are misconfigured)
  const permissionErrors = [
    "permission-denied",
    "unauthenticated",
    "missing-or-insufficient-permissions",
  ];

  if (error.code && permissionErrors.includes(error.code)) {
    return true;
  }

  // Also check error message for permission-related text
  if (error.message && error.message.toLowerCase().includes("permission")) {
    return true;
  }

  return false;
};

export const logFirebaseError = (operation, error, context = {}) => {
  const errorInfo = {
    operation,
    error: {
      code: error?.code,
      message: error?.message,
      stack: error?.stack,
    },
    context,
    timestamp: new Date().toISOString(),
    shouldFallback: shouldFallbackToLocal(error),
  };

  if (__DEV__) {
    console.group(`🔥 Firebase Error: ${operation}`);
    console.error("Error details:", errorInfo);

    // Special handling for permission errors
    if (
      error?.code === "permission-denied" ||
      error?.code === "missing-or-insufficient-permissions" ||
      error?.message?.toLowerCase().includes("permission")
    ) {
      console.warn("🔒 Permission Error Detected!");
      console.warn("This usually means:");
      console.warn(
        "1. Firestore security rules are not set in Firebase Console"
      );
      console.warn("2. User is not properly authenticated");
      console.warn("3. Security rules are too restrictive");
      console.warn("Check your Firebase Console > Firestore > Rules");
    }

    console.groupEnd();
  }

  // Show error in the top alert bar if available
  if (showErrorFunction && error) {
    try {
      showErrorFunction({
        code: error.code,
        message: getFirebaseErrorMessage(error),
        operation,
        context,
      });
    } catch (e) {
      console.warn("Failed to show error in alert bar:", e);
    }
  }

  // In production, you might want to send this to a logging service
  // analytics.logError('firebase_error', errorInfo);

  return errorInfo;
};

export const handleFirebaseOperation = async (
  operation,
  firebaseFunction,
  fallbackFunction,
  context = {}
) => {
  try {
    const result = await firebaseFunction();
    return { success: true, data: result, source: "firebase" };
  } catch (error) {
    const errorInfo = logFirebaseError(operation, error, context);

    if (shouldFallbackToLocal(error) && fallbackFunction) {
      try {
        console.log(`🔄 Falling back to local operation: ${operation}`);
        const fallbackResult = await fallbackFunction();
        return {
          success: true,
          data: fallbackResult,
          source: "local",
          fallback: true,
          originalError: errorInfo,
        };
      } catch (fallbackError) {
        console.error(
          `❌ Fallback operation failed: ${operation}`,
          fallbackError
        );
        return {
          success: false,
          error: getFirebaseErrorMessage(error),
          fallbackFailed: true,
          originalError: errorInfo,
        };
      }
    }

    return {
      success: false,
      error: getFirebaseErrorMessage(error),
      errorInfo,
    };
  }
};

export default {
  getFirebaseErrorMessage,
  shouldFallbackToLocal,
  logFirebaseError,
  handleFirebaseOperation,
};
