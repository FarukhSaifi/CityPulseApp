// Theme color definitions
export const lightTheme = {
  // Primary colors
  primary: {
    main: "#5B3CFB",
    light: "#E9E5FF",
    dark: "#4F37E8",
    darker: "#402FCB",
    contrast: "#FFFFFF",
  },

  // Secondary colors
  secondary: {
    main: "#10B981",
    light: "#D1FAE5",
    dark: "#059669",
    contrast: "#FFFFFF",
  },

  // Accent colors
  accent: {
    main: "#F59E0B",
    light: "#FEF3C7",
    dark: "#D97706",
    contrast: "#FFFFFF",
  },

  // Background colors
  background: {
    default: "#F8FAFC",
    paper: "#FFFFFF",
    surface: "#FFFFFF",
    elevated: "#FFFFFF",
  },

  // Text colors
  text: {
    primary: "#1F2937",
    secondary: "#6B7280",
    disabled: "#9CA3AF",
    hint: "#9CA3AF",
    inverse: "#FFFFFF",
  },

  // Border colors
  border: {
    light: "#E5E7EB",
    main: "#D1D5DB",
    dark: "#9CA3AF",
    focus: "#5B3CFB",
  },

  // Status colors
  success: {
    main: "#10B981",
    light: "#D1FAE5",
    dark: "#059669",
    contrast: "#FFFFFF",
  },

  warning: {
    main: "#F59E0B",
    light: "#FEF3C7",
    dark: "#D97706",
    contrast: "#FFFFFF",
  },

  error: {
    main: "#EF4444",
    light: "#FEE2E2",
    dark: "#DC2626",
    contrast: "#FFFFFF",
  },

  info: {
    main: "#3B82F6",
    light: "#DBEAFE",
    dark: "#1D4ED8",
    contrast: "#FFFFFF",
  },

  // Gray scale
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  // Common colors
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
};

export const darkTheme = {
  // Primary colors
  primary: {
    main: "#7C3AED",
    light: "#A78BFA",
    dark: "#5B21B6",
    darker: "#4C1D95",
    contrast: "#FFFFFF",
  },

  // Secondary colors
  secondary: {
    main: "#34D399",
    light: "#6EE7B7",
    dark: "#059669",
    contrast: "#000000",
  },

  // Accent colors
  accent: {
    main: "#FBBF24",
    light: "#FCD34D",
    dark: "#F59E0B",
    contrast: "#000000",
  },

  // Background colors
  background: {
    default: "#0F172A",
    paper: "#1E293B",
    surface: "#334155",
    elevated: "#475569",
  },

  // Text colors
  text: {
    primary: "#F1F5F9",
    secondary: "#CBD5E1",
    disabled: "#64748B",
    hint: "#64748B",
    inverse: "#0F172A",
  },

  // Border colors
  border: {
    light: "#475569",
    main: "#64748B",
    dark: "#94A3B8",
    focus: "#7C3AED",
  },

  // Status colors
  success: {
    main: "#34D399",
    light: "#6EE7B7",
    dark: "#059669",
    contrast: "#000000",
  },

  warning: {
    main: "#FBBF24",
    light: "#FCD34D",
    dark: "#F59E0B",
    contrast: "#000000",
  },

  error: {
    main: "#F87171",
    light: "#FECACA",
    dark: "#DC2626",
    contrast: "#000000",
  },

  info: {
    main: "#60A5FA",
    light: "#93C5FD",
    dark: "#2563EB",
    contrast: "#000000",
  },

  // Gray scale (dark theme adjusted)
  gray: {
    50: "#0F172A",
    100: "#1E293B",
    200: "#334155",
    300: "#475569",
    400: "#64748B",
    500: "#94A3B8",
    600: "#CBD5E1",
    700: "#E2E8F0",
    800: "#F1F5F9",
    900: "#F8FAFC",
  },

  // Common colors
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
};

// Theme-aware color getter
export const getThemeColors = (theme) => {
  return theme === "dark" ? darkTheme : lightTheme;
};

// Common spacing values
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
};

// Typography scale
export const typography = {
  xs: { fontSize: 12, lineHeight: 16 },
  sm: { fontSize: 14, lineHeight: 20 },
  base: { fontSize: 16, lineHeight: 24 },
  lg: { fontSize: 18, lineHeight: 28 },
  xl: { fontSize: 20, lineHeight: 28 },
  "2xl": { fontSize: 24, lineHeight: 32 },
  "3xl": { fontSize: 30, lineHeight: 36 },
  "4xl": { fontSize: 36, lineHeight: 40 },
};

// Border radius values
export const borderRadius = {
  none: 0,
  sm: 2,
  base: 4,
  md: 6,
  lg: 8,
  xl: 12,
  "2xl": 16,
  "3xl": 24,
  full: 9999,
};

// Shadow definitions
export const shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 8,
  },
};

// Animation durations
export const animation = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
};

// Z-index scale
export const zIndex = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Export theme types for TypeScript-like usage
export const themeTypes = {
  light: "light",
  dark: "dark",
};
