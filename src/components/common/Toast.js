import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../utils";

const Toast = ({
  message,
  type = "info",
  visible,
  onHide,
  duration = 3000,
  position = "top",
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);

  const showToast = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      hideToast();
    }, duration);
  }, [fadeAnim, slideAnim, duration]);

  const hideToast = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false);
      onHide?.();
    });
  }, [fadeAnim, slideAnim, onHide]);

  useEffect(() => {
    if (visible && !isVisible) {
      setIsVisible(true);
      showToast();
    } else if (!visible && isVisible) {
      hideToast();
    }
  }, [visible, isVisible, showToast, hideToast]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          backgroundColor: "#10B981",
          icon: "checkmark-circle",
          iconColor: "#FFFFFF",
        };
      case "error":
        return {
          backgroundColor: "#EF4444",
          icon: "alert-circle",
          iconColor: "#FFFFFF",
        };
      case "warning":
        return {
          backgroundColor: "#F59E0B",
          icon: "warning",
          iconColor: "#FFFFFF",
        };
      default:
        return {
          backgroundColor: "#3B82F6",
          icon: "information-circle",
          iconColor: "#FFFFFF",
        };
    }
  };

  const toastConfig = getToastConfig();
  const topPosition = position === "top" ? 60 : undefined;
  const bottomPosition = position === "bottom" ? 100 : undefined;

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles["absolute"],
        styles["left-4"],
        styles["right-4"],
        styles.rounded,
        styles["p-4"],
        styles["shadow-lg"],
        {
          backgroundColor: toastConfig.backgroundColor,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          top: topPosition,
          bottom: bottomPosition,
          zIndex: 9999,
        },
      ]}
    >
      <View style={[styles["flex-row"], styles["items-center"]]}>
        <Ionicons
          name={toastConfig.icon}
          size={24}
          color={toastConfig.iconColor}
          style={styles["me-3"]}
        />

        <Text
          style={[
            styles["text-white"],
            styles["text-center"],
            styles["font-medium"],
            styles.flex,
          ]}
        >
          {message}
        </Text>

        <TouchableOpacity onPress={hideToast} style={styles["ms-2"]}>
          <Ionicons name="close" size={20} color={toastConfig.iconColor} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Toast;
