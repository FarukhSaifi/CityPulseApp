import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAppContext } from "../context/AppContext";
import { getEventById } from "../utils/api";
import i18n from "../utils/i18n";
import { colors, styles } from "../utils/styles";

const EventDetailsScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const { toggleFavorite, isFavorite, isRTL } = useAppContext();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvent();
  }, [eventId]);

  const loadEvent = async () => {
    try {
      const eventData = await getEventById(eventId);
      setEvent(eventData || null);
    } catch (error) {
      console.error("Error loading event:", error);
      Alert.alert(i18n.t("error"), "Failed to load event details");
    } finally {
      setLoading(false);
    }
  };

  const handleFavoritePress = () => {
    if (event) {
      toggleFavorite(event);
    }
  };

  const handleShare = async () => {
    if (!event) return;
    // Prefer canonical URL from API; if missing, construct a fallback deep link
    const link =
      event.url ||
      `https://citypulse.app/events/${encodeURIComponent(event.id)}`;
    const message = `${event.name}\n${event.venue ? event.venue + ", " : ""}${
      event.city || ""
    }\n${link}`.trim();
    try {
      await Share.share({ message, url: link, title: event.name });
    } catch (err) {
      Alert.alert("Share", "Unable to share this event at the moment.");
    }
  };

  const handleDirections = () => {
    if (!event) return;
    const hasCoords =
      typeof event.latitude === "number" && typeof event.longitude === "number";
    if (hasCoords) {
      const url = Platform.select({
        ios: `http://maps.apple.com/?daddr=${event.latitude},${event.longitude}`,
        android: `geo:${event.latitude},${event.longitude}?q=${
          event.latitude
        },${event.longitude}(${encodeURIComponent(
          event.venue || event.name || "Event"
        )})`,
        default: `https://www.google.com/maps/search/?api=1&query=${event.latitude},${event.longitude}`,
      });
      Linking.openURL(url);
    } else if (event.venue || event.city) {
      const query = encodeURIComponent(
        `${event.venue || ""} ${event.city || ""}`
      );
      const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
      Linking.openURL(url);
    } else {
      Alert.alert("Directions", "Location not available for this event.");
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.flex,
          styles["bg-gray-50"],
          styles["justify-center"],
          styles["items-center"],
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles["text-gray-600"], styles["mt-4"]]}>
          {i18n.t("loading")}
        </Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View
        style={[
          styles.flex,
          styles["bg-gray-50"],
          styles["justify-center"],
          styles["items-center"],
        ]}
      >
        <Ionicons name="alert-circle" size={64} color="#EF4444" />
        <Text
          style={[
            styles["text-gray-600"],
            styles["mt-4"],
            styles["text-center"],
          ]}
        >
          {i18n.t("noData")}
        </Text>
      </View>
    );
  }

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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name={isRTL ? "arrow-forward" : "arrow-back"}
              size={24}
              color="#374151"
            />
          </TouchableOpacity>
          <Text
            style={[
              styles["text-xl"],
              styles["font-bold"],
              styles["text-gray-800"],
            ]}
          >
            {i18n.t("eventDetails")}
          </Text>
          <TouchableOpacity onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.flex}>
        {/* Event Image */}
        <Image
          source={{ uri: event.image }}
          style={[styles["w-full"], styles["h-64"]]}
          resizeMode="cover"
        />

        {/* Event Info */}
        <View style={[styles["bg-white"], styles["p-6"]]}>
          {/* Title and Favorite */}
          <View
            style={[
              styles["flex-row"],
              styles["justify-between"],
              styles["items-start"],
              styles["mb-4"],
            ]}
          >
            <Text
              style={[
                styles["text-2xl"],
                styles["font-bold"],
                styles["text-gray-800"],
                styles["flex-1"],
                styles["me-4"],
              ]}
            >
              {event.name}
            </Text>
            <TouchableOpacity onPress={handleFavoritePress}>
              <Ionicons
                name={isFavorite(event.id) ? "heart" : "heart-outline"}
                size={32}
                color={isFavorite(event.id) ? "#EF4444" : "#6B7280"}
              />
            </TouchableOpacity>
          </View>

          {/* Category Badge */}
          <View
            style={[
              styles["bg-primary-light"],
              styles["px-3"],
              styles["py-2"],
              styles.rounded,
              styles["self-start"],
              styles["mb-4"],
            ]}
          >
            <Text style={[styles["text-primary-dark"], styles["font-medium"]]}>
              {event.category}
            </Text>
          </View>

          {/* Event Details */}
          <View style={styles["space-y-4"]}>
            {/* Date & Time */}
            <View style={[styles["flex-row"], styles["items-center"]]}>
              <View
                style={[
                  styles["bg-gray-100"],
                  styles["p-3"],
                  styles.rounded,
                  styles["me-4"],
                ]}
              >
                <Ionicons name="calendar" size={24} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles["text-gray-600"], styles["text-sm"]]}>
                  {i18n.t("date")}
                </Text>
                <Text
                  style={[styles["text-gray-800"], styles["font-semibold"]]}
                >
                  {event.date}
                </Text>
              </View>
            </View>

            <View style={[styles["flex-row"], styles["items-center"]]}>
              <View
                style={[
                  styles["bg-gray-100"],
                  styles["p-3"],
                  styles.rounded,
                  styles["me-4"],
                ]}
              >
                <Ionicons name="time" size={24} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles["text-gray-600"], styles["text-sm"]]}>
                  {i18n.t("time")}
                </Text>
                <Text
                  style={[styles["text-gray-800"], styles["font-semibold"]]}
                >
                  {event.time}
                </Text>
              </View>
            </View>

            {/* Venue */}
            <View style={[styles["flex-row"], styles["items-center"]]}>
              <View
                style={[
                  styles["bg-gray-100"],
                  styles["p-3"],
                  styles.rounded,
                  styles["me-4"],
                ]}
              >
                <Ionicons name="location" size={24} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles["text-gray-600"], styles["text-sm"]]}>
                  {i18n.t("venue")}
                </Text>
                <Text
                  style={[styles["text-gray-800"], styles["font-semibold"]]}
                >
                  {event.venue}, {event.city}
                </Text>
              </View>
            </View>

            {/* Price */}
            <View style={[styles["flex-row"], styles["items-center"]]}>
              <View
                style={[
                  styles["bg-gray-100"],
                  styles["p-3"],
                  styles.rounded,
                  styles["me-4"],
                ]}
              >
                <Ionicons name="card" size={24} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles["text-gray-600"], styles["text-sm"]]}>
                  {i18n.t("price")}
                </Text>
                <Text
                  style={[
                    styles["text-green-600"],
                    styles["font-bold"],
                    styles["text-lg"],
                  ]}
                >
                  {event.price}
                </Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles["mt-6"]}>
            <Text
              style={[
                styles["text-gray-600"],
                styles["text-sm"],
                styles["mb-2"],
              ]}
            >
              {i18n.t("description")}
            </Text>
            <Text style={[styles["text-gray-800"], styles["leading-6"]]}>
              {event.description}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles["mt-8"]}>
            <TouchableOpacity
              onPress={handleFavoritePress}
              style={[
                styles["py-4"],
                styles.rounded,
                styles["items-center"],
                isFavorite(event.id)
                  ? [styles.border, styles["border-red-300"]]
                  : styles["bg-primary"],
              ]}
            >
              <Text
                style={[
                  styles["font-semibold"],
                  styles["text-lg"],
                  isFavorite(event.id)
                    ? styles["text-red-700"]
                    : styles["text-white"],
                ]}
              >
                {isFavorite(event.id)
                  ? i18n.t("removeFromFavorites")
                  : i18n.t("addToFavorites")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDirections}
              style={[
                styles["bg-gray-100"],
                styles["py-4"],
                styles.rounded,
                styles["items-center"],
                styles["mt-3"],
              ]}
            >
              <Text
                style={[
                  styles["text-gray-700"],
                  styles["font-semibold"],
                  styles["text-lg"],
                ]}
              >
                Get Directions
              </Text>
            </TouchableOpacity>
          </View>

          {/* Map Preview below actions */}
          {event?.latitude != null && event?.longitude != null && (
            <View style={[styles["mt-4"]]}>
              <MapView
                style={[styles["w-full"], styles["h-64"], styles.rounded]}
                initialRegion={{
                  latitude: event.latitude,
                  longitude: event.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                pointerEvents="none"
              >
                <Marker
                  coordinate={{
                    latitude: event.latitude,
                    longitude: event.longitude,
                  }}
                />
              </MapView>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetailsScreen;
