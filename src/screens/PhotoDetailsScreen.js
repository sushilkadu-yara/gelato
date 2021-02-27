import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { ViewPager } from "react-native-viewpager-carousel";
import { Context } from "../context/PhotoContext";
import { Feather } from "react-native-vector-icons";
import Share from "react-native-share";
import { getFileData } from "./../api/picsum";
import { saveImage } from "./../utils/AppUtils";
import Gallery from "react-native-image-gallery";

const PhotoDetailsScreen = ({ navigation }) => {
  const item = navigation.getParam("item");

  console.log("ITEM: ", item);
  const { state } = useContext(Context);
  const index = state.indexOf(item);

  console.log("Index: ", index);

  const renderPage = ({ data }) => {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageStyle}
          source={{ uri: data.source.uri }}
          initialPage={index}
        />
      </View>
    );
  };

  return (
    <Gallery
      style={{ flex: 1, backgroundColor: "black" }}
      images={state}
      initialPage={index}
    />
  );
};

const shareImage = async ({ navigation }) => {
  try {
    const item = navigation.getParam("item");
    const data = await getFileData(item.source.uri);
    const options = {
      title: `Sharing a photo of ${item.author}`,
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
            const item = props.navigation.getParam("item");
            await saveImage(item.download_url);
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
