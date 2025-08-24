import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useError } from "../context/ErrorContext";

const ErrorAlertBar = () => {
  const { currentError, isVisible, hideError } = useError();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (isVisible && currentError) {
      // Slide in and fade in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-remove after different times based on message type
      const getAutoHideTime = () => {
        if (currentError.code === "success") return 2000; // 2 seconds for success
        if (currentError.code === "info") return 2500; // 2.5 seconds for info
        return 4000; // 4 seconds for errors
      };

      const timer = setTimeout(() => {
        hideAlert();
      }, getAutoHideTime());

      return () => clearTimeout(timer);
    }
  }, [isVisible, currentError]);

  const hideAlert = () => {
    // Slide out and fade out
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      hideError();
    });
  };

  if (!isVisible || !currentError) return null;

  const getErrorIcon = () => {
    if (currentError.code === "success") {
      return "checkmark-circle";
    }
    if (currentError.code === "info") {
      return "information-circle";
    }
    if (
      currentError.code === "permission-denied" ||
      currentError.code === "missing-or-insufficient-permissions"
    ) {
      return "lock-closed";
    }
    if (currentError.code === "unauthenticated") {
      return "person-off";
    }
    if (currentError.code === "network-request-failed") {
      return "wifi-off";
    }
    return "warning";
  };

  const getErrorColor = () => {
    if (currentError.code === "success") {
      return "#10B981"; // Green for success
    }
    if (currentError.code === "info") {
      return "#3B82F6"; // Blue for info
    }
    if (
      currentError.code === "permission-denied" ||
      currentError.code === "missing-or-insufficient-permissions"
    ) {
      return "#DC2626"; // Red for permission errors
    }
    if (currentError.code === "unauthenticated") {
      return "#F59E0B"; // Yellow for auth errors
    }
    return "#EF4444"; // Default red
  };

  const getTitle = () => {
    if (currentError.code === "success") {
      return "Success";
    }
    if (currentError.code === "info") {
      return "Information";
    }
    return "Firebase Error";
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={[styles.alertBar, { backgroundColor: getErrorColor() }]}>
        <View style={styles.iconContainer}>
          <Ionicons name={getErrorIcon()} size={20} color="white" />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{getTitle()}</Text>
          <Text style={styles.message} numberOfLines={2}>
            {currentError.message || "An error occurred"}
          </Text>
          {currentError.code && (
            <Text style={styles.code}>Code: {currentError.code}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.closeButton} onPress={hideAlert}>
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  alertBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 50, // Account for status bar
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  message: {
    color: "white",
    fontSize: 12,
    marginBottom: 2,
  },
  code: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 10,
    fontFamily: "monospace",
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
});

export default ErrorAlertBar;
