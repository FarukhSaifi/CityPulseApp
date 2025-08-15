import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as LocalAuthentication from "expo-local-authentication";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ensureFirebase,
  firebaseAuth,
  isFirebaseConfigured,
} from "../../bridge/firebase";
import { useAuth } from "../../bridge/hooks";
import { useAppContext } from "../../context/AppContext";
import { gradients, styles } from "../../utils/styles";

const mockUser = { email: "demo@citypulse.app", password: "password123" };

const LoginScreen = ({ navigation }) => {
  const { biometricEnabled, setLoginState, setBiometric } = useAppContext();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkingBio, setCheckingBio] = useState(false);
  const [hasHardware, setHasHardware] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [biometricLabel, setBiometricLabel] = useState("Biometrics");

  const checkBiometricSupport = async () => {
    try {
      const has = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const types =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      setHasHardware(has);
      setEnrolled(isEnrolled);

      if (types && types.length > 0) {
        // Prioritize Face ID over fingerprint
        const hasFaceID = types.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        );
        const hasFingerprint = types.includes(
          LocalAuthentication.AuthenticationType.FINGERPRINT
        );

        if (hasFaceID) {
          setBiometricLabel("Face ID");
        } else if (hasFingerprint) {
          setBiometricLabel("Fingerprint");
        } else {
          setBiometricLabel("Biometrics");
        }
      }
    } catch (e) {
      console.error("Biometric check error:", e);
      setHasHardware(false);
      setEnrolled(false);
    }
  };

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  useEffect(() => {
    (async () => {
      if (!biometricEnabled) return;

      // Wait a bit for biometric support to be checked
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!hasHardware || !enrolled) return;

      setCheckingBio(true);
      try {
        const res = await LocalAuthentication.authenticateAsync({
          promptMessage: `Login with ${biometricLabel}`,
          disableDeviceFallback: false,
          fallbackLabel: "Use Passcode",
        });

        if (res.success) {
          await setLoginState(true);
          navigation.replace("MainTabs");
          return;
        }
        // Don't show error for cancelled attempts
      } catch (e) {
        console.error("Auto-biometric login error:", e);
      } finally {
        setCheckingBio(false);
      }
    })();
  }, [biometricEnabled, biometricLabel, navigation, hasHardware, enrolled]);

  const handleBiometricLogin = async () => {
    if (!hasHardware) {
      Alert.alert("Biometrics", "This device does not support biometrics.");
      return;
    }

    if (!enrolled) {
      Alert.alert(
        "Biometrics Not Set Up",
        `Please set up ${biometricLabel} in your device settings first.`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
      return;
    }

    setCheckingBio(true);
    try {
      const res = await LocalAuthentication.authenticateAsync({
        promptMessage: `Login with ${biometricLabel}`,
        disableDeviceFallback: false,
        fallbackLabel: "Use Passcode",
      });

      if (res.success) {
        await setLoginState(true);
        try {
          await setBiometric(true);
        } catch {}
        navigation.replace("MainTabs");
        return;
      } else if (res.error === "UserCancel") {
        // User cancelled, no need to show error
        return;
      } else if (res.error === "UserFallback") {
        // User chose to use passcode, show manual login
        Alert.alert(
          "Manual Login",
          "Please use your email and password to login."
        );
        return;
      }

      // Handle other authentication failures
      Alert.alert(
        "Authentication Failed",
        `Unable to authenticate with ${biometricLabel}. Please try again or use manual login.`
      );
    } catch (error) {
      console.error("Biometric authentication error:", error);
      Alert.alert(
        "Authentication Error",
        "An error occurred during biometric authentication. Please try again."
      );
    } finally {
      setCheckingBio(false);
    }
  };

  const handleLogin = async () => {
    const trimmed = email.trim();
    if (!trimmed || !password) {
      Alert.alert("Login", "Please enter email and password");
      return;
    }

    // Try Firebase first if configured
    if (isFirebaseConfigured()) {
      try {
        ensureFirebase();
        const auth = firebaseAuth();
        await signInWithEmailAndPassword(auth, trimmed, password);
        await setLoginState(true);
        navigation.replace("MainTabs");
        return;
      } catch (e) {
        const message = e?.message || "Unable to login with Firebase";
        Alert.alert("Login Failed", message);
      }
    }

    // Try mock authentication
    try {
      const result = await login(trimmed, password);
      if (result.success) {
        await setLoginState(true);
        navigation.replace("MainTabs");
      } else {
        Alert.alert("Login Failed", result.error);
      }
    } catch (error) {
      Alert.alert("Login Failed", "An error occurred during login");
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
          Welcome Back
        </Text>
        <Text
          style={[styles["text-white"], styles["opacity-80"], styles["mt-1"]]}
        >
          Sign in to continue
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

        <TouchableOpacity
          onPress={handleLogin}
          style={[
            styles["bg-primary"],
            styles.rounded,
            styles["py-3"],
            styles["items-center"],
            styles["mt-3"],
          ]}
          disabled={checkingBio}
        >
          <Text style={[styles["text-white"], styles["font-semibold"]]}>
            Login
          </Text>
        </TouchableOpacity>

        {hasHardware && (
          <TouchableOpacity
            onPress={handleBiometricLogin}
            style={[
              styles.border,
              styles["border-primary"],
              styles.rounded,
              styles["py-3"],
              styles["items-center"],
              styles["mt-3"],
            ]}
            disabled={checkingBio}
          >
            <Text style={[styles["font-semibold"], styles["text-primary"]]}>
              {`Login with ${biometricLabel}`}
            </Text>
            {!enrolled && (
              <Text
                style={[
                  styles["text-xs"],
                  styles["text-gray-500"],
                  styles["mt-1"],
                ]}
              >
                Not set up - tap to configure
              </Text>
            )}
          </TouchableOpacity>
        )}

        {/* Debug info - remove in production */}
        {__DEV__ && (
          <View
            style={[
              styles["mt-4"],
              styles["p-3"],
              styles["bg-gray-100"],
              styles.rounded,
            ]}
          >
            <Text style={[styles["text-xs"], styles["text-gray-600"]]}>
              Debug: Hardware: {hasHardware ? "Yes" : "No"}, Enrolled:{" "}
              {enrolled ? "Yes" : "No"}, Label: {biometricLabel}
            </Text>
          </View>
        )}

        <View style={[styles["items-center"], styles["mt-4"]]}>
          <Text style={styles["text-gray-600"]}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text
              style={[
                styles["text-primary"],
                styles["font-medium"],
                styles["mt-1"],
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
