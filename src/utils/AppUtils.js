import { PermissionsAndroid, Platform } from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
import RNFetchBlob from 'rn-fetch-blob'
import AsyncStorage from '@react-native-community/async-storage'

const SWIPE_HINT = 'swipe_hint'

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

  const hasPermission = await PermissionsAndroid.check(permission)
  if (hasPermission) {
    return true
  }

  const status = await PermissionsAndroid.request(permission)
  return status === 'granted'
}

const saveImage = async (imageUrl) => {
  if (!(await hasAndroidPermission())) return

  const imageName = `${Date.now()}.jpeg`
  const dirs = RNFetchBlob.fs.dirs
  const path =
    Platform.OS === 'ios'
      ? dirs['MainBundleDir'] + '/' + imageName
      : dirs.PictureDir + '/' + imageName

  if (Platform.OS == 'android') {
    try {
      await RNFetchBlob.config({
        fileCache: true,
        appendExt: 'jpeg',
        indicator: true,
        IOSBackgroundTask: true,
        path: path,
        addAndroidDownloads: {
          title: imageName,
          useDownloadManager: true,
          notification: true,
          path: path,
          description: 'Image'
        }
      }).fetch('GET', imageUrl)
    } catch (error) {
      console.log('Error saving image: ', error)
    }
  } else {
    await CameraRoll.saveToCameraRoll(imageUrl)
  }
}

const isSwipeHintShown = async () => {
  try {
    const value = await AsyncStorage.getItem(SWIPE_HINT)
    return value !== null ? JSON.parse(value) : false
  } catch (e) {
    console.log(`Error reading ${SWIPE_HINT} key from storage`)
    return false
  }
}

const setSwipeHint = async (swipeHint = true) => {
  try {
    await AsyncStorage.setItem(SWIPE_HINT, JSON.stringify(swipeHint))
  } catch (e) {
    console.log(`Error storing ${SWIPE_HINT} in storage`)
  }
}

export { saveImage, isSwipeHintShown, setSwipeHint }
