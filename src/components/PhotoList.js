import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

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
                style={styles.imageThumbnail}
                source={{ uri: item.download_url }}
              />
            </View>
          );
        }}
        numColumns={2}
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
