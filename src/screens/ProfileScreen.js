import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useState } from "react";
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
import FirebaseStatus from "../components/FirebaseStatus";
import { useAppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import i18n from "../utils/i18n";

const SettingItem = ({
  icon,
  title,
  subtitle,
  onPress,
  rightComponent,
  rtl,
  styles,
  colors,
  componentStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        componentStyles.listItem,
        rtl && { flexDirection: "row-reverse" },
      ]}
    >
      <View
        style={[
          styles["flex-row"],
          styles["items-center"],
          styles["justify-between"],
          rtl && { flexDirection: "row-reverse" },
        ]}
      >
        <View
          style={[
            styles["flex-row"],
            styles["items-center"],
            styles.flex,
            rtl && { flexDirection: "row-reverse" },
          ]}
        >
          <View
            style={[
              componentStyles.iconContainer,
              rtl ? styles["ms-4"] : styles["me-4"],
            ]}
          >
            <Ionicons name={icon} size={24} color={colors.primary.main} />
          </View>
          <View style={[styles.flex, rtl && { alignItems: "flex-end" }]}>
            <Text
              style={[
                styles["text-primary"],
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
                  styles["text-secondary"],
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
            color={colors.text.secondary}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const { styles, colors, componentStyles, spacing } = useTheme();
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

  const [isSyncing, setIsSyncing] = useState(false);

  const handleLanguageChange = async () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setIsSyncing(true);
    try {
      await changeLanguage(newLanguage);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleThemeChange = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setIsSyncing(true);
    try {
      await changeTheme(newTheme);
    } finally {
      setIsSyncing(false);
    }
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
          setIsSyncing(true);
          try {
            await setBiometric(true);
            Alert.alert("Success", "Biometric login has been enabled!");
          } finally {
            setIsSyncing(false);
          }
        } else {
          Alert.alert(
            "Authentication Failed",
            "Please try again to enable biometric login."
          );
        }
      } else {
        // Disabling biometrics
        setIsSyncing(true);
        try {
          await setBiometric(false);
          Alert.alert("Disabled", "Biometric login has been disabled.");
        } finally {
          setIsSyncing(false);
        }
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
        styles["bg-background"],
        isRTL ? styles.rtl : styles.ltr,
      ]}
    >
      {/* Header */}
      <View style={componentStyles.header}>
        <Text
          style={[
            styles["text-2xl"],
            styles["font-bold"],
            styles["text-primary"],
            styles["text-center"],
          ]}
        >
          {i18n.t("userProfile")}
        </Text>
      </View>

      <ScrollView style={styles.flex}>
        {/* User Info Section */}
        <View style={[componentStyles.card, styles["mb-6"]]}>
          <View style={styles["items-center"]}>
            <View
              style={[
                componentStyles.iconContainer,
                styles["m-4"],
                { padding: spacing[4] },
              ]}
            >
              <Ionicons name="person" size={48} color={colors.primary.main} />
            </View>
            <Text
              style={[
                styles["text-xl"],
                styles["font-bold"],
                styles["text-primary"],
                styles["mb-2"],
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {user ? `Welcome, ${user.name}!` : "Welcome to City Pulse"}
            </Text>
            {user && (
              <Text
                style={[
                  styles["text-secondary"],
                  styles["text-center"],
                  styles["mb-2"],
                ]}
              >
                {user.email}
              </Text>
            )}
            <Text style={[styles["text-secondary"], styles["text-center"]]}>
              Discover and explore local events in your area
            </Text>
          </View>
        </View>

        {/* Firebase Status */}
        <FirebaseStatus />

        {/* Settings Section */}
        <View style={componentStyles.section}>
          <View style={componentStyles.sectionHeader}>
            <Text
              style={[
                styles["text-secondary"],
                styles["font-medium"],
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              Preferences
            </Text>
          </View>

          <SettingItem
            icon="language"
            title={i18n.t("language")}
            subtitle={
              isSyncing
                ? "Syncing..."
                : language === "en"
                ? i18n.t("english")
                : i18n.t("arabic")
            }
            onPress={handleLanguageChange}
            rightComponent={
              <View
                style={[
                  styles["flex-row"],
                  styles["items-center"],
                  isRTL && { flexDirection: "row-reverse" },
                ]}
              >
                {isSyncing && (
                  <View style={[isRTL ? styles["ms-2"] : styles["me-2"]]}>
                    <Text
                      style={[styles["text-primary-color"], styles["text-xs"]]}
                    >
                      🔄
                    </Text>
                  </View>
                )}
                <Text
                  style={[
                    styles["text-primary-color"],
                    styles["font-medium"],
                    isRTL ? styles["ms-2"] : styles["me-2"],
                  ]}
                >
                  {language === "en" ? "EN" : "AR"}
                </Text>
                <Ionicons
                  name={isRTL ? "chevron-back" : "chevron-forward"}
                  size={20}
                  color={colors.text.secondary}
                />
              </View>
            }
            rtl={isRTL}
            styles={styles}
            colors={colors}
            componentStyles={componentStyles}
          />

          <SettingItem
            icon="color-palette"
            title={i18n.t("theme")}
            subtitle={
              isSyncing
                ? "Syncing..."
                : theme === "light"
                ? i18n.t("light")
                : i18n.t("dark")
            }
            onPress={handleThemeChange}
            rightComponent={
              <View
                style={[
                  styles["flex-row"],
                  styles["items-center"],
                  isRTL && { flexDirection: "row-reverse" },
                ]}
              >
                {isSyncing && (
                  <View style={[isRTL ? styles["ms-2"] : styles["me-2"]]}>
                    <Text
                      style={[styles["text-primary-color"], styles["text-xs"]]}
                    >
                      🔄
                    </Text>
                  </View>
                )}
                <Switch
                  value={theme === "dark"}
                  onValueChange={handleThemeChange}
                  trackColor={{
                    false: colors.border.main,
                    true: colors.primary.main,
                  }}
                  thumbColor={colors.white}
                  disabled={isSyncing}
                />
              </View>
            }
            rtl={isRTL}
            styles={styles}
            colors={colors}
            componentStyles={componentStyles}
          />

          <SettingItem
            icon="finger-print"
            title="Biometric Login"
            subtitle={
              isSyncing
                ? "Syncing..."
                : biometricEnabled
                ? "Face ID / Touch ID enabled"
                : "Use Face ID or Touch ID to login"
            }
            onPress={handleBiometricToggle}
            rightComponent={
              <View
                style={[
                  styles["flex-row"],
                  styles["items-center"],
                  isRTL && { flexDirection: "row-reverse" },
                ]}
              >
                {isSyncing && (
                  <View style={[isRTL ? styles["ms-2"] : styles["me-2"]]}>
                    <Text
                      style={[styles["text-primary-color"], styles["text-xs"]]}
                    >
                      🔄
                    </Text>
                  </View>
                )}
                <Switch
                  value={biometricEnabled}
                  onValueChange={handleBiometricToggle}
                  trackColor={{
                    false: colors.border.main,
                    true: colors.primary.main,
                  }}
                  thumbColor={colors.white}
                  disabled={isSyncing}
                />
              </View>
            }
            rtl={isRTL}
            styles={styles}
            colors={colors}
            componentStyles={componentStyles}
          />
        </View>

        {/* Favorites Section */}
        <View style={componentStyles.section}>
          <View style={componentStyles.sectionHeader}>
            <Text
              style={[
                styles["text-secondary"],
                styles["font-medium"],
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              Favorites
            </Text>
          </View>

          <SettingItem
            icon="heart"
            title="Favorite Events"
            subtitle={`${favorites.length} events saved`}
            onPress={() => navigation.navigate("Favorites")}
            rightComponent={
              <View
                style={[
                  styles["flex-row"],
                  styles["items-center"],
                  isRTL && { flexDirection: "row-reverse" },
                ]}
              >
                <Text
                  style={[
                    styles["text-primary-color"],
                    styles["font-medium"],
                    isRTL ? styles["ms-2"] : styles["me-2"],
                  ]}
                >
                  {favorites.length}
                </Text>
                <Ionicons
                  name={isRTL ? "chevron-back" : "chevron-forward"}
                  size={20}
                  color={colors.text.secondary}
                />
              </View>
            }
            rtl={isRTL}
            styles={styles}
            colors={colors}
            componentStyles={componentStyles}
          />

          {favorites.length > 0 && (
            <SettingItem
              icon="trash"
              title="Clear All Favorites"
              subtitle="Remove all saved events"
              onPress={handleClearFavorites}
              rightComponent={
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color={colors.error.main}
                />
              }
              rtl={isRTL}
              styles={styles}
              colors={colors}
              componentStyles={componentStyles}
            />
          )}
        </View>

        {/* App Info Section */}
        <View style={componentStyles.section}>
          <View style={componentStyles.sectionHeader}>
            <Text
              style={[
                styles["text-secondary"],
                styles["font-medium"],
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              App Information
            </Text>
          </View>

          <SettingItem
            icon="information-circle"
            title="About City Pulse"
            subtitle="Version 1.0.0"
            onPress={handleAbout}
            rtl={isRTL}
            styles={styles}
            colors={colors}
            componentStyles={componentStyles}
          />

          <SettingItem
            icon="log-out"
            title="Logout"
            subtitle="Sign out from this device"
            onPress={handleLogout}
            rtl={isRTL}
            styles={styles}
            colors={colors}
            componentStyles={componentStyles}
          />
        </View>

        {/* App Version */}
        <View style={[styles["items-center"], styles["py-6"]]}>
          <Text
            style={[
              styles["text-secondary"],
              styles["text-sm"],
              { textAlign: isRTL ? "right" : "left" },
            ]}
          >
            City Pulse v1.0.0
          </Text>
          <Text
            style={[
              styles["text-hint"],
              styles["text-xs"],
              styles["mt-1"],
              { textAlign: isRTL ? "right" : "left" },
            ]}
          >
            © 2025 City Pulse. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
