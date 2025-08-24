import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { firebaseConfig } from "./src/bridge/config/firebaseConfig";
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
      const hasValidConfig =
        firebaseConfig.apiKey &&
        firebaseConfig.apiKey !== "your-api-key-here" &&
        firebaseConfig.projectId &&
        firebaseConfig.projectId !== "your-project-id";

      if (hasValidConfig) {
        console.log("✅ Firebase configured successfully");
      } else {
        console.log(
          "⚠️  Firebase not configured - authentication will not work"
        );
        console.log("📖 See FIREBASE_SETUP.md for setup instructions");
      }
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
