import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { combineStyles, styles } from "../utils/styles";

const Button = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  style = {},
  ...props
}) => {
  const baseStyles = [
    styles["rounded-lg"],
    styles["items-center"],
    styles["justify-center"],
  ];

  const variantStyles = {
    primary: styles["bg-primary"],
    secondary: styles["bg-gray-500"],
    success: styles["bg-green-500"],
    danger: styles["bg-red-500"],
    outline: combineStyles(
      styles["bg-transparent"],
      styles.border,
      styles["border-primary"]
    ),
  };

  const sizeStyles = {
    small: combineStyles(styles["px-4"], styles["py-2"]),
    medium: combineStyles(styles["px-6"], styles["py-3"]),
    large: combineStyles(styles["px-8"], styles["py-4"]),
  };

  const textVariantStyles = {
    primary: combineStyles(styles["text-white"], styles["font-semibold"]),
    secondary: combineStyles(styles["text-white"], styles["font-semibold"]),
    success: combineStyles(styles["text-white"], styles["font-semibold"]),
    danger: combineStyles(styles["text-white"], styles["font-semibold"]),
    outline: combineStyles(styles["text-primary"], styles["font-semibold"]),
  };

  const textSizeStyles = {
    small: styles["text-sm"],
    medium: styles["text-base"],
    large: styles["text-lg"],
  };

  const disabledStyles = disabled ? styles["opacity-50"] : {};

  const combinedButtonStyles = [
    ...baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabledStyles,
    style,
  ];

  const combinedTextStyles = [textVariantStyles[variant], textSizeStyles[size]];

  return (
    <TouchableOpacity
      style={combinedButtonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={combinedTextStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
