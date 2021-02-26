import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import PhotoListScreen from "./src/screens/PhotoListScreen";

const navigator = createStackNavigator(
  {
    PhotoList: PhotoListScreen,
  },
  {
    initialRouteName: "PhotoList",
    defaultNavigationOptions: {
      title: "Photo List",
    },
  }
);

export default createAppContainer(navigator);
