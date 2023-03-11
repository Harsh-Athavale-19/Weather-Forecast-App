# Location Finding

const getTimezone = async (lat, lon) => {
console.log("cityname", city_name);
console.log("cityname", city_name[0].name); // Isse city name mill gaya :- Mumbai
console.log("cityname type", typeof city_name[0].name); // Isse city name mill gaya :- Mumbai

const timeZone = cityTimezones.findFromCityStateProvince(city_name);
console.log("timeZone", timeZone[0].timezone);
return await timeZone[0].timezone;

const cityLookup = await cityTimezones.findFromCityStateProvince(city_name);
// const cityLookup = cityTimezones.lookupViaCity(cityName);
let timeZoneName = cityLookup[0].timezone;
// console.log(timeZoneName);
// console.log("cityLook", cityLookup);
// console.log("cityName", cityName);
// console.log("lan,lon", lat, lon);

console.log("ci", ci_name[0].name);
return timeZoneName;
};

\_-------------------------------------------------------
const getWeatherData = async (infoType, searchParams) => {
const url = new URL(BASE_URL + infoType);
url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

const res = await fetch(url);
return await res.json();
};

const loc_url =
"http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid={API key}";
