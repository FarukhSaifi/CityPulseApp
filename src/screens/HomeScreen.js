import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import { searchEvents } from "../utils/api";
import i18n from "../utils/i18n";
import { styles } from "../utils/styles";

const EventCard = ({ event, onPress, onFavoritePress, isFavorite }) => {
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
          ]}
        >
          <Text
            style={[
              styles["text-lg"],
              styles["font-semibold"],
              styles["text-gray-800"],
              styles["flex-1"],
              styles["mr-2"],
            ]}
          >
            {event.name}
          </Text>
          <TouchableOpacity onPress={onFavoritePress}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#EF4444" : "#6B7280"}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[styles["flex-row"], styles["items-center"], styles["mb-2"]]}
        >
          <Ionicons name="location" size={16} color="#6B7280" />
          <Text style={[styles["text-gray-600"], styles["ml-1"]]}>
            {event.venue}, {event.city}
          </Text>
        </View>

        <View
          style={[styles["flex-row"], styles["items-center"], styles["mb-2"]]}
        >
          <Ionicons name="calendar" size={16} color="#6B7280" />
          <Text style={[styles["text-gray-600"], styles["ml-1"]]}>
            {event.date} at {event.time}
          </Text>
        </View>

        <View
          style={[
            styles["flex-row"],
            styles["items-center"],
            styles["justify-between"],
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

const HomeScreen = ({ navigation }) => {
  const { isRTL, toggleFavorite, isFavorite } = useAppContext();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = async () => {
    if (!searchKeyword && !searchCity) return;

    setLoading(true);
    try {
      const results = await searchEvents(searchKeyword, searchCity);
      setEvents(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const results = await searchEvents(searchKeyword, searchCity);
      setEvents(results);
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleEventPress = (event) => {
    navigation.navigate("EventDetails", { eventId: event.id });
  };

  const handleFavoritePress = (event) => {
    toggleFavorite(event);
  };

  return (
    <View style={[styles.flex, styles["bg-gray-50"]]}>
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
        <Text
          style={[
            styles["text-2xl"],
            styles["font-bold"],
            styles["text-gray-800"],
            styles["text-center"],
          ]}
        >
          {i18n.t("searchEvents")}
        </Text>
      </View>

      {/* Search Section */}
      <View style={[styles["bg-white"], styles["p-4"], styles["shadow-sm"]]}>
        <View style={styles["mb-3"]}>
          <TextInput
            placeholder={i18n.t("searchPlaceholder")}
            value={searchKeyword}
            onChangeText={setSearchKeyword}
            style={[
              styles.border,
              styles["border-gray-300"],
              styles.rounded,
              styles["px-4"],
              styles["py-3"],
              styles["text-gray-800"],
            ]}
            textAlign={isRTL ? "right" : "left"}
          />
        </View>

        <View style={styles["mb-3"]}>
          <TextInput
            placeholder={i18n.t("cityPlaceholder")}
            value={searchCity}
            onChangeText={setSearchCity}
            style={[
              styles.border,
              styles["border-gray-300"],
              styles.rounded,
              styles["px-4"],
              styles["py-3"],
              styles["text-gray-800"],
            ]}
            textAlign={isRTL ? "right" : "left"}
          />
        </View>

        <TouchableOpacity
          onPress={handleSearch}
          style={[
            styles["bg-primary"],
            styles.rounded,
            styles["py-3"],
            styles["items-center"],
          ]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text
              style={[
                styles["text-white"],
                styles["font-semibold"],
                styles["text-lg"],
              ]}
            >
              {i18n.t("searchButton")}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Results */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => handleEventPress(item)}
            onFavoritePress={() => handleFavoritePress(item)}
            isFavorite={isFavorite(item.id)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          !loading && (
            <View
              style={[
                styles.flex,
                styles["items-center"],
                styles["justify-center"],
                styles["py-20"],
              ]}
            >
              <Ionicons name="search" size={64} color="#D1D5DB" />
              <Text
                style={[
                  styles["text-gray-500"],
                  styles["text-lg"],
                  styles["mt-4"],
                  styles["text-center"],
                ]}
              >
                {i18n.t("noEventsFound")}
              </Text>
            </View>
          )
        }
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

export default HomeScreen;
