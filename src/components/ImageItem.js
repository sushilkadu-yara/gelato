import React from 'react'
import { View, StyleSheet } from 'react-native'
import ImageLoad from 'react-native-image-placeholder'
import PropTypes from 'prop-types'

const ImageItem = ({ id, source, imageStyle }) => {
  return (
    <View style={styles.container}>
      <ImageLoad key={id} source={source} style={imageStyle} />
    </View>
  )
}

ImageItem.propTypes = {
  id: PropTypes.number.isRequired,
  source: PropTypes.object.isRequired,
  imageStyle: PropTypes.object.isRequired
}

ImageItem.defaultProps = {
  id: 1,
  source: {},
  imageStyle: {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1
  }
})

export default ImageItem
