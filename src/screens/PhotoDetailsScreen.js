import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ViewPager } from "react-native-viewpager-carousel";
import { Context } from "../context/PhotoContext";
import { Feather } from "react-native-vector-icons";

const PhotoDetailsScreen = ({ navigation }) => {
  const item = navigation.getParam("item");

  const { state } = useContext(Context);

  const renderPage = ({ data }) => {
    return (
      <View style={styles.container}>
        <Image style={styles.imageStyle} source={{ uri: data.download_url }} />
      </View>
    );
  };

  return (
    <ViewPager
      containerStyle={styles.viewPagerStyle}
      data={state}
      renderPage={renderPage}
      initialPage={item}
      lazyrender
      lazyrenderThreshold={2}
    />
  );
};

PhotoDetailsScreen.navigationOptions = () => {
  return {
    headerRight: () => (
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => console.log("Save clicked")}>
          <Feather name="save" size={30} style={styles.saveIconStyle} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Share clicked")}>
          <Feather name="share-2" size={30} style={styles.saveIconStyle} />
        </TouchableOpacity>
      </View>
    ),
  };
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

  iconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  saveIconStyle: {
    paddingRight: 10,
    alignSelf: "center",
  },
});

export default PhotoDetailsScreen;
