import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { setWeatherData } from "../src/redux/actions";
import weatherReducer from "../src/redux/reducer/reducers";
import { weatherData } from "../src/constants/weatherpayload";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Redux Action and Reducer Tests", () => {
  it("should create an action to set weather data", () => {
    const data = weatherData;

    // Create Mockstore
    const store = mockStore({});

    // Dispatch the action
    store.dispatch(setWeatherData(data));

    const actions = store.getActions();

    const expectedAction = {
      type: "SET_WEATHER_DATA",
      payload: data,
    };
    expect(actions).toEqual([expectedAction]);
  });

  it("should handle SET_WEATHER_DATA action in the reducer", () => {
    const initialState = {
      weatherData: {},
    };
    const data = weatherData;

    const action = {
      type: "SET_WEATHER_DATA",
      payload: data,
    };

    const newState = weatherReducer(initialState, action);

    // Expect the reducer to update the state with the new data
    expect(newState).toEqual({
      weatherData: data,
    });
  });
});
