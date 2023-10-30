import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weatherData: {},
    loading: true,
  },
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
      state.loading = false;
    },
  },
});

export const { setWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
