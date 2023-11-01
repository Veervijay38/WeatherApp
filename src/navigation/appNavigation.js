import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import weatherScreen from "../screens/weatherScreen";
import { Provider } from "react-redux";
import store from "../redux/store";

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
