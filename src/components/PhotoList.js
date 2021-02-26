import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ImageItem from "./ImageItem";

const ITEM_VISIBILITY_THRESHOLD = 25;

const PhotoList = ({ photoList, onLoadNextPage, loading }) => {
  const onViewRef = React.useRef(({ changed }) => {
    const { index } = changed[changed.length - 1];
  });
  const viewConfigRef = React.useRef({ itemVisiblePercentThreshold: 80 });

  return (
    <View>
      <FlatList
        data={photoList}
        keyExtractor={(item) => {
          // console.log("ITEM: ", item);
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <ImageItem
              key={item.id}
              imageStyle={styles.imageThumbnail}
              source={{ uri: item.download_url }}
            />
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
