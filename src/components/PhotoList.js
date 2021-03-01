import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import ImageItem from './ImageItem'

const ITEM_VISIBILITY_THRESHOLD = 25

const PhotoList = ({ photoList, onLoadNextPage, loading, onItemClicked }) => {
  const onViewRef = React.useRef(({ changed }) => {
    const { index } = changed[changed.length - 1]
  })
  const viewConfigRef = React.useRef({ itemVisiblePercentThreshold: 80 })

  /**
   * Function to render individual item
   * @param {Data to be rendered} item
   */
  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onItemClicked(item)}>
        <ImageItem
          key={item.id}
          imageStyle={styles.imageThumbnail}
          source={{ uri: item.uri }}
        />
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <FlatList
        data={photoList}
        keyExtractor={(item) => {
          return item.id
        }}
        renderItem={({ item }) => {
          return renderItem(item)
        }}
        numColumns={3}
        onEndReachedThreshold={0.6}
        onEndReached={() => onLoadNextPage()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  }
})

export default PhotoList
