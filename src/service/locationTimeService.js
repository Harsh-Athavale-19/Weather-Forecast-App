import { toast } from "react-toastify";

let cityTimezones = require("city-timezones");

const API_KEY = process.env.REACT_APP_WEATHER_API;
const BASE_LOC_URL = "https://api.openweathermap.org/geo/1.0/";

const searchCityName = async (infoType, searchParams) => {
  const loc_url = new URL(BASE_LOC_URL + infoType);
  loc_url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  const loc_res = await fetch(loc_url);
  return await loc_res.json();
};

const getCityName = async (lat, lon) => {
  const city_name = await searchCityName("reverse", {
    lat,
    lon,
  });
  return city_name;
};

const getTimezone = async (lat, lon) => {
  try {
    const cityName = await getCityName(lat, lon); //Retuns Array of Object
    // console.log("cityName", cityName);
    //   const cityToTimeZone = cityTimezones.lookupViaCity(cityName[0].name);
    const cityToTimeZone = cityTimezones.findFromCityStateProvince(
      cityName[0].name
    );
    // console.log("cityToTimeZone", cityToTimeZone);
    const timeZoneName = cityToTimeZone[0].timezone;
    // console.log("timeZoneName", timeZoneName);
    return timeZoneName;
  } catch (error) {
    const defaultTimeZoneName = "Asia/Kolkata";
    toast.error("Timezone Not Found in API ");
    console.log("Timezone Not Found");
    toast.info("Timezone set to default " + defaultTimeZoneName);
    return defaultTimeZoneName;
  }
};

export default getTimezone;
