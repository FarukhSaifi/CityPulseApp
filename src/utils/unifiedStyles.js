import { StyleSheet } from "react-native";
import {
  animation,
  borderRadius,
  getThemeColors,
  shadows,
  spacing,
  typography,
  zIndex,
} from "./theme";

// Unified styling system for the entire app
// This file provides a centralized place for all styling, similar to Material UI or Tailwind CSS

// Base theme colors (can be overridden by ThemeContext)
const baseColors = getThemeColors("light");

// Unified spacing scale
export const unifiedSpacing = {
  ...spacing,
  // Additional spacing values
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Unified typography scale
export const unifiedTypography = {
  ...typography,
  // Additional text styles
  display: { fontSize: 48, lineHeight: 56, fontWeight: "700" },
  headline: { fontSize: 32, lineHeight: 40, fontWeight: "600" },
  title: { fontSize: 24, lineHeight: 32, fontWeight: "600" },
  subtitle: { fontSize: 18, lineHeight: 26, fontWeight: "500" },
  body: { fontSize: 16, lineHeight: 24, fontWeight: "400" },
  caption: { fontSize: 14, lineHeight: 20, fontWeight: "400" },
  overline: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    textTransform: "uppercase",
  },
};

// Unified border radius scale
export const unifiedBorderRadius = {
  ...borderRadius,
  // Additional radius values
  card: 12,
  button: 8,
  input: 6,
  avatar: 20,
  badge: 12,
};

// Unified shadow scale
export const unifiedShadows = {
  ...shadows,
  // Additional shadow values
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  button: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  modal: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
};

// Unified animation scale
export const unifiedAnimation = {
  ...animation,
  // Additional animation values
  bounce: 600,
  elastic: 800,
  spring: 400,
};

// Unified z-index scale
export const unifiedZIndex = {
  ...zIndex,
  // Additional z-index values
  card: 100,
  button: 200,
  modal: 1000,
  tooltip: 1100,
  notification: 1200,
};

