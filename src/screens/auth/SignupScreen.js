import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  ensureFirebase,
  firebaseAuth,
  isFirebaseConfigured,
} from "../../bridge/firebase";
import { useAuth } from "../../bridge/hooks";
import { gradients, styles } from "../../utils/styles";

const SignupScreen = ({ navigation }) => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirm) {
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
      // Try Firebase first if configured
      if (isFirebaseConfigured()) {
        try {
          ensureFirebase();
          const auth = firebaseAuth();
          await createUserWithEmailAndPassword(auth, email.trim(), password);
          Alert.alert("Success", "Account created! You can login now.", [
            { text: "OK", onPress: () => navigation.replace("Login") },
          ]);
          return;
        } catch (e) {
          // Firebase failed, fall back to mock
        }
      }

      // Try mock signup
      const result = await signup(email.trim(), password);
      if (result.success) {
        Alert.alert("Success", "Mock account created! You can login now.", [
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
    <View style={[styles.flex, styles["bg-gray-50"]]}>
      <LinearGradient
        colors={gradients.primary}
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

      <View
        style={[
          styles["bg-white"],
          styles.rounded,
          styles["p-6"],
          styles["mx-4"],
          styles["mt-4"],
          styles["shadow-sm"],
        ]}
      >
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
          <Ionicons name="mail-outline" size={20} color="#6B7280" />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={[styles.flex, styles["ml-3"]]}
          />
        </View>

        <View
          style={[
            styles["mb-1"],
            styles["flex-row"],
            styles["items-center"],
            styles.border,
            styles["border-gray-300"],
            styles.rounded,
            styles["px-4"],
            styles["py-3"],
          ]}
        >
          <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[styles.flex, styles["ml-3"]]}
          />
        </View>

        <View
          style={[
            styles["mb-1"],
            styles["flex-row"],
            styles["items-center"],
            styles.border,
            styles["border-gray-300"],
            styles.rounded,
            styles["px-4"],
            styles["py-3"],
          ]}
        >
          <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
            style={[styles.flex, styles["ml-3"]]}
          />
        </View>

        <TouchableOpacity
          onPress={handleSignup}
          style={[
            styles["bg-primary"],
            styles.rounded,
            styles["py-3"],
            styles["items-center"],
            styles["mt-3"],
            isLoading && styles["opacity-50"],
          ]}
          disabled={isLoading}
        >
          <Text style={[styles["text-white"], styles["font-semibold"]]}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Text>
        </TouchableOpacity>

        <View style={[styles["items-center"], styles["mt-4"]]}>
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text
              style={[
                styles["text-primary"],
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
