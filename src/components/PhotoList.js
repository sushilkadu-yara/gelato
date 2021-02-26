import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import ProgressiveImage from "./ProgressiveImage";

const PhotoList = ({ photoList }) => {
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
              <Image
                key={item.id}
                style={styles.imageThumbnail}
                source={{ uri: item.download_url }}
              />
            </View>
          );
        }}
        numColumns={3}
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