// Common component styles that can be used across the app
export const commonStyles = StyleSheet.create({
  // Layout containers
  container: {
    flex: 1,
    backgroundColor: baseColors.background.default,
  },

  safeArea: {
    flex: 1,
    backgroundColor: baseColors.background.default,
  },

  // Card styles
  card: {
    backgroundColor: baseColors.background.paper,
    borderRadius: unifiedBorderRadius.card,
    padding: unifiedSpacing.md,
    ...unifiedShadows.card,
    borderWidth: 1,
    borderColor: baseColors.border.light,
  },

  cardElevated: {
    backgroundColor: baseColors.background.paper,
    borderRadius: unifiedBorderRadius.card,
    padding: unifiedSpacing.md,
    ...unifiedShadows.md,
    borderWidth: 1,
    borderColor: baseColors.border.light,
  },

  // Button styles
  button: {
    backgroundColor: baseColors.primary.main,
    borderRadius: unifiedBorderRadius.button,
    paddingVertical: unifiedSpacing.sm,
    paddingHorizontal: unifiedSpacing.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    ...unifiedShadows.button,
  },

  buttonSecondary: {
    backgroundColor: baseColors.secondary.main,
    borderRadius: unifiedBorderRadius.button,
    paddingVertical: unifiedSpacing.sm,
    paddingHorizontal: unifiedSpacing.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    ...unifiedShadows.button,
  },

  buttonOutline: {
    backgroundColor: "transparent",
    borderRadius: unifiedBorderRadius.button,
    paddingVertical: unifiedSpacing.sm,
    paddingHorizontal: unifiedSpacing.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    borderWidth: 2,
    borderColor: baseColors.primary.main,
  },

  buttonText: {
    color: baseColors.primary.contrast,
    fontSize: unifiedTypography.body.fontSize,
    fontWeight: "600",
    textAlign: "center",
  },

  buttonTextSecondary: {
    color: baseColors.secondary.contrast,
    fontSize: unifiedTypography.body.fontSize,
    fontWeight: "600",
    textAlign: "center",
  },

  buttonTextOutline: {
    color: baseColors.primary.main,
    fontSize: unifiedTypography.body.fontSize,
    fontWeight: "600",
    textAlign: "center",
  },

  // Input styles
  input: {
    backgroundColor: baseColors.background.paper,
    borderWidth: 1,
    borderColor: baseColors.border.main,
    borderRadius: unifiedBorderRadius.input,
    paddingHorizontal: unifiedSpacing.sm,
    paddingVertical: unifiedSpacing.xs,
    fontSize: unifiedTypography.body.fontSize,
    color: baseColors.text.primary,
    minHeight: 44,
  },

  inputFocused: {
    backgroundColor: baseColors.background.paper,
    borderWidth: 2,
    borderColor: baseColors.border.focus,
    borderRadius: unifiedBorderRadius.input,
    paddingHorizontal: unifiedSpacing.sm,
    paddingVertical: unifiedSpacing.xs,
    fontSize: unifiedTypography.body.fontSize,
    color: baseColors.text.primary,
    minHeight: 44,
  },

  // Header styles
  header: {
    backgroundColor: baseColors.background.paper,
    paddingTop: 48,
    paddingBottom: unifiedSpacing.md,
    paddingHorizontal: unifiedSpacing.md,
    ...unifiedShadows.sm,
    borderBottomWidth: 1,
    borderBottomColor: baseColors.border.light,
  },

  // Section styles
  section: {
    backgroundColor: baseColors.background.paper,
    borderRadius: unifiedBorderRadius.card,
    marginHorizontal: unifiedSpacing.md,
    marginBottom: unifiedSpacing.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: baseColors.border.light,
  },

  sectionHeader: {
    backgroundColor: baseColors.background.default,
    paddingHorizontal: unifiedSpacing.md,
    paddingVertical: unifiedSpacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: baseColors.border.light,
  },

  // List item styles
  listItem: {
    backgroundColor: baseColors.background.paper,
    padding: unifiedSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: baseColors.border.light,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Icon container styles
  iconContainer: {
    backgroundColor: baseColors.primary.light,
    padding: unifiedSpacing.xs,
    borderRadius: unifiedBorderRadius.base,
    marginEnd: unifiedSpacing.md,
  },

  iconContainerSecondary: {
    backgroundColor: baseColors.secondary.light,
    padding: unifiedSpacing.xs,
    borderRadius: unifiedBorderRadius.base,
    marginEnd: unifiedSpacing.md,
  },

  // Avatar styles
  avatar: {
    width: 40,
    height: 40,
    borderRadius: unifiedBorderRadius.avatar,
    backgroundColor: baseColors.primary.light,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: unifiedBorderRadius.avatar * 2,
    backgroundColor: baseColors.primary.light,
    alignItems: "center",
    justifyContent: "center",
  },

  // Badge styles
  badge: {
    backgroundColor: baseColors.primary.main,
    borderRadius: unifiedBorderRadius.badge,
    paddingHorizontal: unifiedSpacing.xs,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: baseColors.primary.contrast,
    fontSize: unifiedTypography.caption.fontSize,
    fontWeight: "600",
  },

  // Divider styles
  divider: {
    height: 1,
    backgroundColor: baseColors.border.light,
    marginVertical: unifiedSpacing.sm,
  },

  // Spacer styles
  spacer: {
    height: unifiedSpacing.md,
  },

  spacerSmall: {
    height: unifiedSpacing.sm,
  },

  spacerLarge: {
    height: unifiedSpacing.lg,
  },

  // Flex utilities
  flex: { flex: 1 },
  flexRow: { flexDirection: "row" },
  flexCol: { flexDirection: "column" },

  // Alignment utilities
  itemsCenter: { alignItems: "center" },
  itemsStart: { alignItems: "flex-start" },
  itemsEnd: { alignItems: "flex-end" },
  justifyCenter: { justifyContent: "center" },
  justifyBetween: { justifyContent: "space-between" },
  justifyStart: { justifyContent: "flex-start" },
  justifyEnd: { justifyContent: "flex-end" },

  // Text alignment
  textCenter: { textAlign: "center" },
  textLeft: { textAlign: "left" },
  textRight: { textAlign: "right" },

  // Font weights
  fontNormal: { fontWeight: "400" },
  fontMedium: { fontWeight: "500" },
  fontSemibold: { fontWeight: "600" },
  fontBold: { fontWeight: "700" },

  // Opacity
  opacity50: { opacity: 0.5 },
  opacity75: { opacity: 0.75 },

  // Overflow
  overflowHidden: { overflow: "hidden" },
  overflowVisible: { overflow: "visible" },

  // Position
  absolute: { position: "absolute" },
  relative: { position: "relative" },

  // Z-index
  z10: { zIndex: 10 },
  z20: { zIndex: 20 },
  z30: { zIndex: 30 },
});

// Export all the unified values for use in components
export {
  unifiedAnimation as animation,
  unifiedBorderRadius as borderRadius,
  unifiedShadows as shadows,
  unifiedSpacing as spacing,
  unifiedTypography as typography,
  unifiedZIndex as zIndex,
};

// Helper function to create theme-aware styles
export const createThemeAwareStyles = (themeColors) => {
  return StyleSheet.create({
    // Override base colors with theme colors
    card: {
      ...commonStyles.card,
      backgroundColor: themeColors.background.paper,
      borderColor: themeColors.border.light,
    },

    button: {
      ...commonStyles.button,
      backgroundColor: themeColors.primary.main,
    },

    buttonSecondary: {
      ...commonStyles.buttonSecondary,
      backgroundColor: themeColors.secondary.main,
    },

    buttonOutline: {
      ...commonStyles.buttonOutline,
      borderColor: themeColors.primary.main,
    },

    buttonText: {
      ...commonStyles.buttonText,
      color: themeColors.primary.contrast,
    },

    buttonTextSecondary: {
      ...commonStyles.buttonTextSecondary,
      color: themeColors.secondary.contrast,
    },

    buttonTextOutline: {
      ...commonStyles.buttonTextOutline,
      color: themeColors.primary.main,
    },

    input: {
      ...commonStyles.input,
      backgroundColor: themeColors.background.paper,
      borderColor: themeColors.border.main,
      color: themeColors.text.primary,
    },

    inputFocused: {
      ...commonStyles.inputFocused,
      backgroundColor: themeColors.background.paper,
      borderColor: themeColors.border.focus,
      color: themeColors.text.primary,
    },

    header: {
      ...commonStyles.header,
      backgroundColor: themeColors.background.paper,
      borderBottomColor: themeColors.border.light,
    },

    section: {
      ...commonStyles.section,
      backgroundColor: themeColors.background.paper,
      borderColor: themeColors.border.light,
    },

    sectionHeader: {
      ...commonStyles.sectionHeader,
      backgroundColor: themeColors.background.default,
      borderBottomColor: themeColors.border.light,
    },

    listItem: {
      ...commonStyles.listItem,
      backgroundColor: themeColors.background.paper,
      borderBottomColor: themeColors.border.light,
    },

    iconContainer: {
      ...commonStyles.iconContainer,
      backgroundColor: themeColors.primary.light,
    },

    iconContainerSecondary: {
      ...commonStyles.iconContainerSecondary,
      backgroundColor: themeColors.secondary.light,
    },

    divider: {
      ...commonStyles.divider,
      backgroundColor: themeColors.border.light,
    },
  });
};
