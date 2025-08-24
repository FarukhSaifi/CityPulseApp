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
import { useTheme } from "../context/ThemeContext";
import i18n from "../utils/i18n";

const FavoriteEventCard = ({
  event,
  onPress,
  onRemove,
  isRTL,
  styles,
  colors,
  componentStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        componentStyles.card,
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
              styles["text-primary"],
              styles["flex-1"],
              isRTL ? styles["ms-2"] : styles["me-2"],
              { textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {event.name}
          </Text>
          <TouchableOpacity onPress={onRemove}>
            <Ionicons name="heart" size={24} color={colors.error.main} />
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
          <Ionicons name="location" size={16} color={colors.text.secondary} />
          <Text
            style={[
              styles["text-secondary"],
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
          <Ionicons name="calendar" size={16} color={colors.text.secondary} />
          <Text
            style={[
              styles["text-secondary"],
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
              styles["bg-info-light"],
              styles["px-2"],
              styles["py-1"],
              styles.rounded,
            ]}
          >
            <Text
              style={[
                styles["text-info"],
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
              styles["text-success"],
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
  const { styles, colors, componentStyles } = useTheme();

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
        styles["bg-background"],
        isRTL ? styles.rtl : styles.ltr,
      ]}
    >
      {/* Header */}
      <View style={componentStyles.header}>
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
              styles["text-primary"],
            ]}
          >
            {i18n.t("favorites")}
          </Text>
          {favorites.length > 0 && (
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={[styles["text-error"], styles["font-medium"]]}>
                Clear All
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Favorites Count */}
      <View style={[componentStyles.card, styles["m-4"]]}>
        <View
          style={[
            styles["flex-row"],
            styles["items-center"],
            styles["justify-between"],
          ]}
        >
          <View style={[styles["flex-row"], styles["items-center"]]}>
            <Ionicons name="heart" size={24} color={colors.error.main} />
            <Text
              style={[
                styles["text-primary"],
                styles["font-semibold"],
                styles["text-lg"],
                styles["ms-2"],
              ]}
            >
              {favorites.length} {favorites.length === 1 ? "Event" : "Events"}
            </Text>
          </View>
          <Text style={styles["text-secondary"]}>
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
            styles={styles}
            colors={colors}
            componentStyles={componentStyles}
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
            <Ionicons
              name="heart-outline"
              size={64}
              color={colors.text.disabled}
            />
            <Text
              style={[
                styles["text-secondary"],
                styles["text-lg"],
                styles["mt-4"],
                styles["text-center"],
              ]}
            >
              No favorite events yet
            </Text>
            <Text
              style={[
                styles["text-hint"],
                styles["text-sm"],
                styles["mt-2"],
                styles["text-center"],
              ]}
            >
              Start exploring events and add them to your favorites
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={componentStyles.button}
            >
              <Text style={componentStyles.buttonText}>Explore Events</Text>
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
