import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import WeatherScreen from "../src/screens/weatherScreen";
import { NavigationContainer } from "@react-navigation/native";

describe("Weather Component", () => {
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

  it("should render loading spinner when loading is true", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          <WeatherScreen loading={true} />
        </NavigationContainer>
      </Provider>
    );

    const loadingSpinner = getByTestId("loading-spinner");
    expect(loadingSpinner).toBeTruthy();
  });
});

describe("LocationsList Component", () => {
  it("should not render a list of locations when locations.length > 0 but showSearch is false", () => {
    const locations = [
      { name: "Hamilton", country: "Canada" },
      { name: "Toronto", country: "Canada" },
    ];

    render(
      <Provider store={store}>
        <NavigationContainer>
          <WeatherScreen locations={locations} showSearch={false} />
        </NavigationContainer>
      </Provider>
    );

    const locationItems = screen.queryAllByTestId("location-item");
    expect(locationItems).toHaveLength(0);
  });

  it("should not render a list of locations when locations.length is 0", () => {
    const locations = [];

    render(
      <Provider store={store}>
        <NavigationContainer>
          <WeatherScreen locations={locations} showSearch={true} />
        </NavigationContainer>
      </Provider>
    );

    const locationItems = screen.queryAllByTestId("location-item");
    expect(locationItems).toHaveLength(0);
  });
});
