import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import i18n from "../utils/i18n";
import { styles } from "../utils/styles";

const SettingItem = ({ icon, title, subtitle, onPress, rightComponent }) => {
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
              styles["bg-blue-100"],
              styles["p-2"],
              styles.rounded,
              styles["mr-4"],
            ]}
          >
            <Ionicons name={icon} size={24} color="#3B82F6" />
          </View>
          <View style={styles.flex}>
            <Text
              style={[
                styles["text-gray-800"],
                styles["font-semibold"],
                styles["text-lg"],
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
                ]}
              >
                {subtitle}
              </Text>
            ) : null}
          </View>
        </View>
        {rightComponent || (
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const {
    language,
    changeLanguage,
    theme,
    changeTheme,
    favorites,
    clearFavorites,
  } = useAppContext();

  const handleLanguageChange = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    changeLanguage(newLanguage);
  };

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme);
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

  const handleAbout = () => {
    Alert.alert(
      "About City Pulse",
      "City Pulse is a local events discovery app that helps you find exciting events in your area. Version 1.0.0"
    );
  };

  return (
    <View style={[styles.flex, styles["bg-gray-50"]]}>
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
                styles["bg-blue-100"],
                styles["p-4"],
                styles.rounded,
                styles["mb-4"],
              ]}
            >
              <Ionicons name="person" size={48} color="#3B82F6" />
            </View>
            <Text
              style={[
                styles["text-xl"],
                styles["font-bold"],
                styles["text-gray-800"],
                styles["mb-2"],
              ]}
            >
              Welcome to City Pulse
            </Text>
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
                    styles["text-blue-600"],
                    styles["font-medium"],
                    styles["mr-2"],
                  ]}
                >
                  {language === "en" ? "EN" : "AR"}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            }
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
                trackColor={{ false: "#D1D5DB", true: "#3B82F6" }}
                thumbColor={"#FFFFFF"}
              />
            }
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
            onPress={() => {}}
            rightComponent={
              <View style={[styles["flex-row"], styles["items-center"]]}>
                <Text
                  style={[
                    styles["text-blue-600"],
                    styles["font-medium"],
                    styles["mr-2"],
                  ]}
                >
                  {favorites.length}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            }
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
