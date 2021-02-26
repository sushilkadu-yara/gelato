import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import usePhotoListResponse from "./../hooks/usePhotoListResponse";
import PhotoList from "./../components/PhotoList";

const PhotoListScreen = () => {
  const [
    photoListApi,
    photoList,
    errorMessage,
    loading,
  ] = usePhotoListResponse();

  return (
    <View>
      <Text>Total photos loaded: {photoList.length}</Text>
      {errorMessage ? <Text>{errorMessage}</Text> : null}

      <PhotoList
        photoList={photoList}
        onLoadNextPage={() => {
          console.log("Load next page");
          photoListApi();
        }}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PhotoListScreen;
