import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import * as Progress from "react-native-progress";
import { theme } from "../theme";
import { debounce } from "lodash";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
import {
  fetchLocations,
  fetchWeatherForecast,
  fetchLiveLocations,
} from "../api/fetchweather";
import { weatherImages, weatherbackground } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { setWeatherData } from "../redux/actions";

const selectLocation = (state) => state.weather.weatherData.location;
const selectCurrent = (state) => state.weather.weatherData.current;

// Weather function starts here
export default function Weather() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const weatherData = useSelector((state) => state.weather.weatherData);
  const location = useSelector(selectLocation);
  const current = useSelector(selectCurrent);
  const dispatch = useDispatch();

  // Function for fetching weather data based on the user's current location
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
        timeout: 5000,
      });

      const { latitude, longitude } = location.coords;

      fetchLiveLocations({
        latitude,
        longitude,
      })
        .then((data) => {
          if (data && data.length > 0) {
            const cityName = data[0].name;
            return fetchWeatherForecast({
              cityName,
              days: "7",
            });
          } else {
            Alert.alert("Error", "Error getting the locations");
          }
        })
        .then((weatherData) => {
          if (weatherData) {
            setLoading(false);
            dispatch(setWeatherData(weatherData));
          } else {
            Alert.alert("Error", "No weather data found");
          }
        })
        .catch((error) => {
          Alert.alert("Error", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getLocation();
    }, [])
  );

  // Function for fetching the location via input field
  const handleSearch = (search) => {
    if (search && search.length > 2)
      fetchLocations({ cityName: search }).then((data) => {
        setLocations(data);
      });
  };

  // Fetching the weather data
  const handleLocation = (loc) => {
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setLoading(false);
      dispatch(setWeatherData(data));
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  // Rendering UI starts here
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#083139" barStyle={"default"} />
      {/* Loader and background image */}
      <ImageBackground
        blurRadius={70}
        source={weatherbackground[current?.condition?.text || "other"]}
        resizeMode="cover"
        style={styles.bgImage}
      >
        {loading ? (
          <View style={styles.loadingspinner}>
            <Progress.CircleSnail
              thickness={10}
              size={140}
              color="#0bb3b2"
              testID="loading-spinner"
            />
          </View>
        ) : (
          <SafeAreaView style={styles.subcontainer}>
            {/* search section */}
            <View style={styles.subview}>
              <View
                style={[
                  styles.subview1,
                  {
                    backgroundColor: showSearch
                      ? theme.bgWhite(0.2)
                      : "transparent",
                    borderColor: showSearch ? "gray" : "transparent",
                  },
                ]}
              >
                {showSearch ? (
                  <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Get Weather"
                    placeholderTextColor={"lightgray"}
                    style={styles.textInput}
                  />
                ) : null}

                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => toggleSearch(!showSearch)}
                >
                  {showSearch ? (
                    <XMarkIcon size="25" color="white" />
                  ) : (
                    <MagnifyingGlassIcon size="25" color="white" />
                  )}
                </TouchableOpacity>
              </View>
              {locations.length > 0 && showSearch ? (
                <View style={styles.locationview}>
                  {locations.map((loc, index) => {
                    let showborder = index + 1 != locations.length;
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleLocation(loc)}
                        style={[
                          styles.sublocationview,
                          { borderBottomWidth: showborder ? 1 : 0 },
                        ]}
                        testID="location-item"
                      >
                        <MapPinIcon size="20" color="gray" />
                        <Text style={styles.locationtext}>
                          {loc?.name}, {loc?.country}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>

            {/* Forecast View */}
            <View style={styles.forecastview}>
              {/* Location */}
              <Text style={styles.cityname}>
                {location?.name},
                <Text style={styles.countryname}>{location?.country}</Text>
              </Text>
              {/* waether icon */}
              <View style={styles.weathericonview}>
                <Image
                  style={styles.weatherimage}
                  source={weatherImages[current?.condition?.text || "other"]}
                />
              </View>
              {/* Temerature */}
              <View style={{ marginTop: 8 }}>
                <Text style={styles.temptext}>{current?.temp_c}&#176;</Text>
                <Text style={styles.currentcondition}>
                  {current?.condition?.text}
                </Text>
              </View>
              {/* Other stats */}
              <View style={styles.otherstatview}>
                <View style={styles.subviewstat}>
                  <Image
                    source={require("../assets/icons/wind.png")}
                    style={styles.statimage}
                  />
                  <Text style={styles.stattext}>{current?.wind_kph} km</Text>
                </View>
                <View style={styles.subviewstat}>
                  <Image
                    source={require("../assets/icons/drop.png")}
                    style={styles.statimage}
                  />
                  <Text style={styles.stattext}>{current?.humidity} %</Text>
                </View>
                <View style={styles.subviewstat}>
                  <Image
                    source={require("../assets/icons/sunIcon.png")}
                    style={styles.statimage}
                  />
                  <Text style={styles.stattext}>
                    {weatherData?.forecast?.forecastday[0]?.astro?.sunrise}
                  </Text>
                </View>
              </View>
            </View>
            {/* forecast for next days */}
            <View style={{ marginBottom: 10, marginTop: 5 }}>
              <View style={styles.forecasttitleview}>
                <CalendarDaysIcon size="22" color="white" />
                <Text style={styles.forecasttitle}>Daily forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
              >
                {weatherData?.forecast?.forecastday?.map((item, index) => {
                  const date = new Date(item.date);
                  const options = { weekday: "long" };
                  let dayName = date.toLocaleDateString("en-US", options);
                  dayName = dayName.split(",")[0];
                  return (
                    <View key={index} style={styles.forecastScrollview}>
                      <Image
                        source={
                          weatherImages[item?.day?.condition?.text || "other"]
                        }
                        style={{ width: 40, height: 40 }}
                      />
                      <Text style={{ color: "white" }}> {dayName}</Text>
                      <Text style={{ color: "white" }}>
                        {item?.day?.avgtemp_c}&#176;
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </SafeAreaView>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
  },
  loadingspinner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  subcontainer: {
    flex: 1,
    display: "flex",
  },
  subview: {
    marginTop: "5%",
    height: "7%",
    marginLeft: 16,
    marginRight: 16,
    position: "relative",
    zIndex: 50,
  },
  subview1: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 100,
  },
  textInput: {
    flex: 1,
    paddingLeft: 20,
    height: 40,
    fontSize: 16,
    color: "white",
  },
  icon: {
    backgroundColor: theme.bgWhite(0.3),
    borderRadius: 100,
    padding: 12,
    margin: 4,
  },
  locationview: {
    width: "100%",
    backgroundColor: "#e2e8f0",
    marginTop: 10,
    borderRadius: 24,
  },
  locationtext: {
    fontSize: 17,
    color: "black",
    marginLeft: 5,
  },
  sublocationview: {
    flexDirection: "row",
    padding: 12,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
  },
  forecastview: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
  },
  cityname: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  countryname: {
    fontSize: 18,
    fontWeight: "500",
    color: "#e2e8f0",
  },
  weathericonview: { flexDirection: "row", justifyContent: "center" },
  weatherimage: { height: 208, width: 208 },
  temptext: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
    fontSize: 64,
  },
  currentcondition: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    letterSpacing: 1.6,
  },
  otherstatview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 16,
    marginRight: 16,
  },
  subviewstat: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  statimage: { width: 24, height: 24 },
  stattext: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 5,
  },
  forecasttitleview: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  forecasttitle: { color: "white", fontSize: 16, marginLeft: 10 },
  forecastScrollview: {
    backgroundColor: theme.bgWhite(0.15),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 96,
    borderRadius: 20,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 20,
    marginRight: 16,
  },
});
