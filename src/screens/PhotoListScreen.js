import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import usePhotoListResponse from "./../hooks/usePhotoListResponse";
import PhotoList from "./../components/PhotoList";
import { Context } from "../context/PhotoContext";

const PhotoListScreen = ({ navigation }) => {
  const [photoListApi, errorMessage, loading] = usePhotoListResponse();

  const onItemClicked = (item) => {
    navigation.navigate("PhotoDetails", { item });
  };

  const { state } = useContext(Context);

  return (
    <View>
      <Text>Total photos loaded: {state.length}</Text>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {loading ? <Text>Loading next page</Text> : null}
      <PhotoList
        photoList={state}
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
