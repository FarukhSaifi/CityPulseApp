import React, { useCallback, useMemo } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import LoadingSpinner from "./LoadingSpinner";

const VirtualizedList = ({
  data,
  renderItem,
  keyExtractor,
  onRefresh,
  refreshing = false,
  onEndReached,
  onEndReachedThreshold = 0.1,
  ListEmptyComponent,
  ListFooterComponent,
  ListHeaderComponent,
  contentContainerStyle = [],
  style = [],
  showsVerticalScrollIndicator = false,
  removeClippedSubviews = true,
  maxToRenderPerBatch = 10,
  windowSize = 10,
  initialNumToRender = 10,
  getItemLayout,
  numColumns = 1,
  horizontal = false,
  inverted = false,
  ...props
}) => {
  const { styles, colors } = useTheme();
  // Memoize the render item function for better performance
  const memoizedRenderItem = useCallback(
    ({ item, index, separators }) => {
      return renderItem({ item, index, separators });
    },
    [renderItem]
  );

  // Memoize the key extractor function
  const memoizedKeyExtractor = useCallback(
    (item, index) => {
      return keyExtractor ? keyExtractor(item, index) : index.toString();
    },
    [keyExtractor]
  );

  // Memoize the onEndReached function
  const memoizedOnEndReached = useCallback(
    (info) => {
      if (onEndReached) {
        onEndReached(info);
      }
    },
    [onEndReached]
  );

  // Memoize the refresh control
  const refreshControl = useMemo(() => {
    if (!onRefresh) return undefined;

    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={[colors.primary.main]}
        tintColor={colors.primary.main}
      />
    );
  }, [refreshing, onRefresh]);

  // Default empty component
  const defaultEmptyComponent = useMemo(() => {
    if (ListEmptyComponent) return ListEmptyComponent;

    return (
      <View
        style={[
          styles.flex,
          styles["items-center"],
          styles["justify-center"],
          styles["p-8"],
        ]}
      >
        <LoadingSpinner message="No items found" />
      </View>
    );
  }, [ListEmptyComponent]);

  // Performance optimization props
  const performanceProps = {
    removeClippedSubviews,
    maxToRenderPerBatch,
    windowSize,
    initialNumToRender,
    getItemLayout,
    updateCellsBatchingPeriod: 50,
    disableVirtualization: false,
  };

  return (
    <FlatList
      data={data}
      renderItem={memoizedRenderItem}
      keyExtractor={memoizedKeyExtractor}
      refreshControl={refreshControl}
      onEndReached={memoizedOnEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListEmptyComponent={defaultEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={[styles.flex, ...contentContainerStyle]}
      style={[styles.flex, ...style]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      numColumns={numColumns}
      horizontal={horizontal}
      inverted={inverted}
      {...performanceProps}
      {...props}
    />
  );
};

export default React.memo(VirtualizedList);
