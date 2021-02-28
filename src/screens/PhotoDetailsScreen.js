import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ViewPager } from "react-native-viewpager-carousel";
import { Context } from "../context/PhotoContext";
import { Feather } from "react-native-vector-icons";
import Share from "react-native-share";
import { getFileData } from "./../api/picsum";
import { saveImage } from "./../utils/AppUtils";
import Gallery from "react-native-image-gallery";
import { useState } from "react";

// TODO remove unwanted packages

import GallerySwiper from "react-native-gallery-swiper";

let item;

const PhotoDetailsScreen = ({ navigation }) => {
  item = navigation.getParam("item");

  const { state } = useContext(Context);

  const [currentIndex, setCurrentIndex] = useState(
    state.photoList.indexOf(item)
  );

  const showGalleryIndex = () => {
    return (
      <View style={styles.pageCounterContainerStyle}>
        <Text style={styles.pageCounterTextStyle}>
          {currentIndex + 1} / {state.photoList.length}
        </Text>
      </View>
    );
  };

  const onPageSelected = (index) => {
    item = state.photoList[index];
    setCurrentIndex(index);
  };

  return (
    <View style={{ flex: 1 }}>
      <GallerySwiper
        style={{ flex: 1, backgroundColor: "black" }}
        images={state.photoList}
        initialPage={currentIndex}
        initialNumToRender={state.photoList.length}
        onPageSelected={onPageSelected}
        sensitiveScroll={false}
      />
      {showGalleryIndex()}
    </View>
  );
};

const shareImage = async ({ navigation }) => {
  try {
    const data = await getFileData(item.uri);
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
            await saveImage(item.uri);
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

  pageCounterContainerStyle: {
    top: 0,
    height: 65,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "100%",
    position: "absolute",
    justifyContent: "center",
  },

  pageCounterTextStyle: {
    textAlign: "right",
    color: "white",
    fontSize: 15,
    fontStyle: "italic",
    paddingRight: "10%",
  },
});

export default PhotoDetailsScreen;
