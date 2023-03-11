import { DateTime } from "luxon";
let cityTimezones = require("city-timezones");

const API_KEY = "2aebd46de19bf3e918c2c0bcb2c85580";
const BASE_URL = "http://api.openweathermap.org/data/2.5/";

// Function to call api to get all data
// infoType :- weather,forecast,onecall
// searchParams :- lat,lon,city_name,etc

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

// Function to format current weather
const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    weather,
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    dt,
    sys: { country, sunrise, sunset },
    id,
    name,
  } = data;
  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    details,
    icon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    speed,
    dt,
    country,
    sunrise,
    sunset,
    id,
    name,
  };
};
// Function to format forecast weather
const formatForecastWeather = (data) => {
  let { list, city } = data;
  let timezone = getTimezone(city.name);
  list = list.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.main.temp,
      icon: d.weather[0].icon,
    };
  });
  //   console.log("city",city);
  //   console.log("timezone",timezone);
  //   console.log("list",list);
  return { timezone, list };
};

// Function To get Formatted Weather data from both current and forecast
const getFormattedWeatherData = async (searchParams) => {
  // Get Current Formatted Data from 'weather'
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  //Get Forecast Formatted Data from 'forecast'
  const { lat, lon } = formattedCurrentWeather;
  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

// Function to get Local Date,Time using luxon

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

// Function for icon url
const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

const getTimezone = (cityName) => {
  const cityLookup = cityTimezones.findFromCityStateProvince(cityName);
  //   const cityLookup = cityTimezones.lookupViaCity(cityName);
  let timeZoneName = cityLookup[0].timezone;
  console.log(timeZoneName);
  return timeZoneName;
};

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
