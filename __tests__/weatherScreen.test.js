import React from "react";
import { render, waitFor, act } from "@testing-library/react-native";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import WeatherScreen from "../src/screens/weatherScreen";
import { NavigationContainer } from "@react-navigation/native";

it("Weather Component > renders without errors and matches snapshot", () => {
  const { toJSON } = render(
    <Provider store={store}>
      <NavigationContainer>
        <WeatherScreen />
      </NavigationContainer>
    </Provider>
  );

  expect(toJSON()).toMatchSnapshot();
});

// it("displays error message on API error", async () => {
//     act(async () => {
//       const { getByText } = render(
//         <Provider store={store}>
//           <NavigationContainer>
//             <WeatherScreen />
//           </NavigationContainer>
//         </Provider>
//       );

//       await waitFor(() => {
//         expect(getByText("An error occurred")).toBeTruthy();
//       });
//     });
//   });
