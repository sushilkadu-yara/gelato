import React, { useState } from "react";
import { View, Animated, StyleSheet, Image } from "react-native";

const ProgressiveImage = ({ key, source, style }) => {
  const [opacity, setOpacity] = useState(new Animated.Value(0));

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View backgroundColor={"#ffffff"}>
      <Animated.Image
        resizeMode={"contain"}
        key={key}
        style={[
          {
            opacity: opacity,
          },
          style,
        ]}
        source={source}
        onLoad={(event) => onLoad(event)}
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

export default ProgressiveImage;
