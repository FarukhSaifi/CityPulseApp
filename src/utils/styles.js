import { StyleSheet } from "react-native";

// Colors
const colors = {
  primary: "#3B82F6",
  secondary: "#10B981",
  accent: "#F59E0B",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  text: "#1F2937",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  white: "#FFFFFF",
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
  blue: {
    100: "#DBEAFE",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
  },
  green: {
    500: "#10B981",
    600: "#059669",
  },
  red: {
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
  },
};

// Spacing
const spacing = {
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

// Typography
const typography = {
  xs: { fontSize: 12 },
  sm: { fontSize: 14 },
  base: { fontSize: 16 },
  lg: { fontSize: 18 },
  xl: { fontSize: 20 },
  "2xl": { fontSize: 24 },
  "3xl": { fontSize: 30 },
  "4xl": { fontSize: 36 },
};

// Common styles
export const styles = StyleSheet.create({
  // Layout
  flex: { flex: 1 },
  "flex-1": { flex: 1 },
  "flex-row": { flexDirection: "row" },
  "flex-col": { flexDirection: "column" },
  "items-center": { alignItems: "center" },
  "items-start": { alignItems: "flex-start" },
  "items-end": { alignItems: "flex-end" },
  "justify-center": { justifyContent: "center" },
  "justify-between": { justifyContent: "space-between" },
  "justify-start": { justifyContent: "flex-start" },
  "justify-end": { justifyContent: "flex-end" },

  // Spacing
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
  "mr-8": { marginRight: spacing[8] },

  // Background colors
  "bg-white": { backgroundColor: colors.white },
  "bg-gray-50": { backgroundColor: colors.gray[50] },
  "bg-gray-100": { backgroundColor: colors.gray[100] },
  "bg-gray-200": { backgroundColor: colors.gray[200] },
  "bg-blue-100": { backgroundColor: colors.blue[100] },
  "bg-blue-500": { backgroundColor: colors.blue[500] },
  "bg-blue-600": { backgroundColor: colors.blue[600] },
  "bg-blue-700": { backgroundColor: colors.blue[700] },
  "bg-blue-800": { backgroundColor: colors.blue[800] },
  "bg-green-500": { backgroundColor: colors.green[500] },
  "bg-green-600": { backgroundColor: colors.green[600] },
  "bg-red-100": { backgroundColor: colors.red[500] },
  "bg-red-500": { backgroundColor: colors.red[500] },
  "bg-red-600": { backgroundColor: colors.red[600] },
  "bg-red-700": { backgroundColor: colors.red[700] },
  "bg-transparent": { backgroundColor: "transparent" },

  // Text colors
  "text-white": { color: colors.white },
  "text-gray-400": { color: colors.gray[400] },
  "text-gray-500": { color: colors.gray[500] },
  "text-gray-600": { color: colors.gray[600] },
  "text-gray-700": { color: colors.gray[700] },
  "text-gray-800": { color: colors.gray[800] },
  "text-blue-600": { color: colors.blue[600] },
  "text-blue-500": { color: colors.blue[500] },
  "text-blue-800": { color: colors.blue[800] },
  "text-green-600": { color: colors.green[600] },
  "text-red-600": { color: colors.red[600] },
  "text-red-700": { color: colors.red[700] },

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
  "font-medium": { fontWeight: "500" },
  "font-semibold": { fontWeight: "600" },
  "font-bold": { fontWeight: "700" },

  // Borders
  border: { borderWidth: 1, borderColor: colors.border },
  "border-gray-100": { borderWidth: 1, borderColor: colors.gray[100] },
  "border-gray-300": { borderWidth: 1, borderColor: colors.gray[300] },
  "border-red-300": { borderWidth: 1, borderColor: colors.red[600] },
  "border-blue-500": { borderWidth: 1, borderColor: colors.blue[500] },
  "border-t": { borderTopWidth: 1, borderTopColor: colors.border },
  "border-b": { borderBottomWidth: 1, borderBottomColor: colors.border },

  // Border radius
  rounded: { borderRadius: 6 },
  "rounded-lg": { borderRadius: 8 },
  "rounded-full": { borderRadius: 9999 },

  // Shadows
  "shadow-sm": {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  // Opacity
  "opacity-50": { opacity: 0.5 },
  "opacity-80": { opacity: 0.8 },
  "opacity-90": { opacity: 0.9 },

  // Overflow
  "overflow-hidden": { overflow: "hidden" },

  // Self alignment
  "self-start": { alignSelf: "flex-start" },
  "self-center": { alignSelf: "center" },
  "self-end": { alignSelf: "flex-end" },

  // Text alignment
  "text-center": { textAlign: "center" },
  "text-left": { textAlign: "left" },
  "text-right": { textAlign: "right" },

  // Leading (line height)
  "leading-6": { lineHeight: 24 },

  // Width and height
  "w-full": { width: "100%" },
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
});

// Helper that accepts style objects directly
export const combineStyles = (...styleObjects) => {
  return styleObjects.filter(Boolean);
};

// Export colors for use in components
export { colors };
