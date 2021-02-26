import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ViewPager } from "react-native-viewpager-carousel";
import PhotoContext from "../context/PhotoContext";

const PhotoDetailsScreen = (props) => {
  const {
    navigation: {
      state: {
        params: { item },
      },
    },
  } = props;

  const { data } = useContext(PhotoContext);

  // console.log("DATA: ", data);

  const renderPage = ({ data }) => {
    console.log("DATA==> ", data);
    return (
      <View style={styles.container}>
        <Image style={styles.imageStyle} source={{ uri: data.download_url }} />
      </View>
    );
  };

  return (
    <ViewPager
      containerStyle={styles.viewPagerStyle}
      data={data}
      renderPage={renderPage}
      initialPage={item}
      lazyrender
      lazyrenderThreshold={2}
    />
  );
};

const styles = StyleSheet.create({
  viewPagerStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  imageStyle: {
    flex: 1,
    resizeMode: "contain",
  },
});

export default PhotoDetailsScreen;
