import React from "react";
import { View, Text, StyleSheet } from "react-native";
import usePhotoListResponse from "./../hooks/usePhotoListResponse";
import PhotoList from "./../components/PhotoList";

const PhotoListScreen = ({ navigation }) => {
  const [
    photoListApi,
    photoList,
    errorMessage,
    loading,
  ] = usePhotoListResponse();

  const onItemClicked = (item) => {
    console.log("Clicked on: ", item);
  };

  return (
    <View>
      <Text>Total photos loaded: {photoList.length}</Text>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {loading ? <Text>Loading next page</Text> : null}
      <PhotoList
        photoList={photoList}
        onLoadNextPage={() => {
          photoListApi();
        }}
        loading={loading}
        onItemClicked={onItemClicked}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PhotoListScreen;
