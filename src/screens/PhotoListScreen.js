import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import usePhotoListResponse from "./../hooks/usePhotoListResponse";
import PhotoList from "./../components/PhotoList";
import { Context } from "../context/PhotoContext";

const PhotoListScreen = ({ navigation }) => {
  const [photoListApi] = usePhotoListResponse();

  const onItemClicked = (item) => {
    navigation.navigate("PhotoDetails", { item });
  };

  const { state } = useContext(Context);

  return (
    <View>
      <Text>Total photos loaded: {state.photoList.length}</Text>
      {state.error ? <Text>{state.error}</Text> : null}
      {state.loading ? <Text>Loading next page</Text> : null}
      <PhotoList
        photoList={state.photoList}
        onLoadNextPage={() => {
          photoListApi();
        }}
        loading={state.loading}
        onItemClicked={onItemClicked}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PhotoListScreen;
