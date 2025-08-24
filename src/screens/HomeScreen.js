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
import { eventService } from "../bridge/services";
import { useAppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import i18n from "../utils/i18n";

const EventCard = ({
  event,
  onPress,
  onFavoritePress,
  isFavorite,
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
          <TouchableOpacity onPress={onFavoritePress}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? colors.error.main : colors.text.secondary}
            />
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

const HomeScreen = ({ navigation }) => {
  const { isRTL, toggleFavorite, isFavorite } = useAppContext();
  const { styles, colors, componentStyles } = useTheme();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const clearEvents = () => {
    setEvents([]);
    setCurrentPage(0);
    setHasMore(true);
  };

  const handleSearch = async (isRefresh = false) => {
    if (!searchKeyword && !searchCity) return;

    if (isRefresh) {
      clearEvents();
    }

    setLoading(true);
    try {
      const results = await eventService.searchEvents(
        searchKeyword,
        searchCity,
        isRefresh ? 0 : currentPage
      );
      if (results.success) {
        if (isRefresh) {
          setEvents(results.data);
        } else {
          setEvents((prev) => [...prev, ...results.data]);
        }
        setHasMore(results.hasMore);
      } else {
        console.error("Search failed:", results.error);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreEvents = async () => {
    if (loadingMore || !hasMore || (!searchKeyword && !searchCity)) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const results = await eventService.searchEvents(
        searchKeyword,
        searchCity,
        nextPage
      );
      if (results.success) {
        setEvents((prev) => [...prev, ...results.data]);
        setCurrentPage(nextPage);
        setHasMore(results.hasMore);
      } else {
        console.error("Load more failed:", results.error);
      }
    } catch (error) {
      console.error("Load more error:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await handleSearch(true);
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
    <View
      style={[
        styles.flex,
        styles["bg-background"],
        isRTL ? styles.rtl : styles.ltr,
      ]}
    >
      {/* Header */}
      <View style={componentStyles.header}>
        <Text
          style={[
            styles["text-2xl"],
            styles["font-bold"],
            styles["text-primary"],
            styles["text-center"],
          ]}
        >
          {i18n.t("searchEvents")}
        </Text>
      </View>

      {/* Search Section */}
      <View style={[styles["bg-paper"], styles["p-4"], styles["shadow-sm"]]}>
        <View style={styles["mb-3"]}>
          <TextInput
            placeholder={i18n.t("searchPlaceholder")}
            value={searchKeyword}
            onChangeText={setSearchKeyword}
            style={[componentStyles.input]}
            textAlign={isRTL ? "right" : "left"}
          />
        </View>

        <View style={styles["mb-3"]}>
          <TextInput
            placeholder={i18n.t("cityPlaceholder")}
            value={searchCity}
            onChangeText={setSearchCity}
            style={[componentStyles.input]}
            textAlign={isRTL ? "right" : "left"}
          />
        </View>

        <TouchableOpacity
          onPress={() => handleSearch(true)}
          style={componentStyles.button}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={componentStyles.buttonText}>
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
            isRTL={isRTL}
            styles={styles}
            colors={colors}
            componentStyles={componentStyles}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={events.length > 0 && !loading ? loadMoreEvents : null}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore && (
            <View
              style={[
                styles["py-4"],
                styles["items-center"],
                styles["justify-center"],
              ]}
            >
              <ActivityIndicator size="large" color={colors.primary.main} />
              <Text
                style={[
                  styles["text-secondary"],
                  styles["text-sm"],
                  styles["mt-2"],
                ]}
              >
                Loading more events...
              </Text>
            </View>
          )
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
              <Ionicons name="search" size={64} color={colors.text.disabled} />
              <Text
                style={[
                  styles["text-secondary"],
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
