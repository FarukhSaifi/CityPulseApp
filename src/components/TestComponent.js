import React from "react";
import { Text, View } from "react-native";

const TestComponent = () => {
  return (
    <View className="flex-1 items-center justify-center bg-blue-100">
      <Text className="text-2xl font-bold text-blue-800 mb-4">
        City Pulse App
      </Text>
      <Text className="text-lg text-blue-600 text-center px-8">
        Welcome to your local events explorer! This is a test component to
        verify the setup.
      </Text>
      <View className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <Text className="text-gray-800 font-medium text-center">
          ✅ NativeWind is working!
        </Text>
        <Text className="text-gray-600 text-sm text-center mt-2">
          Tailwind CSS classes are being applied correctly.
        </Text>
      </View>
    </View>
  );
};

export default TestComponent;
