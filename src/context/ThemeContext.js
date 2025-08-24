import React, { createContext, useContext, useMemo } from "react";
import { StyleSheet } from "react-native";
import {
  animation,
  borderRadius,
  getThemeColors,
  shadows,
  spacing,
  typography,
  zIndex,
} from "../utils/theme";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children, theme = "light" }) => {
  const colors = useMemo(() => {
    try {
      return getThemeColors(theme) || getThemeColors("light");
    } catch (error) {
      console.error("Error getting theme colors:", error);
      return getThemeColors("light");
    }
  }, [theme]);

  // Create theme-aware styles
  const themeStyles = useMemo(() => {
    try {
      if (!colors) {
        console.warn("Colors not available, using fallback styles");
        return StyleSheet.create({ flex: { flex: 1 } });
      }
      return StyleSheet.create({
        // Layout utilities
        flex: { flex: 1 },
        "flex-1": { flex: 1 },
        "flex-row": { flexDirection: "row" },
        "flex-col": { flexDirection: "column" },

        // Direction utilities
        rtl: { direction: "rtl" },
        ltr: { direction: "ltr" },

        // Alignment utilities
        "items-center": { alignItems: "center" },
        "items-start": { alignItems: "flex-start" },
        "items-end": { alignItems: "flex-end" },
        "justify-center": { justifyContent: "center" },
        "justify-between": { justifyContent: "space-between" },
        "justify-start": { justifyContent: "flex-start" },
        "justify-end": { justifyContent: "flex-end" },
        "self-start": { alignSelf: "flex-start" },
        "self-center": { alignSelf: "center" },
        "self-end": { alignSelf: "flex-end" },

        // Spacing utilities
        "p-0": { padding: spacing[0] },
        "p-1": { padding: spacing[1] },
        "p-2": { padding: spacing[2] },
        "p-3": { padding: spacing[3] },
        "p-4": { padding: spacing[4] },
        "p-5": { padding: spacing[5] },
        "p-6": { padding: spacing[6] },
        "p-8": { padding: spacing[8] },

        "px-1": { paddingHorizontal: spacing[1] },
        "px-2": { paddingHorizontal: spacing[2] },
        "px-3": { paddingHorizontal: spacing[3] },
        "px-4": { paddingHorizontal: spacing[4] },
        "px-6": { paddingHorizontal: spacing[6] },
        "px-8": { paddingHorizontal: spacing[8] },

        "py-1": { paddingVertical: spacing[1] },
        "py-2": { paddingVertical: spacing[2] },
        "py-3": { paddingVertical: spacing[3] },
        "py-4": { paddingVertical: spacing[4] },
        "py-6": { paddingVertical: spacing[6] },

        "m-0": { margin: spacing[0] },
        "m-1": { margin: spacing[1] },
        "m-2": { margin: spacing[2] },
        "m-3": { margin: spacing[3] },
        "m-4": { margin: spacing[4] },
        "m-5": { margin: spacing[5] },
        "m-6": { margin: spacing[6] },
        "m-8": { margin: spacing[8] },

        "mx-1": { marginHorizontal: spacing[1] },
        "mx-2": { marginHorizontal: spacing[2] },
        "mx-3": { marginHorizontal: spacing[3] },
        "mx-4": { marginHorizontal: spacing[4] },
        "mx-6": { marginHorizontal: spacing[6] },
        "mx-8": { marginHorizontal: spacing[8] },

        "my-1": { marginVertical: spacing[1] },
        "my-2": { marginVertical: spacing[2] },
        "my-3": { marginVertical: spacing[3] },
        "my-4": { marginVertical: spacing[4] },
        "my-6": { marginVertical: spacing[6] },
        "my-8": { marginVertical: spacing[8] },

        "mb-1": { marginBottom: spacing[1] },
        "mb-2": { marginBottom: spacing[2] },
        "mb-3": { marginBottom: spacing[3] },
        "mb-4": { marginBottom: spacing[4] },
        "mb-6": { marginBottom: spacing[6] },
        "mb-8": { marginBottom: spacing[8] },

        "mt-1": { marginTop: spacing[1] },
        "mt-2": { marginTop: spacing[2] },
        "mt-3": { marginTop: spacing[3] },
        "mt-4": { marginTop: spacing[4] },
        "mt-6": { marginTop: spacing[6] },
        "mt-8": { marginTop: spacing[8] },

        "ml-1": { marginLeft: spacing[1] },
        "ml-2": { marginLeft: spacing[2] },
        "ml-3": { marginLeft: spacing[3] },
        "ml-4": { marginLeft: spacing[4] },
        "ml-6": { marginLeft: spacing[6] },
        "ml-8": { marginLeft: spacing[8] },

        "mr-1": { marginRight: spacing[1] },
        "mr-2": { marginRight: spacing[2] },
        "mr-3": { marginRight: spacing[3] },
        "mr-4": { marginRight: spacing[4] },
        "mr-6": { marginRight: spacing[6] },
        "mr-8": { marginRight: spacing[6] },

        // RTL-aware spacing
        "ms-1": { marginStart: spacing[1] },
        "ms-2": { marginStart: spacing[2] },
        "ms-3": { marginStart: spacing[3] },
        "ms-4": { marginStart: spacing[4] },
        "ms-6": { marginStart: spacing[6] },
        "ms-8": { marginStart: spacing[8] },

        "me-1": { marginEnd: spacing[1] },
        "me-2": { marginEnd: spacing[2] },
        "me-3": { marginEnd: spacing[3] },
        "me-4": { marginEnd: spacing[4] },
        "me-6": { marginEnd: spacing[6] },
        "me-8": { marginEnd: spacing[8] },

        "ps-1": { paddingStart: spacing[1] },
        "ps-2": { paddingStart: spacing[2] },
        "ps-3": { paddingStart: spacing[3] },
        "ps-4": { paddingStart: spacing[4] },
        "pe-1": { paddingEnd: spacing[1] },
        "pe-2": { paddingEnd: spacing[2] },
        "pe-3": { paddingEnd: spacing[3] },
        "pe-4": { paddingEnd: spacing[4] },

        // Background colors
        "bg-primary": { backgroundColor: colors.primary.main },
        "bg-primary-light": { backgroundColor: colors.primary.light },
        "bg-primary-dark": { backgroundColor: colors.primary.dark },
        "bg-secondary": { backgroundColor: colors.secondary.main },
        "bg-secondary-light": { backgroundColor: colors.secondary.light },
        "bg-accent": { backgroundColor: colors.accent.main },
        "bg-accent-light": { backgroundColor: colors.accent.light },

        "bg-background": { backgroundColor: colors.background.default },
        "bg-paper": { backgroundColor: colors.background.paper },
        "bg-surface": { backgroundColor: colors.background.surface },
        "bg-elevated": { backgroundColor: colors.background.elevated },

        "bg-success": { backgroundColor: colors.success.main },
        "bg-success-light": { backgroundColor: colors.success.light },
        "bg-warning": { backgroundColor: colors.warning.main },
        "bg-warning-light": { backgroundColor: colors.warning.light },
        "bg-error": { backgroundColor: colors.error.main },
        "bg-error-light": { backgroundColor: colors.error.light },
        "bg-info": { backgroundColor: colors.info.main },
        "bg-info-light": { backgroundColor: colors.info.light },

        "bg-white": { backgroundColor: colors.white },
        "bg-black": { backgroundColor: colors.black },
        "bg-transparent": { backgroundColor: colors.transparent },

        // Gray backgrounds
        "bg-gray-50": { backgroundColor: colors.gray[50] },
        "bg-gray-100": { backgroundColor: colors.gray[100] },
        "bg-gray-200": { backgroundColor: colors.gray[200] },
        "bg-gray-300": { backgroundColor: colors.gray[300] },
        "bg-gray-400": { backgroundColor: colors.gray[400] },
        "bg-gray-500": { backgroundColor: colors.gray[500] },
        "bg-gray-600": { backgroundColor: colors.gray[600] },
        "bg-gray-700": { backgroundColor: colors.gray[700] },
        "bg-gray-800": { backgroundColor: colors.gray[800] },
        "bg-gray-900": { backgroundColor: colors.gray[900] },

        // Text colors
        "text-primary": { color: colors.text.primary },
        "text-secondary": { color: colors.text.secondary },
        "text-disabled": { color: colors.text.disabled },
        "text-hint": { color: colors.text.hint },
        "text-inverse": { color: colors.text.inverse },

        "text-primary-color": { color: colors.primary.main },
        "text-primary-dark": { color: colors.primary.dark },
        "text-secondary-color": { color: colors.secondary.main },
        "text-accent": { color: colors.accent.main },

        "text-success": { color: colors.success.main },
        "text-warning": { color: colors.warning.main },
        "text-error": { color: colors.error.main },
        "text-info": { color: colors.info.main },

        "text-white": { color: colors.white },
        "text-black": { color: colors.black },

        // Gray text colors
        "text-gray-400": { color: colors.gray[400] },
        "text-gray-500": { color: colors.gray[500] },
        "text-gray-600": { color: colors.gray[600] },
        "text-gray-700": { color: colors.gray[700] },
        "text-gray-800": { color: colors.gray[800] },

        // Typography
        "text-xs": { ...typography.xs },
        "text-sm": { ...typography.sm },
        "text-base": { ...typography.base },
        "text-lg": { ...typography.lg },
        "text-xl": { ...typography.xl },
        "text-2xl": { ...typography["2xl"] },
        "text-3xl": { ...typography["3xl"] },
        "text-4xl": { ...typography["4xl"] },

        // Font weights
        "font-normal": { fontWeight: "400" },
        "font-medium": { fontWeight: "500" },
        "font-semibold": { fontWeight: "600" },
        "font-bold": { fontWeight: "700" },

        // Text alignment
        "text-center": { textAlign: "center" },
        "text-left": { textAlign: "left" },
        "text-right": { textAlign: "right" },

        // Borders
        border: { borderWidth: 1, borderColor: colors.border.main },
        "border-light": { borderWidth: 1, borderColor: colors.border.light },
        "border-dark": { borderWidth: 1, borderColor: colors.border.dark },
        "border-focus": { borderWidth: 1, borderColor: colors.border.focus },

        "border-primary": { borderWidth: 1, borderColor: colors.primary.main },
        "border-secondary": {
          borderWidth: 1,
          borderColor: colors.secondary.main,
        },
        "border-success": { borderWidth: 1, borderColor: colors.success.main },
        "border-warning": { borderWidth: 1, borderColor: colors.warning.main },
        "border-error": { borderWidth: 1, borderColor: colors.error.main },
        "border-info": { borderWidth: 1, borderColor: colors.info.main },

        "border-t": { borderTopWidth: 1, borderTopColor: colors.border.main },
        "border-b": {
          borderBottomWidth: 1,
          borderBottomColor: colors.border.main,
        },
        "border-l": { borderLeftWidth: 1, borderLeftColor: colors.border.main },
        "border-r": {
          borderRightWidth: 1,
          borderRightColor: colors.border.main,
        },

        // Gray borders
        "border-gray-100": { borderWidth: 1, borderColor: colors.gray[100] },
        "border-gray-200": { borderWidth: 1, borderColor: colors.gray[200] },
        "border-gray-300": { borderWidth: 1, borderColor: colors.gray[300] },
        "border-gray-400": { borderWidth: 1, borderColor: colors.gray[400] },

        // Border radius
        "rounded-none": { borderRadius: borderRadius.none },
        "rounded-sm": { borderRadius: borderRadius.sm },
        rounded: { borderRadius: borderRadius.base },
        "rounded-md": { borderRadius: borderRadius.md },
        "rounded-lg": { borderRadius: borderRadius.lg },
        "rounded-xl": { borderRadius: borderRadius.xl },
        "rounded-2xl": { borderRadius: borderRadius["2xl"] },
        "rounded-3xl": { borderRadius: borderRadius["3xl"] },
        "rounded-full": { borderRadius: borderRadius.full },

        // Shadows
        "shadow-none": shadows.none,
        "shadow-sm": shadows.sm,
        "shadow-md": shadows.md,
        "shadow-lg": shadows.lg,
        "shadow-xl": shadows.xl,

        // Overflow
        "overflow-hidden": { overflow: "hidden" },
        "overflow-visible": { overflow: "visible" },
        "overflow-scroll": { overflow: "scroll" },

        // Width and height
        "w-full": { width: "100%" },
        "w-auto": { width: "auto" },
        "h-full": { height: "100%" },
        "h-auto": { height: "auto" },

        // Specific dimensions
        "h-40": { height: 160 },
        "h-64": { height: 256 },

        // Position
        "pt-12": { paddingTop: 48 },
        "pb-4": { paddingBottom: 16 },
        "pb-6": { paddingBottom: 24 },

        // Additional spacing utilities
        "space-y-4": { marginBottom: spacing[4] },
        "mt-16": { marginTop: 64 },
        "py-20": { paddingVertical: spacing[20] },

        // Opacity
        "opacity-0": { opacity: 0 },
        "opacity-25": { opacity: 0.25 },
        "opacity-50": { opacity: 0.5 },
        "opacity-75": { opacity: 0.75 },
        "opacity-100": { opacity: 1 },

        // Z-index
        "z-0": { zIndex: zIndex.base },
        "z-10": { zIndex: zIndex.docked },
        "z-20": { zIndex: zIndex.dropdown },
        "z-30": { zIndex: zIndex.sticky },
        "z-40": { zIndex: zIndex.banner },
        "z-50": { zIndex: zIndex.overlay },
      });
    } catch (error) {
      console.error("Error creating theme styles:", error);
      return StyleSheet.create({ flex: { flex: 1 } });
    }
  }, [colors]);

  // Create theme-aware component styles
  const componentStyles = useMemo(() => {
    try {
      return StyleSheet.create({
        // Card styles
        card: {
          backgroundColor: colors.background.paper,
          borderRadius: borderRadius.base,
          padding: spacing[6],
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        },
        // Header styles
        header: {
          backgroundColor: colors.background.paper,
          paddingTop: spacing[12],
          paddingBottom: spacing[4],
          paddingHorizontal: spacing[4],
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        },
        // Button styles
        button: {
          backgroundColor: colors.primary.main,
          borderRadius: borderRadius.base,
          paddingVertical: spacing[3],
          alignItems: "center",
        },
        buttonText: {
          color: colors.white,
          fontWeight: "600",
          fontSize: 16,
        },
        // Input styles
        input: {
          borderWidth: 1,
          borderColor: colors.border.main,
          borderRadius: borderRadius.base,
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[3],
          backgroundColor: colors.background.paper,
          color: colors.text.primary,
        },
        // Section styles
        section: {
          marginBottom: spacing[6],
        },
        sectionHeader: {
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[3],
          borderBottomWidth: 1,
          borderBottomColor: colors.border.light,
        },
        // List item styles
        listItem: {
          backgroundColor: colors.background.paper,
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[4],
          borderBottomWidth: 1,
          borderBottomColor: colors.border.light,
        },
        // Icon container styles
        iconContainer: {
          backgroundColor: colors.primary.light,
          borderRadius: borderRadius.full,
          padding: spacing[2],
          alignItems: "center",
          justifyContent: "center",
        },
        // Avatar styles
        avatar: {
          width: 40,
          height: 40,
          borderRadius: borderRadius.full,
          backgroundColor: colors.primary.light,
          alignItems: "center",
          justifyContent: "center",
        },
        // Badge styles
        badge: {
          backgroundColor: colors.primary.light,
          paddingHorizontal: spacing[2],
          paddingVertical: spacing[1],
          borderRadius: borderRadius.full,
        },
        // Divider styles
        divider: {
          height: 1,
          backgroundColor: colors.border.light,
          marginVertical: spacing[2],
        },
        // Spacer styles
        spacer: {
          height: spacing[4],
        },
      });
    } catch (error) {
      console.error("Error creating component styles:", error);
      return {};
    }
  }, [colors]);

  const value = useMemo(
    () => ({
      theme,
      colors,
      spacing,
      typography,
      borderRadius,
      shadows,
      animation,
      zIndex,
      styles: themeStyles,
      componentStyles,

      // Helper functions
      getColor: (colorPath) => {
        const path = colorPath.split(".");
        let value = colors;
        for (const key of path) {
          value = value[key];
          if (!value) break;
        }
        return value;
      },

      // Theme-aware color getters
      isDark: theme === "dark",
      isLight: theme === "light",
    }),
    [theme, colors, themeStyles, componentStyles]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
