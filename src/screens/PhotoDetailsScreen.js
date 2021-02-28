import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ViewPager } from "react-native-viewpager-carousel";
import { Context } from "../context/PhotoContext";
import { Feather } from "react-native-vector-icons";
import Share from "react-native-share";
import { getFileData } from "./../api/picsum";
import { saveImage } from "./../utils/AppUtils";
import Gallery from "react-native-image-gallery";

let item;

const PhotoDetailsScreen = ({ navigation }) => {
  item = navigation.getParam("item");

  const { state } = useContext(Context);
  const index = state.indexOf(item);

  return (
    <Gallery
      style={{ flex: 1, backgroundColor: "black" }}
      images={state}
      initialPage={index}
      onPageSelected={(event) => {
        item = state[event];
        console.log("Selected page: ", event);
      }}
    />
  );
};

const shareImage = async ({ navigation }) => {
  try {
    const data = await getFileData(item.source.uri);
    const options = {
      type: "image/jpeg",
      url: data,
    };
    const shareResponse = await Share.open(options);
  } catch (error) {
    console.log("Error while sharing an image: ", error);
  }
};

PhotoDetailsScreen.navigationOptions = (props) => {
  return {
    headerRight: () => (
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={async () => {
            console.log("Saving image to galley");
            await saveImage(item.source.uri);
          }}
        >
          <Feather name="save" size={30} style={styles.saveIconStyle} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => shareImage(props)}>
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
