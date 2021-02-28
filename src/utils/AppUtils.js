import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import RNFetchBlob from "rn-fetch-blob";
import RNFS from "react-native-fs";
import AsyncStorage from "@react-native-community/async-storage";

const SWIPE_HINT = "swipe_hint";

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === "granted";
}

async function savePicture() {
  if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    return;
  }

  CameraRoll.save(tag, { type, album });
}

const saveImage = async (imageUrl) => {
  if (!(await hasAndroidPermission())) return;

  const imageName = `/${Date.now()}.jpeg`;
  const dirs = RNFetchBlob.fs.dirs;
  const path =
    Platform.OS === "ios"
      ? dirs["MainBundleDir"] + imageName
      : dirs.PictureDir + imageName;

  if (Platform.OS == "android") {
    try {
      const response = await RNFetchBlob.config({
        fileCache: true,
        appendExt: "jpeg",
        indicator: true,
        IOSBackgroundTask: true,
        path: path,
        addAndroidDownloads: {
          useDownloadManager: false,
          notification: true,
          path: path,
          description: "Image",
        },
      }).fetch("GET", imageUrl);
      //   //   await CameraRoll.saveToCameraRoll(imageUrl);

      //   const storeLocation = `${RNFS.PicturesDirectoryPath}/galeto`;
      //   let pathName = new Date().getTime() + ".jpeg";
      //   let downloadDest = `${storeLocation}/${pathName}`;
      //   const ret = await RNFS.downloadFile({
      //     fromUrl: imageUrl,
      //     toFile: downloadDest,
      //   });
      //   const res = await ret.promise;
      //   console.log("RES: ", res);
      //   if (res && res.statusCode === 200) {
      //     await CameraRoll.saveToCameraRoll("file://" + downloadDest);
      //   }
    } catch (error) {
      console.log("Error saving image: ", error);
    }
  } else {
    await CameraRoll.saveToCameraRoll(imageUrl);
  }
};

const isSwipeHintShown = async () => {
  try {
    const value = await AsyncStorage.getItem(SWIPE_HINT);
    return value !== null ? JSON.parse(value) : false;
  } catch (e) {
    Logger.error(`Error reading ${SWIPE_HINT} key from storage`);
    return false;
  }
};

const setSwipeHint = async (swipeHint = true) => {
  try {
    await AsyncStorage.setItem(SWIPE_HINT, JSON.stringify(swipeHint));
  } catch (e) {
    Logger.error(`Error storing ${SWIPE_HINT} in storage`);
  }
};

export { saveImage, isSwipeHintShown, setSwipeHint };
