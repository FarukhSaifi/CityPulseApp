import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../bridge/hooks";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";

const SignupScreen = ({ navigation }) => {
  const { signup } = useAuth();
  const { isRTL } = useAppContext();
  const { styles, colors, componentStyles } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirm || !displayName) {
      Alert.alert("Sign Up", "Please fill all fields");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Sign Up", "Passwords do not match");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Sign Up", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signup(email.trim(), password, displayName.trim());
      if (result.success) {
        Alert.alert("Success", "Account created! You can login now.", [
          { text: "OK", onPress: () => navigation.replace("Login") },
        ]);
      } else {
        Alert.alert("Sign Up Failed", result.error);
      }
    } catch (error) {
      Alert.alert("Sign Up Failed", "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.flex,
        styles["bg-background"],
        isRTL ? styles.rtl : styles.ltr,
      ]}
    >
      <LinearGradient
        colors={[colors.primary.main, colors.primary.dark]}
        style={[
          styles["h-40"],
          styles["justify-end"],
          styles["px-4"],
          styles["pb-6"],
        ]}
      >
        <Text
          style={[
            styles["text-white"],
            styles["text-3xl"],
            styles["font-bold"],
          ]}
        >
          Create Account
        </Text>
        <Text
          style={[styles["text-white"], styles["opacity-80"], styles["mt-1"]]}
        >
          It only takes a minute
        </Text>
      </LinearGradient>

      <View style={[componentStyles.card, styles["mx-4"], styles["mt-4"]]}>
        <View
          style={[
            styles["mb-3"],
            styles["flex-row"],
            styles["items-center"],
            componentStyles.input,
          ]}
        >
          <Ionicons
            name="person-outline"
            size={20}
            color={colors.text.secondary}
          />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={colors.text.hint}
            autoCapitalize="words"
            value={displayName}
            onChangeText={setDisplayName}
            style={[
              styles.flex,
              styles["ms-3"],
              { color: colors.text.primary },
            ]}
            textAlign={isRTL ? "right" : "left"}
          />
        </View>

        <View
          style={[
            styles["mb-3"],
            styles["flex-row"],
            styles["items-center"],
            styles.border,
            styles["border-gray-300"],
            styles.rounded,
            styles["px-4"],
            styles["py-3"],
          ]}
        >
          <Ionicons
            name="mail-outline"
            size={20}
            color={colors.text.secondary}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.text.hint}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={[
              styles.flex,
              styles["ms-3"],
              { color: colors.text.primary },
            ]}
            textAlign={isRTL ? "right" : "left"}
          />
        </View>

        <View
          style={[
            styles["mb-1"],
            styles["flex-row"],
            styles["items-center"],
            componentStyles.input,
          ]}
        >
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={colors.text.secondary}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.text.hint}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[
              styles.flex,
              styles["ms-3"],
              { color: colors.text.primary },
            ]}
            textAlign={isRTL ? "right" : "left"}
          />
        </View>

        <View
          style={[
            styles["mb-1"],
            styles["flex-row"],
            styles["items-center"],
            componentStyles.input,
          ]}
        >
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={colors.text.secondary}
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={colors.text.hint}
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
            style={[
              styles.flex,
              styles["ms-3"],
              { color: colors.text.primary },
            ]}
            textAlign={isRTL ? "right" : "left"}
          />
        </View>

        <TouchableOpacity
          onPress={handleSignup}
          style={[
            componentStyles.button,
            styles["mt-3"],
            isLoading && styles["opacity-50"],
          ]}
          disabled={isLoading}
        >
          <Text style={componentStyles.buttonText}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Text>
        </TouchableOpacity>

        <View style={[styles["items-center"], styles["mt-4"]]}>
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text
              style={[
                styles["text-primary-color"],
                styles["font-medium"],
                styles["mt-1"],
              ]}
            >
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;
