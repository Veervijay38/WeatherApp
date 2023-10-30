import React from "react";
import { render } from "@testing-library/react-native";
import Weather from "./weatherScreen";

describe("Weather Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Weather />);
    const textElement = getByText("Your expected text here");
    expect(textElement).toBeTruthy();
  });
});
