import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox, Text, View } from "react-native";
import weatherScreen from "../screens/weatherScreen";
import { Provider } from "react-redux";
import store from "../redux/store";

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function AppNavigation() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Weather"
            options={{ headerShown: false }}
            component={weatherScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
