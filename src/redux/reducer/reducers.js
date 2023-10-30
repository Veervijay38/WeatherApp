import { SET_WEATHER_DATA } from "../actions";

const initialState = {
  weatherData: {},
  loading: true,
};

function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WEATHER_DATA:
      return { ...state, weatherData: action.payload, loading: false };

    default:
      return state;
  }
}

export default weatherReducer;
