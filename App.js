import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { PhotoProvider } from "./src/context/PhotoContext";
import PhotoDetailsScreen from "./src/screens/PhotoDetailsScreen";
import PhotoListScreen from "./src/screens/PhotoListScreen";

const navigator = createStackNavigator(
  {
    PhotoList: PhotoListScreen,
    PhotoDetails: PhotoDetailsScreen,
  },
  {
    initialRouteName: "PhotoList",
    defaultNavigationOptions: {
      title: "Photo List",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <PhotoProvider>
      <App />
    </PhotoProvider>
  );
};
