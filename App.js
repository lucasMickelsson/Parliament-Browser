import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";

import Homescreen from "./components/homescreen";
import MembersScreen from "./components/membersscreen";

const Stack = createStackNavigator();

const App = () => {
  const ImageHeader = () => {
    return (
      <Image
        source={require("./assets/Alands_Lagting_Logo.png")}
        style={{ width: 180, height: 60 }} // Adjust width and height as per your image
        resizeMode="contain" // Adjust resizeMode as per your image
      />
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Välkommen"
          component={Homescreen}
          options={{
            headerTitle: (props) => <ImageHeader {...props} />,
          }}
        />
        <Stack.Screen name="Members" component={MembersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
