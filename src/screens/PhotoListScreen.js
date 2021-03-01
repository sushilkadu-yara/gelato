import React, { useContext } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import usePhotoListResponse from './../hooks/usePhotoListResponse'
import PhotoList from './../components/PhotoList'
import { Context } from '../context/PhotoContext'

import GalleryShimmering from '../components/GalleryShimmering'

const PhotoListScreen = ({ navigation }) => {
  const [photoListApi] = usePhotoListResponse()

  const onItemClicked = (item) => {
    navigation.navigate('PhotoDetails', {
      index: state.photoList.indexOf(item)
    })
  }

  const { state } = useContext(Context)

  return (
    <View>
      <Text>Total photos loaded: {state.photoList.length}</Text>
      {state.error ? <Text>{state.error}</Text> : null}

      {state.photoList.length == 0 ? <GalleryShimmering /> : null}

      <PhotoList
        photoList={state.photoList}
        onLoadNextPage={() => {
          photoListApi()
        }}
        loading={state.loading}
        onItemClicked={onItemClicked}
      />

      {state.loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingStyle}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  loadingStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default PhotoListScreen
