import React from "react";
import { View, StyleSheet } from "react-native";
import ImageLoad from "react-native-image-placeholder";

const ImageItem = ({ id, source, imageStyle }) => {
  return (
    <View style={styles.container}>
      <ImageLoad key={id} source={source} style={imageStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 1,
  },
});

export default ImageItem;
