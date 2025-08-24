import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

/**
 * Example component demonstrating the new theme system
 * This shows how to use theme-aware styling in other components
 */
const ThemeExample = () => {
  const { theme, colors, styles, componentStyles } = useTheme();

  return (
    <ScrollView style={[styles.flex, styles["bg-background"]]}>
      {/* Header Section */}
      <View style={componentStyles.header}>
        <Text
          style={[
            styles["text-2xl"],
            styles["font-bold"],
            styles["text-primary"],
          ]}
        >
          Theme System Demo
        </Text>
        <Text
          style={[
            styles["text-secondary"],
            styles["text-center"],
            styles["mt-2"],
          ]}
        >
          Current Theme: {theme.toUpperCase()}
        </Text>
      </View>

      {/* Color Palette Section */}
      <View style={componentStyles.section}>
        <View style={componentStyles.sectionHeader}>
          <Text style={[styles["text-secondary"], styles["font-medium"]]}>
            Color Palette
          </Text>
        </View>

        {/* Primary Colors */}
        <View
          style={[styles["p-4"], styles["border-b"], styles["border-light"]]}
        >
          <Text
            style={[
              styles["text-primary"],
              styles["font-semibold"],
              styles["mb-2"],
            ]}
          >
            Primary Colors
          </Text>
          <View style={styles["flex-row"]}>
            <View
              style={[
                styles["bg-primary"],
                styles["p-3"],
                styles.rounded,
                styles["me-2"],
              ]}
            >
              <Text style={[styles["text-white"], styles["text-xs"]]}>
                Primary
              </Text>
            </View>
            <View
              style={[
                styles["bg-primary-light"],
                styles["p-3"],
                styles.rounded,
                styles["me-2"],
              ]}
            >
              <Text style={[styles["text-primary"], styles["text-xs"]]}>
                Light
              </Text>
            </View>
            <View
              style={[styles["bg-primary-dark"], styles["p-3"], styles.rounded]}
            >
              <Text style={[styles["text-white"], styles["text-xs"]]}>
                Dark
              </Text>
            </View>
          </View>
        </View>

        {/* Secondary Colors */}
        <View
          style={[styles["p-4"], styles["border-b"], styles["border-light"]]}
        >
          <Text
            style={[
              styles["text-primary"],
              styles["font-semibold"],
              styles["mb-2"],
            ]}
          >
            Secondary Colors
          </Text>
          <View style={styles["flex-row"]}>
            <View
              style={[
                styles["bg-secondary"],
                styles["p-3"],
                styles.rounded,
                styles["me-2"],
              ]}
            >
              <Text style={[styles["text-white"], styles["text-xs"]]}>
                Secondary
              </Text>
            </View>
            <View
              style={[
                styles["bg-secondary-light"],
                styles["p-3"],
                styles.rounded,
              ]}
            >
              <Text style={[styles["text-secondary"], styles["text-xs"]]}>
                Light
              </Text>
            </View>
          </View>
        </View>

        {/* Status Colors */}
        <View style={styles["p-4"]}>
          <Text
            style={[
              styles["text-primary"],
              styles["font-semibold"],
              styles["mb-2"],
            ]}
          >
            Status Colors
          </Text>
          <View style={styles["flex-row"]}>
            <View
              style={[
                styles["bg-success"],
                styles["p-3"],
                styles.rounded,
                styles["me-2"],
              ]}
            >
              <Text style={[styles["text-white"], styles["text-xs"]]}>
                Success
              </Text>
            </View>
            <View
              style={[
                styles["bg-warning"],
                styles["p-3"],
                styles.rounded,
                styles["me-2"],
              ]}
            >
              <Text style={[styles["text-white"], styles["text-xs"]]}>
                Warning
              </Text>
            </View>
            <View
              style={[
                styles["bg-error"],
                styles["p-3"],
                styles.rounded,
                styles["me-2"],
              ]}
            >
              <Text style={[styles["text-white"], styles["text-xs"]]}>
                Error
              </Text>
            </View>
            <View style={[styles["bg-info"], styles["p-3"], styles.rounded]}>
              <Text style={[styles["text-white"], styles["text-xs"]]}>
                Info
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Component Examples Section */}
      <View style={componentStyles.section}>
        <View style={componentStyles.sectionHeader}>
          <Text style={[styles["text-secondary"], styles["font-medium"]]}>
            Component Examples
          </Text>
        </View>

        {/* Buttons */}
        <View
          style={[styles["p-4"], styles["border-b"], styles["border-light"]]}
        >
          <Text
            style={[
              styles["text-primary"],
              styles["font-semibold"],
              styles["mb-3"],
            ]}
          >
            Buttons
          </Text>
          <View style={styles["space-y-3"]}>
            <TouchableOpacity style={componentStyles.button}>
              <Text style={componentStyles.buttonText}>Primary Button</Text>
            </TouchableOpacity>
            <TouchableOpacity style={componentStyles.buttonSecondary}>
              <Text style={componentStyles.buttonTextSecondary}>
                Secondary Button
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={componentStyles.buttonOutline}>
              <Text style={componentStyles.buttonTextOutline}>
                Outline Button
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cards */}
        <View
          style={[styles["p-4"], styles["border-b"], styles["border-light"]]}
        >
          <Text
            style={[
              styles["text-primary"],
              styles["font-semibold"],
              styles["mb-3"],
            ]}
          >
            Cards
          </Text>
          <View style={styles["space-y-3"]}>
            <View style={componentStyles.card}>
              <Text style={[styles["text-primary"], styles["font-medium"]]}>
                Basic Card
              </Text>
              <Text style={[styles["text-secondary"], styles["mt-1"]]}>
                This is a basic card with theme-aware styling.
              </Text>
            </View>
            <View style={componentStyles.cardElevated}>
              <Text style={[styles["text-primary"], styles["font-medium"]]}>
                Elevated Card
              </Text>
              <Text style={[styles["text-secondary"], styles["mt-1"]]}>
                This card has enhanced shadows for depth.
              </Text>
            </View>
          </View>
        </View>

        {/* Inputs */}
        <View style={styles["p-4"]}>
          <Text
            style={[
              styles["text-primary"],
              styles["font-semibold"],
              styles["mb-3"],
            ]}
          >
            Inputs
          </Text>
          <View style={styles["space-y-3"]}>
            <View style={componentStyles.input}>
              <Text style={[styles["text-secondary"], styles["text-sm"]]}>
                Default Input
              </Text>
            </View>
            <View style={componentStyles.inputFocused}>
              <Text style={[styles["text-secondary"], styles["text-sm"]]}>
                Focused Input
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Typography Section */}
      <View style={componentStyles.section}>
        <View style={componentStyles.sectionHeader}>
          <Text style={[styles["text-secondary"], styles["font-medium"]]}>
            Typography Scale
          </Text>
        </View>
        <View style={styles["p-4"]}>
          <Text
            style={[
              styles["text-display"],
              styles["text-primary"],
              styles["mb-2"],
            ]}
          >
            Display Text
          </Text>
          <Text
            style={[
              styles["text-headline"],
              styles["text-primary"],
              styles["mb-2"],
            ]}
          >
            Headline Text
          </Text>
          <Text
            style={[
              styles["text-title"],
              styles["text-primary"],
              styles["mb-2"],
            ]}
          >
            Title Text
          </Text>
          <Text
            style={[
              styles["text-subtitle"],
              styles["text-primary"],
              styles["mb-2"],
            ]}
          >
            Subtitle Text
          </Text>
          <Text
            style={[
              styles["text-body"],
              styles["text-primary"],
              styles["mb-2"],
            ]}
          >
            Body Text
          </Text>
          <Text
            style={[
              styles["text-caption"],
              styles["text-secondary"],
              styles["mb-2"],
            ]}
          >
            Caption Text
          </Text>
          <Text style={[styles["text-overline"], styles["text-secondary"]]}>
            Overline Text
          </Text>
        </View>
      </View>

      {/* Spacing Section */}
      <View style={componentStyles.section}>
        <View style={componentStyles.sectionHeader}>
          <Text style={[styles["text-secondary"], styles["font-medium"]]}>
            Spacing Scale
          </Text>
        </View>
        <View style={styles["p-4"]}>
          <View style={styles["space-y-3"]}>
            <View
              style={[styles["bg-primary"], styles["h-4"], styles["w-4"]]}
            />
            <View
              style={[styles["bg-secondary"], styles["h-8"], styles["w-8"]]}
            />
            <View
              style={[styles["bg-accent"], styles["h-16"], styles["w-16"]]}
            />
            <View style={[styles["bg-info"], styles["h-24"], styles["w-24"]]} />
            <View
              style={[styles["bg-warning"], styles["h-32"], styles["w-32"]]}
            />
          </View>
        </View>
      </View>

      {/* Theme Info */}
      <View style={[styles["p-6"], styles["items-center"]]}>
        <Text style={[styles["text-secondary"], styles["text-center"]]}>
          This component demonstrates all the available theme utilities
        </Text>
        <Text
          style={[styles["text-hint"], styles["text-center"], styles["mt-2"]]}
        >
          Switch themes in the Profile screen to see changes
        </Text>
      </View>
    </ScrollView>
  );
};

export default ThemeExample;
