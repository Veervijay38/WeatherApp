import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

describe("App Component", () => {
  it("renders without errors and matches snapshot", () => {
    const { toJSON } = render(<App />);
    expect(toJSON()).toMatchSnapshot();
  });
});
