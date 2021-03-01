import React from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import ImageItem from './ImageItem'
import PropTypes from 'prop-types'

const PhotoList = ({ photoList, onLoadNextPage, onItemClicked }) => {
  // TODO remove unwanted code
  // const onViewRef = React.useRef(({ changed }) => {
  //   const { index } = changed[changed.length - 1]
  // })
  // const viewConfigRef = React.useRef({ itemVisiblePercentThreshold: 80 })

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

PhotoList.propTypes = {
  photoList: PropTypes.array,
  onLoadNextPage: PropTypes.func,
  onItemClicked: PropTypes.func
}

PhotoList.defaultProps = {
  photoList: [],
  onLoadNextPage: () => {},
  onItemClicked: () => {}
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
