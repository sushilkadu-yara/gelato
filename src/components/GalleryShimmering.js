import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

const GalleryShimmering = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
      </View>
      <View style={styles.innerContainer}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
      </View>
      <View style={styles.innerContainer}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
      </View>
      <View style={styles.innerContainer}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
      </View>
      <View style={styles.innerContainer}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
      </View>

      <View style={styles.innerContainer}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
      </View>

      <View style={styles.innerContainer}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          location={[0.3, 0.5, 0.7]}
          width={135}
          height={100}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
  },
  innerContainer: {
    flexDirection: "row",
    width: 135,
    height: 100,
    marginTop: 10,
  },
});

export default GalleryShimmering;
