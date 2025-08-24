import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useError } from "../context/ErrorContext";

const TestErrorAlerts = () => {
  const { showError } = useError();

  const testError = () => {
    showError({
      code: "permission-denied",
      message: "This is a test permission error message",
    });
  };

  const testSuccess = () => {
    showError({
      code: "success",
      message: "Operation completed successfully!",
    });
  };

  const testInfo = () => {
    showError({
      code: "info",
      message: "This is an informational message for the user",
    });
  };

  const testNetworkError = () => {
    showError({
      code: "network-request-failed",
      message:
        "Network connection failed. Please check your internet connection.",
    });
  };

  const testAuthError = () => {
    showError({
      code: "unauthenticated",
      message: "Please sign in to continue with this operation",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Error Alerts</Text>
      <Text style={styles.subtitle}>
        Tap buttons to test different alert types
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.errorButton} onPress={testError}>
          <Text style={styles.buttonText}>Test Error</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.successButton} onPress={testSuccess}>
          <Text style={styles.buttonText}>Test Success</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoButton} onPress={testInfo}>
          <Text style={styles.buttonText}>Test Info</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.networkButton}
          onPress={testNetworkError}
        >
          <Text style={styles.buttonText}>Test Network Error</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.authButton} onPress={testAuthError}>
          <Text style={styles.buttonText}>Test Auth Error</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    gap: 12,
  },
  errorButton: {
    backgroundColor: "#DC2626",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  successButton: {
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  infoButton: {
    backgroundColor: "#3B82F6",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  networkButton: {
    backgroundColor: "#F59E0B",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  authButton: {
    backgroundColor: "#8B5CF6",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default TestErrorAlerts;
