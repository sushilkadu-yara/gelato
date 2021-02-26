import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import usePhotoListResponse from "./../hooks/usePhotoListResponse";
import PhotoList from "./../components/PhotoList";

const PhotoListScreen = () => {
  const [photoListApi, photoList, errorMessage] = usePhotoListResponse();

  return (
    <View>
      <Text>Photo List screen: {photoList.length}</Text>
      <Button title="Get Results" onPress={photoListApi}></Button>

      {errorMessage ? <Text>{errorMessage}</Text> : null}

      <PhotoList />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PhotoListScreen;
