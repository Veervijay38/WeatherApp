import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AppNavigation from "../App";
import WeatherScreen from "../src/screens/weatherScreen";

describe("AppNavigation Component", () => {
  it("renders without errors and matches snapshot", () => {
    const { toJSON } = render(<AppNavigation />);
    expect(toJSON()).toMatchSnapshot();
  });
});
