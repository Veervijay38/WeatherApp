import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox, Text, View } from "react-native";
import weatherScreen from "./src/screens/weatherScreen";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const Stack = createNativeStackNavigator();

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
