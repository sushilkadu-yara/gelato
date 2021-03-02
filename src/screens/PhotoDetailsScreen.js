import React, { useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Context } from '../context/PhotoContext'
import { Feather } from 'react-native-vector-icons'
import Share from 'react-native-share'
import { getFileData } from './../api/picsum'
import { saveImage, isSwipeHintShown, setSwipeHint } from './../utils/AppUtils'
import { useState } from 'react'
import Snackbar from 'react-native-snackbar'
import GallerySwiper from 'react-native-gallery-swiper'

import styles from './styles/PhotoDetailsScreenStyle'

let item

const SWIPE_COUNT_THRESHOLD = 10

const PhotoDetailsScreen = ({ navigation }) => {
  const incomingIndex = navigation.getParam('index')
  const { state } = useContext(Context)
  const [photoList, setPhotoList] = useState([])

  const [currentAuthor, setCurrentAuthor] = useState('')

  const [currentIndex] = useState(
    incomingIndex > SWIPE_COUNT_THRESHOLD
      ? SWIPE_COUNT_THRESHOLD
      : incomingIndex
  )

  const initGallery = (pivot) => {
    let leftEnd = 0
    if (pivot - SWIPE_COUNT_THRESHOLD > 0) {
      leftEnd = pivot - SWIPE_COUNT_THRESHOLD
    }

    let rightEnd = pivot + SWIPE_COUNT_THRESHOLD
    if (rightEnd > state.photoList.length) {
      rightEnd = state.photoList.length - 1
    }

    const updatedList = state.photoList.slice(leftEnd, rightEnd)
    setPhotoList(updatedList)
  }

  useEffect(() => {
    initGallery(incomingIndex)
    showSnackBar()
  }, [])

  useEffect(() => {
    return () => {
      Snackbar.dismiss()
    }
  }, [])

  const showGalleryIndex = () => {
    return currentAuthor ? (
      <View style={styles.pageCounterContainerStyle}>
        <Text style={styles.pageCounterTextStyle}>{currentAuthor}</Text>
      </View>
    ) : null
  }

  const showSnackBar = async () => {
    const result = await isSwipeHintShown()
    if (result) return

    // TODO I18 support
    Snackbar.show({
      text: 'You can swipe left or right to explore more photos',
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        text: 'OK',
        textColor: 'green',
        onPress: async () => {
          setSwipeHint(true)
        }
      }
    })
  }

  const onPageSelected = (index) => {
    item = photoList[index]
    setCurrentAuthor(item.author)
  }

  if (photoList.length <= 0) return null

  return (
    <View style={{ flex: 1 }}>
      <GallerySwiper
        style={{ flex: 1, backgroundColor: 'black' }}
        images={photoList}
        initialPage={currentIndex}
        initialNumToRender={photoList.length}
        onPageSelected={onPageSelected}
        sensitiveScroll={false}
      />
      {showGalleryIndex()}
    </View>
  )
}

// LINT error fix
// PhotoDetailsScreen.displayName = 'PhotoDetailsScreen'

const shareImage = async () => {
  try {
    const data = await getFileData(item.uri)
    const options = {
      type: 'image/jpeg',
      url: data
    }
    await Share.open(options)
  } catch (error) {
    console.log('Error while sharing an image: ', error)
  }
}

PhotoDetailsScreen.navigationOptions = () => {
  return {
    headerRight: () => (
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={async () => {
            console.log('Saving image to galley')
            await saveImage(item.uri)
          }}>
          <Feather name="save" size={30} style={styles.saveIconStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shareImage()}>
          <Feather name="share-2" size={30} style={styles.saveIconStyle} />
        </TouchableOpacity>
      </View>
    ),
    headerRightContainerStyle: styles.iconContainer,
    title: 'Photo Details'
  }
}

export default PhotoDetailsScreen
