import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import { getEventById } from "../utils/api";
import i18n from "../utils/i18n";
import { styles } from "../utils/styles";

const EventDetailsScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const { toggleFavorite, isFavorite } = useAppContext();
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

  const handleShare = () => {
    Alert.alert("Share", "Sharing functionality would be implemented here");
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
        <ActivityIndicator size="large" color="#3B82F6" />
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
        <View
          style={[
            styles["flex-row"],
            styles["items-center"],
            styles["justify-between"],
          ]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
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
                styles["mr-4"],
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
              styles["bg-blue-100"],
              styles["px-3"],
              styles["py-2"],
              styles.rounded,
              styles["self-start"],
              styles["mb-4"],
            ]}
          >
            <Text style={[styles["text-blue-800"], styles["font-medium"]]}>
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
                  styles["mr-4"],
                ]}
              >
                <Ionicons name="calendar" size={24} color="#3B82F6" />
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
                  styles["mr-4"],
                ]}
              >
                <Ionicons name="time" size={24} color="#3B82F6" />
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
                  styles["mr-4"],
                ]}
              >
                <Ionicons name="location" size={24} color="#3B82F6" />
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
                  styles["mr-4"],
                ]}
              >
                <Ionicons name="card" size={24} color="#3B82F6" />
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
                  ? [
                      styles["bg-red-100"],
                      styles.border,
                      styles["border-red-300"],
                    ]
                  : styles["bg-blue-500"],
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
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetailsScreen;
