import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const PhotoDetailsScreen = (props) => {
  const {
    navigation: {
      state: {
        params: { item },
      },
    },
  } = props;
  return (
    <View style={styles.container}>
      <Image style={styles.imageStyle} source={{ uri: item.download_url }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageStyle: {
    flex: 1,
    resizeMode: "contain",
  },
});

export default PhotoDetailsScreen;
