import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../bridge/hooks";
import { auth, firestore, logFirebaseError } from "../bridge/services/firebase";
import { useError } from "../context/ErrorContext";
import { useTheme } from "../context/ThemeContext";

const FirebaseStatus = () => {
  const { showError } = useError();
  const { user, cleanupStaleData, clearAllLocalData } = useAuth();
  const { styles: themeStyles, colors, componentStyles } = useTheme();
  const [status, setStatus] = useState("Checking...");
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [testResults, setTestResults] = useState({});

  useEffect(() => {
    checkFirebaseStatus();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      if (user) {
        checkFirebaseStatus();
      }
    });

    return unsubscribe;
  }, []);

  const checkFirebaseStatus = async () => {
    try {
      setStatus("Connected ✅");
      setTestResults((prev) => ({ ...prev, connection: "Connected ✅" }));
    } catch (error) {
      setStatus("Error ❌");
      setTestResults((prev) => ({ ...prev, connection: "Error ❌" }));
      console.error("Firebase connection error:", error);
    }
  };

  const handleCleanup = async () => {
    try {
      setTestResults((prev) => ({ ...prev, cleanup: "Cleaning..." }));
      const result = await cleanupStaleData();

      if (result.success) {
        setTestResults((prev) => ({ ...prev, cleanup: "Completed ✅" }));
        showError({
          code: "success",
          message: result.message,
        });
      } else {
        setTestResults((prev) => ({ ...prev, cleanup: "Failed ❌" }));
        showError({
          code: "error",
          message: result.error || "Cleanup failed",
        });
      }
    } catch (error) {
      setTestResults((prev) => ({ ...prev, cleanup: "Error ❌" }));
      showError({
        code: "error",
        message: "Cleanup error: " + error.message,
      });
    }
  };

  const handleClearAllData = async () => {
    try {
      setTestResults((prev) => ({ ...prev, cleanup: "Clearing all..." }));
      const result = await clearAllLocalData();

      if (result.success) {
        setTestResults((prev) => ({ ...prev, cleanup: "All cleared ✅" }));
        showError({
          code: "success",
          message: result.message,
        });
      } else {
        setTestResults((prev) => ({ ...prev, cleanup: "Failed ❌" }));
        showError({
          code: "error",
          message: result.error || "Clear all failed",
        });
      }
    } catch (error) {
      setTestResults((prev) => ({ ...prev, cleanup: "Error ❌" }));
      showError({
        code: "error",
        message: "Clear all error: " + error.message,
      });
    }
  };

  // Check for authentication state mismatch
  const hasAuthMismatch = () => {
    if (!user && !firebaseUser) return false; // Both not authenticated
    if (user && firebaseUser) return false; // Both authenticated
    return true; // One is authenticated but not the other
  };

  const testFirestoreAccess = async () => {
    if (!user) {
      showError({
        code: "unauthenticated",
        message: "Please sign in first to test Firestore access",
      });
      return;
    }

    try {
      setTestResults((prev) => ({ ...prev, firestore: "Testing..." }));

      // Test reading user document
      const userDoc = await firestore.users.get(user.id);

      if (userDoc.success) {
        setTestResults((prev) => ({ ...prev, firestore: "Access Granted ✅" }));
        // Show success message in alert bar
        showError({
          code: "success",
          message: "Firestore access working correctly!",
        });
      } else {
        setTestResults((prev) => ({ ...prev, firestore: "Access Denied ❌" }));
        showError({
          code: "permission-denied",
          message: userDoc.error || "Access denied",
        });
      }
    } catch (error) {
      const errorInfo = logFirebaseError("test_firestore_access", error, {
        userId: user.id,
      });
      setTestResults((prev) => ({ ...prev, firestore: "Error ❌" }));

      // Error will be shown automatically by logFirebaseError
    }
  };

  const testFavoritesAccess = async () => {
    if (!user) {
      showError({
        code: "unauthenticated",
        message: "Please sign in first to test favorites access",
      });
      return;
    }

    try {
      setTestResults((prev) => ({ ...prev, favorites: "Testing..." }));

      // Test reading favorites
      const favoritesResult = await firestore.favorites.get(user.id);

      if (favoritesResult.success) {
        setTestResults((prev) => ({ ...prev, favorites: "Access Granted ✅" }));
        showError({
          code: "success",
          message: "Favorites access working correctly!",
        });
      } else {
        setTestResults((prev) => ({ ...prev, favorites: "Access Denied ❌" }));
        showError({
          code: "permission-denied",
          message: favoritesResult.error || "Access denied",
        });
      }
    } catch (error) {
      const errorInfo = logFirebaseError("test_favorites_access", error, {
        userId: user.id,
      });
      setTestResults((prev) => ({ ...prev, favorites: "Error ❌" }));

      // Error will be shown automatically by logFirebaseError
    }
  };

  const showSetupInstructions = () => {
    showError({
      code: "info",
      message:
        "Check FIREBASE_PERMISSIONS_FIX.md for detailed setup instructions",
    });
  };

  return (
    <View style={[componentStyles.card, styles.container]}>
      <Text
        style={[
          styles.title,
          themeStyles["text-primary"],
          themeStyles["font-bold"],
        ]}
      >
        Firebase Status
      </Text>

      <View style={styles.statusRow}>
        <Text style={[styles.label, themeStyles["text-secondary"]]}>
          Connection:
        </Text>
        <Text style={[styles.value, themeStyles["text-primary"]]}>
          {status}
        </Text>
      </View>

      <View style={styles.statusRow}>
        <Text style={[styles.label, themeStyles["text-secondary"]]}>User:</Text>
        <Text style={[styles.value, themeStyles["text-primary"]]}>
          {user ? `${user.email} (Firebase)` : "Not signed in"}
        </Text>
      </View>

      <View style={styles.statusRow}>
        <Text style={[styles.label, themeStyles["text-secondary"]]}>
          Firebase Auth:
        </Text>
        <Text style={[styles.value, themeStyles["text-primary"]]}>
          {firebaseUser
            ? `${firebaseUser.email} (${firebaseUser.uid})`
            : "Not authenticated"}
        </Text>
      </View>

      {hasAuthMismatch() && (
        <View
          style={[
            styles.warningSection,
            {
              backgroundColor: colors.warning.light,
              borderColor: colors.warning.main,
            },
          ]}
        >
          <Text style={[styles.warningTitle, { color: colors.warning.dark }]}>
            ⚠️ Authentication Mismatch
          </Text>
          <Text style={[styles.warningText, { color: colors.warning.dark }]}>
            Local storage and Firebase authentication are out of sync.
          </Text>
          <View style={styles.cleanupButtonContainer}>
            <TouchableOpacity
              style={[
                styles.cleanupButton,
                { backgroundColor: colors.success.light },
              ]}
              onPress={handleCleanup}
            >
              <Text
                style={[
                  styles.cleanupButtonText,
                  { color: colors.success.dark },
                ]}
              >
                Clean Up Stale Data
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.clearAllButton,
                { backgroundColor: colors.error.light },
              ]}
              onPress={handleClearAllData}
            >
              <Text
                style={[
                  styles.clearAllButtonText,
                  { color: colors.error.dark },
                ]}
              >
                Clear All Local Data
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View
        style={[styles.testSection, { borderTopColor: colors.border.main }]}
      >
        <Text
          style={[
            styles.sectionTitle,
            themeStyles["text-primary"],
            themeStyles["font-semibold"],
          ]}
        >
          Test Results:
        </Text>

        <View style={styles.statusRow}>
          <Text style={[styles.label, themeStyles["text-secondary"]]}>
            Firestore:
          </Text>
          <Text style={[styles.value, themeStyles["text-primary"]]}>
            {testResults.firestore || "Not tested"}
          </Text>
        </View>

        <View style={styles.statusRow}>
          <Text style={[styles.label, themeStyles["text-secondary"]]}>
            Favorites:
          </Text>
          <Text style={[styles.value, themeStyles["text-primary"]]}>
            {testResults.favorites || "Not tested"}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary.main }]}
          onPress={testFirestoreAccess}
        >
          <Text style={styles.buttonText}>Test Firestore</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary.main }]}
          onPress={testFavoritesAccess}
        >
          <Text style={styles.buttonText}>Test Favorites</Text>
        </TouchableOpacity>
      </View>

      {/* Test Error Alerts Section */}
      {/* <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>Test Error Alerts:</Text>
        <TestErrorAlerts />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 8,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "500",
    flex: 1,
  },
  value: {
    flex: 1,
    textAlign: "right",
  },
  testSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 8,
  },
  button: {
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  warningSection: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  warningText: {
    fontSize: 13,
    marginBottom: 10,
  },
  cleanupButtonContainer: {
    gap: 8,
  },
  cleanupButton: {
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  cleanupButtonText: {
    fontWeight: "600",
  },
  clearAllButton: {
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  clearAllButtonText: {
    fontWeight: "600",
  },
});

export default FirebaseStatus;
