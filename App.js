import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { isFirebaseConfigured } from "./src/bridge/config/firebaseConfig";
import ErrorAlertBar from "./src/components/ErrorAlertBar";
import { AppProvider } from "./src/context/AppContext";
import { ErrorProvider } from "./src/context/ErrorContext";
import AppNavigator from "./src/navigation/AppNavigator";

// Component to handle Firebase error integration
const FirebaseErrorHandler = () => {
  const { useFirebaseErrorHandler } = require("./src/bridge/hooks");
  useFirebaseErrorHandler();
  return null;
};

export default function App() {
  useEffect(() => {
    // Check Firebase configuration on app start
    const checkFirebaseConfig = () => {
      if (isFirebaseConfigured()) {
        console.log("✅ Firebase configured successfully");
        return;
      }

      console.warn("⚠️  Firebase not configured - sign up/sign in will fail with auth/api-key-not-valid");
      console.warn("📖 Copy .env.example to .env and add your Firebase web app config");
      console.warn("📖 See FIREBASE_SETUP.md for setup instructions");
    };

    checkFirebaseConfig();
  }, []);

  return (
    <ErrorProvider>
      <AppProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <FirebaseErrorHandler />
          <ErrorAlertBar />
          <AppNavigator />
        </NavigationContainer>
      </AppProvider>
    </ErrorProvider>
  );
}
