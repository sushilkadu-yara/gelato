import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
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

export default createAppContainer(navigator);
