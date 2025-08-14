import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "../utils/styles";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("MainTabs");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={["#3B82F6", "#1E40AF", "#1E3A8A"]}
      style={[styles.flex, styles["justify-center"], styles["items-center"]]}
    >
      <View style={styles["items-center"]}>
        <Ionicons name="location" size={80} color="white" />
        <Text
          style={[
            styles["text-4xl"],
            styles["font-bold"],
            styles["text-white"],
            styles["mt-4"],
            styles["mb-2"],
          ]}
        >
          City Pulse
        </Text>
        <Text
          style={[
            styles["text-lg"],
            styles["text-white"],
            styles["opacity-90"],
          ]}
        >
          Discover Local Events
        </Text>

        <View style={styles["mt-1"]}>
          <ActivityIndicator size="large" color="white" />
          <Text
            style={[styles["text-white"], styles["mt-4"], styles["opacity-80"]]}
          >
            Loading...
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;
