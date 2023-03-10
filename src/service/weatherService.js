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

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  return formattedCurrentWeather;
};

export default getFormattedWeatherData;
