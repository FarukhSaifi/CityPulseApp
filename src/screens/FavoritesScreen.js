import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import i18n from "../utils/i18n";
import { styles } from "../utils/styles";

const FavoriteEventCard = ({ event, onPress, onRemove, isRTL }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles["bg-white"],
        styles.rounded,
        styles["shadow-sm"],
        styles["mb-4"],
        styles["mx-4"],
        styles["overflow-hidden"],
      ]}
    >
      <Image
        source={{ uri: event.image }}
        style={[styles["w-full"], styles["h-40"]]}
        resizeMode="cover"
      />
      <View style={styles["p-4"]}>
        <View
          style={[
            styles["flex-row"],
            styles["justify-between"],
            styles["items-start"],
            styles["mb-2"],
            isRTL && { flexDirection: "row-reverse" },
          ]}
        >
          <Text
            style={[
              styles["text-lg"],
              styles["font-semibold"],
              styles["text-gray-800"],
              styles["flex-1"],
              isRTL ? styles["ms-2"] : styles["me-2"],
              { textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {event.name}
          </Text>
          <TouchableOpacity onPress={onRemove}>
            <Ionicons name="heart" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles["flex-row"],
            styles["items-center"],
            styles["mb-2"],
            isRTL && { flexDirection: "row-reverse" },
          ]}
        >
          <Ionicons name="location" size={16} color="#6B7280" />
          <Text
            style={[
              styles["text-gray-600"],
              isRTL ? styles["me-1"] : styles["ms-1"],
              { textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {event.venue}, {event.city}
          </Text>
        </View>

        <View
          style={[
            styles["flex-row"],
            styles["items-center"],
            styles["mb-2"],
            isRTL && { flexDirection: "row-reverse" },
          ]}
        >
          <Ionicons name="calendar" size={16} color="#6B7280" />
          <Text
            style={[
              styles["text-gray-600"],
              isRTL ? styles["me-1"] : styles["ms-1"],
              { textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {event.date} at {event.time}
          </Text>
        </View>

        <View
          style={[
            styles["flex-row"],
            styles["items-center"],
            styles["justify-between"],
            isRTL && { flexDirection: "row-reverse" },
          ]}
        >
          <View
            style={[
              styles["bg-blue-100"],
              styles["px-2"],
              styles["py-1"],
              styles.rounded,
            ]}
          >
            <Text
              style={[
                styles["text-blue-800"],
                styles["text-sm"],
                styles["font-medium"],
              ]}
            >
              {event.category}
            </Text>
          </View>
          <Text
            style={[
              styles["text-lg"],
              styles["font-bold"],
              styles["text-green-600"],
            ]}
          >
            {event.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FavoritesScreen = ({ navigation }) => {
  const { favorites, toggleFavorite, clearFavorites, isRTL } = useAppContext();

  const handleEventPress = (event) => {
    navigation.navigate("EventDetails", { eventId: event.id });
  };

  const handleRemoveFavorite = (event) => {
    Alert.alert(
      "Remove from Favorites",
      `Are you sure you want to remove "${event.name}" from your favorites?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => toggleFavorite(event),
        },
      ]
    );
  };

  const handleClearAll = () => {
    if (favorites.length === 0) return;
    Alert.alert(
      "Clear All Favorites",
      "Are you sure you want to remove all events from your favorites?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => clearFavorites(),
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.flex,
        styles["bg-gray-50"],
        isRTL ? styles.rtl : styles.ltr,
      ]}
    >
      {/* Header */}
      <View
        style={[
          styles["bg-white"],
          styles["pt-12"],
          styles["pb-4"],
          styles["px-4"],
          styles["shadow-sm"],
        ]}
      >
        <View
          style={[
            styles["flex-row"],
            styles["items-center"],
            styles["justify-between"],
          ]}
        >
          <Text
            style={[
              styles["text-2xl"],
              styles["font-bold"],
              styles["text-gray-800"],
            ]}
          >
            {i18n.t("favorites")}
          </Text>
          {favorites.length > 0 && (
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={[styles["text-red-600"], styles["font-medium"]]}>
                Clear All
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Favorites Count */}
      <View
        style={[
          styles["bg-white"],
          styles["p-4"],
          styles["mb-4"],
          styles["mx-4"],
          styles.rounded,
          styles["shadow-sm"],
        ]}
      >
        <View
          style={[
            styles["flex-row"],
            styles["items-center"],
            styles["justify-between"],
          ]}
        >
          <View style={[styles["flex-row"], styles["items-center"]]}>
            <Ionicons name="heart" size={24} color="#EF4444" />
            <Text
              style={[
                styles["text-gray-800"],
                styles["font-semibold"],
                styles["text-lg"],
                styles["ms-2"],
              ]}
            >
              {favorites.length} {favorites.length === 1 ? "Event" : "Events"}
            </Text>
          </View>
          <Text style={styles["text-gray-600"]}>
            {favorites.length === 0 ? "No favorites yet" : "Saved events"}
          </Text>
        </View>
      </View>

      {/* Favorites List */}
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FavoriteEventCard
            event={item}
            onPress={() => handleEventPress(item)}
            onRemove={() => handleRemoveFavorite(item)}
            isRTL={isRTL}
          />
        )}
        ListEmptyComponent={
          <View
            style={[
              styles.flex,
              styles["items-center"],
              styles["justify-center"],
              styles["py-20"],
            ]}
          >
            <Ionicons name="heart-outline" size={64} color="#D1D5DB" />
            <Text
              style={[
                styles["text-gray-500"],
                styles["text-lg"],
                styles["mt-4"],
                styles["text-center"],
              ]}
            >
              No favorite events yet
            </Text>
            <Text
              style={[
                styles["text-gray-400"],
                styles["text-sm"],
                styles["mt-2"],
                styles["text-center"],
              ]}
            >
              Start exploring events and add them to your favorites
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={[
                styles["bg-primary"],
                styles["px-6"],
                styles["py-3"],
                styles.rounded,
                styles["mt-6"],
              ]}
            >
              <Text style={[styles["text-white"], styles["font-semibold"]]}>
                Explore Events
              </Text>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavoritesScreen;
