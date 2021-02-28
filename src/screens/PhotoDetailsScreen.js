import React, { useContext, useEffect } from "react";
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

const SWIPE_COUNT_THRESHOLD = 25;

const PhotoDetailsScreen = ({ navigation }) => {
  const incomingIndex = navigation.getParam("index");
  const { state } = useContext(Context);

  const [photoList, setPhotoList] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(
    incomingIndex > SWIPE_COUNT_THRESHOLD
      ? SWIPE_COUNT_THRESHOLD
      : incomingIndex
  );

  const initGallery = (pivot) => {
    let leftEnd = 0;
    if (pivot - SWIPE_COUNT_THRESHOLD > 0) {
      leftEnd = pivot - SWIPE_COUNT_THRESHOLD;
    }

    let rightEnd = pivot + SWIPE_COUNT_THRESHOLD;
    if (rightEnd > state.photoList.length) {
      rightEnd = state.photoList.length - 1;
    }

    const updatedList = state.photoList.slice(leftEnd, rightEnd);
    setPhotoList(updatedList);
  };

  useEffect(() => {
    initGallery(incomingIndex);
  }, []);

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
    item = photoList[index];
    console.log("Index: ", item);
  };

  if (photoList.length <= 0) return null;

  return (
    <View style={{ flex: 1 }}>
      <GallerySwiper
        style={{ flex: 1, backgroundColor: "black" }}
        images={photoList}
        initialPage={currentIndex}
        initialNumToRender={photoList.length}
        onPageSelected={onPageSelected}
        sensitiveScroll={false}
        onEndReachedThreshold={0.8}
        onEndReached={() => console.log("onEndReached: ", currentIndex)}
      />
      {/* {showGalleryIndex()} */}
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
