import { setWeatherData } from "../redux/actions";

describe("Redux Actions", () => {
  it("should create an action to set weather data", () => {
    const data = {
      /* your test data here */
    };
    const expectedAction = {
      type: "SET_WEATHER_DATA",
      payload: data,
    };
    expect(setWeatherData(data)).toEqual(expectedAction);
  });
});
