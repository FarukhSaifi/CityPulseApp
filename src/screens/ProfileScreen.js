import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import React from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../bridge/hooks";
import { useAppContext } from "../context/AppContext";
import i18n from "../utils/i18n";
import { colors, styles } from "../utils/styles";

const SettingItem = ({
  icon,
  title,
  subtitle,
  onPress,
  rightComponent,
  rtl,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles["bg-white"],
        styles["p-4"],
        styles["border-b"],
        styles["border-gray-100"],
      ]}
    >
      <View
        style={[
          styles["flex-row"],
          styles["items-center"],
          styles["justify-between"],
        ]}
      >
        <View style={[styles["flex-row"], styles["items-center"], styles.flex]}>
          <View
            style={[
              styles["bg-primary-light"],
              styles["p-2"],
              styles.rounded,
              rtl ? styles["ms-4"] : styles["me-4"],
            ]}
          >
            <Ionicons name={icon} size={24} color={colors.primary} />
          </View>
          <View style={styles.flex}>
            <Text
              style={[
                styles["text-gray-800"],
                styles["font-semibold"],
                styles["text-lg"],
                { textAlign: rtl ? "right" : "left" },
              ]}
            >
              {title}
            </Text>
            {subtitle ? (
              <Text
                style={[
                  styles["text-gray-600"],
                  styles["text-sm"],
                  styles["mt-1"],
                  { textAlign: rtl ? "right" : "left" },
                ]}
              >
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>
        {rightComponent || (
          <Ionicons
            name={rtl ? "chevron-back" : "chevron-forward"}
            size={20}
            color="#9CA3AF"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const {
    language,
    changeLanguage,
    theme,
    changeTheme,
    favorites,
    clearFavorites,
    biometricEnabled,
    setBiometric,
    setLoginState,
    isRTL,
  } = useAppContext();

  const handleLanguageChange = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    changeLanguage(newLanguage);
  };

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme);
  };

  const handleBiometricToggle = async () => {
    try {
      if (!biometricEnabled) {
        // Enabling biometrics - check if device supports it
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!hasHardware) {
          Alert.alert(
            "Biometrics Not Supported",
            "This device does not support biometric authentication."
          );
          return;
        }

        if (!isEnrolled) {
          Alert.alert(
            "Biometrics Not Set Up",
            "Please set up Face ID or Touch ID in your device settings first.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Open Settings", onPress: () => Linking.openSettings() },
            ]
          );
          return;
        }

        // Test biometric authentication
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Verify your identity to enable biometric login",
          disableDeviceFallback: false,
        });

        if (result.success) {
          await setBiometric(true);
          Alert.alert("Success", "Biometric login has been enabled!");
        } else {
          Alert.alert(
            "Authentication Failed",
            "Please try again to enable biometric login."
          );
        }
      } else {
        // Disabling biometrics
        await setBiometric(false);
        Alert.alert("Disabled", "Biometric login has been disabled.");
      }
    } catch (error) {
      console.error("Biometric toggle error:", error);
      Alert.alert(
        "Error",
        "An error occurred while updating biometric settings."
      );
    }
  };

  const handleClearFavorites = () => {
    Alert.alert(
      "Clear Favorites",
      "Are you sure you want to clear all your favorite events?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            clearFavorites();
            Alert.alert("Success", "Favorites cleared successfully");
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      await setLoginState(false);
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Logout Failed", "An error occurred during logout");
    }
  };

  const handleAbout = () => {
    Alert.alert(
      "About City Pulse",
      "City Pulse is a local events discovery app that helps you find exciting events in your area. Version 1.0.0"
    );
  };

  return (
    <View
      style={[
        styles.flex,
        styles["bg-gray-50"],
        isRTL ? styles.rtl : styles.ltr,
      ]}
    >
      {/* Header */}
      <View
        style={[
          styles["bg-white"],
          styles["pt-12"],
          styles["pb-6"],
          styles["px-4"],
          styles["shadow-sm"],
        ]}
      >
        <Text
          style={[
            styles["text-2xl"],
            styles["font-bold"],
            styles["text-gray-800"],
            styles["text-center"],
          ]}
        >
          {i18n.t("userProfile")}
        </Text>
      </View>

      <ScrollView style={styles.flex}>
        {/* User Info Section */}
        <View style={[styles["bg-white"], styles["p-6"], styles["mb-6"]]}>
          <View style={styles["items-center"]}>
            <View
              style={[
                styles["bg-primary-light"],
                styles["p-4"],
                styles.rounded,
                styles["mb-4"],
              ]}
            >
              <Ionicons name="person" size={48} color={colors.primary} />
            </View>
            <Text
              style={[
                styles["text-xl"],
                styles["font-bold"],
                styles["text-gray-800"],
                styles["mb-2"],
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {user ? `Welcome, ${user.name}!` : "Welcome to City Pulse"}
            </Text>
            {user && (
              <Text
                style={[
                  styles["text-gray-600"],
                  styles["text-center"],
                  styles["mb-2"],
                ]}
              >
                {user.email}
              </Text>
            )}
            <Text style={[styles["text-gray-600"], styles["text-center"]]}>
              Discover and explore local events in your area
            </Text>
          </View>
        </View>

        {/* Settings Section */}
        <View
          style={[
            styles["bg-white"],
            styles.rounded,
            styles["mx-4"],
            styles["mb-6"],
            styles["overflow-hidden"],
          ]}
        >
          <View style={[styles["bg-gray-50"], styles["px-4"], styles["py-3"]]}>
            <Text style={[styles["text-gray-600"], styles["font-medium"]]}>
              Preferences
            </Text>
          </View>

          <SettingItem
            icon="language"
            title={i18n.t("language")}
            subtitle={language === "en" ? i18n.t("english") : i18n.t("arabic")}
            onPress={handleLanguageChange}
            rightComponent={
              <View style={[styles["flex-row"], styles["items-center"]]}>
                <Text
                  style={[
                    styles["text-primary"],
                    styles["font-medium"],
                    styles["me-2"],
                  ]}
                >
                  {language === "en" ? "EN" : "AR"}
                </Text>
                <Ionicons
                  name={isRTL ? "chevron-back" : "chevron-forward"}
                  size={20}
                  color="#9CA3AF"
                />
              </View>
            }
            rtl={isRTL}
          />

          <SettingItem
            icon="color-palette"
            title={i18n.t("theme")}
            subtitle={theme === "light" ? i18n.t("light") : i18n.t("dark")}
            onPress={handleThemeChange}
            rightComponent={
              <Switch
                value={theme === "dark"}
                onValueChange={handleThemeChange}
                trackColor={{ false: "#D1D5DB", true: colors.primary }}
                thumbColor={"#FFFFFF"}
              />
            }
            rtl={isRTL}
          />

          <SettingItem
            icon="finger-print"
            title="Biometric Login"
            subtitle={
              biometricEnabled
                ? "Face ID / Touch ID enabled"
                : "Use Face ID or Touch ID to login"
            }
            onPress={handleBiometricToggle}
            rightComponent={
              <Switch
                value={biometricEnabled}
                onValueChange={handleBiometricToggle}
                trackColor={{ false: "#D1D5DB", true: colors.primary }}
                thumbColor={"#FFFFFF"}
              />
            }
            rtl={isRTL}
          />
        </View>

        {/* Favorites Section */}
        <View
          style={[
            styles["bg-white"],
            styles.rounded,
            styles["mx-4"],
            styles["mb-6"],
            styles["overflow-hidden"],
          ]}
        >
          <View style={[styles["bg-gray-50"], styles["px-4"], styles["py-3"]]}>
            <Text style={[styles["text-gray-600"], styles["font-medium"]]}>
              Favorites
            </Text>
          </View>

          <SettingItem
            icon="heart"
            title="Favorite Events"
            subtitle={`${favorites.length} events saved`}
            onPress={() => navigation.navigate("Favorites")}
            rightComponent={
              <View style={[styles["flex-row"], styles["items-center"]]}>
                <Text
                  style={[
                    styles["text-primary"],
                    styles["font-medium"],
                    styles["me-2"],
                  ]}
                >
                  {favorites.length}
                </Text>
                <Ionicons
                  name={isRTL ? "chevron-back" : "chevron-forward"}
                  size={20}
                  color="#9CA3AF"
                />
              </View>
            }
            rtl={isRTL}
          />

          {favorites.length > 0 && (
            <SettingItem
              icon="trash"
              title="Clear All Favorites"
              subtitle="Remove all saved events"
              onPress={handleClearFavorites}
              rightComponent={
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              }
              rtl={isRTL}
            />
          )}
        </View>

        {/* App Info Section */}
        <View
          style={[
            styles["bg-white"],
            styles.rounded,
            styles["mx-4"],
            styles["mb-6"],
            styles["overflow-hidden"],
          ]}
        >
          <View style={[styles["bg-gray-50"], styles["px-4"], styles["py-3"]]}>
            <Text style={[styles["text-gray-600"], styles["font-medium"]]}>
              App Information
            </Text>
          </View>

          <SettingItem
            icon="information-circle"
            title="About City Pulse"
            subtitle="Version 1.0.0"
            onPress={handleAbout}
            rtl={isRTL}
          />

          <SettingItem
            icon="log-out"
            title="Logout"
            subtitle="Sign out from this device"
            onPress={handleLogout}
            rtl={isRTL}
          />
        </View>

        {/* App Version */}
        <View style={[styles["items-center"], styles["py-6"]]}>
          <Text style={[styles["text-gray-500"], styles["text-sm"]]}>
            City Pulse v1.0.0
          </Text>
          <Text
            style={[styles["text-gray-400"], styles["text-xs"], styles["mt-1"]]}
          >
            © 2025 City Pulse. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
