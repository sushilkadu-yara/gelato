import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import ProgressiveImage from "./ProgressiveImage";
import ImageLoad from "react-native-image-placeholder";

const ITEM_VISIBILITY_THRESHOLD = 25;

const PhotoList = ({ photoList, onLoadNextPage }) => {
  let lastVisibileItem = 0;
  const onViewRef = React.useRef(({ changed }) => {
    const { index } = changed[changed.length - 1];
  });
  const viewConfigRef = React.useRef({ itemVisiblePercentThreshold: 80 });

  return (
    <View>
      <FlatList
        data={photoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                margin: 1,
              }}
            >
              <ImageLoad
                key={item.id}
                style={styles.imageThumbnail}
                source={{ uri: item.download_url }}
              />
            </View>
          );
        }}
        numColumns={3}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        onEndReached={() => onLoadNextPage()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});

export default PhotoList;
