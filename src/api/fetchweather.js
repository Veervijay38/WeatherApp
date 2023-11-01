import axios from "axios";
import { Alert } from "react-native";
import { apiKey } from "../constants";

const baseURL = "https://api.weatherapi.com/v1";
const forecastEndpoint = "/forecast.json";
const searchEndpoint = "/search.json";

const api = axios.create({
  baseURL,
  params: {
    key: apiKey,
  },
});

export const fetchWeatherForecast = async (params) => {
  try {
    const response = await api.get(forecastEndpoint, {
      params: {
        q: params.cityName,
        days: params.days,
      },
    });
    return response.data;
  } catch (error) {
    Alert.alert("Error", "An error occurred while fetching weather data.");
    throw error;
  }
};

export const fetchLocations = async (params) => {
  try {
    const response = await api.get(searchEndpoint, {
      params: {
        q: params.cityName,
      },
    });
    return response.data;
  } catch (error) {
    Alert.alert("Error", "An error occurred while fetching locations.");
    throw error;
  }
};

export const fetchLiveLocations = async (params) => {
  try {
    const response = await api.get(searchEndpoint, {
      params: {
        q: `${params.latitude},${params.longitude}`,
      },
    });
    return response.data;
  } catch (error) {
    Alert.alert("Error", "An error occurred while fetching live locations.");
    throw error;
  }
};
