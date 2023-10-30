import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import weatherReducer from "./reducer/reducers";

const middleware = getDefaultMiddleware({
  serializableCheck: {
    // Increase the warning threshold (default is 32ms)
    warningTimeout: 50,
  },
});

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware,
});

export default store;
