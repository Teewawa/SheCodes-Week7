function getDayOrNight() {
  let now = new Date();
  let hour = getHours();
  let day = "day";

  if (hour > 6 && hour < 18) {
    day = "day";
  } else if (hour < 7) {
    day = "night";
  } else if (hour > 17) {
    day = "night";
  }
}
/*------------Updating the weather Icons------------------------------------*/
function getAtmosphereIcon(response) {
  let description = response.data.weather[0].description;
  let weatherIconMainElem = document.querySelector("#weatherIconMain");

  //compare description to set specific weather icons
  if (description === "tornado") {
    weatherIconMainElem.setAttribute("src", `./media/tornado.png`);
  } else if (description === "Smoke" || "volcanic ash" || "squalls") {
    weatherIconMainElem.setAttribute("src", `./media/smokeAshSqualls.png`);
  } else if (description === "mist" || "Haze" || "fog") {
    weatherIconMainElem.setAttribute("src", `./media/fogHazeMist.png`);
  } else if (description === "sand" || "dust" || "sand/ dust whirls") {
    weatherIconMainElem.setAttribute("src", `./media/dustSand.png`);
  }
}

function getThunderstormIcon(response) {
  let description = response.data.weather[0].description;
  let weatherIconMainElem = document.querySelector("#weatherIconMain");

  //compare description to set specific weather icons
  if (
    description === "thunderstorm with light rain" ||
    "thunderstorm with rain" ||
    "thunderstorm with heavy rain" ||
    "thunderstorm with light drizzle" ||
    "thunderstorm with drizzle" ||
    "thunderstorm with heavy drizzle"
  ) {
    weatherIconMainElem.setAttribute("src", `./media/thunderRain.png`);
  } else if (
    description === "light thunderstorm" ||
    "thunderstorm" ||
    "ragged thunderstorm"
  ) {
    weatherIconMainElem.setAttribute("src", `./media/thunderstorm.png`);
  }
}

function getDrizzleIcon(response) {
  let description = response.data.weather[0].description;
  let weatherIconMainElem = document.querySelector("#weatherIconMain");
  weatherIconMainElem.setAttribute("src", `./media/drizzle.png`);
}

function getRainIcon(response) {
  let description = response.data.weather[0].description;
  let weatherIconMainElem = document.querySelector("#weatherIconMain");

  //compare description to set specific weather icons
  if (description === "light rain" || "moderate rain") {
    weatherIconMainElem.setAttribute("src", `./media/rain.png`);
  } else if (description === "freezing rain") {
    weatherIconMainElem.setAttribute("src", `./media/snowRain.png`);
  } else if (
    description === "heavy intensity rain" ||
    "very heavy rain" ||
    "extreme rain" ||
    "light intensity shower rain" ||
    "shower rain" ||
    "heavy intensity shower rain" ||
    "ragged shower rain"
  ) {
    weatherIconMainElem.setAttribute("src", `./media/rainShower.png`);
  }
}

function getSnowIcon(response) {
  let description = response.date.weather[0].description;
  let weatherIconMainElem = document.querySelector("#weatherIconMain");

  //compare description to set specific weather icons
  if (description === "light snow" || "Snow" || "Heavy snow") {
    weatherIconMainElem.setAttribute("src", `./media/snow.png`);
  } else if (
    description === "Sleet" ||
    "Light shower sleet" ||
    "Shower sleet"
  ) {
    weatherIconMainElem.setAttribute("src", `./media/sleet.png`);
  } else if (
    description === "Light rain and snow" ||
    "Rain and snow" ||
    "Light shower snow" ||
    "Shower snow" ||
    "Heavy shower snow"
  ) {
    weatherIconMainElem.setAttribute("src", `./media/snowRain.png`);
  }
}

function getCloudsIcon(response) {
  let description = response.data.weather[0].description;
  let weatherIconMainElem = document.querySelector("#weatherIconMain");

  //compare description to set specific weather icons
  if (description === "few clouds") {
    weatherIconMainElem.setAttribute("src", `./media/fewClouds.png`);
  } else if (description === "scattered clouds") {
    weatherIconMainElem.setAttribute("src", `./media/scatteredClouds.png`);
  } else if (description === "broken clouds" || "overcast clouds") {
    weatherIconMainElem.setAttribute("src", `./media/clouds.png`);
  }
}

function getClearSkyIcon(response) {
  let weatherIconMainElem = document.querySelector("#weatherIconMain");
  weatherIconMainElem.setAttribute("src", `./media/clearSky.png`);
}

function getMainWeather(response) {
  let main = response.data.weather[0].main;
  console.log(`get main weather ${main}`);
  return main;
}

function updateMainWeatherIcon(response) {
  let main = getMainWeather(response);
  console.log(`update main: main is ${main}`);

  //compare main weather description then call specific function
  if (main === "Clear") {
    getClearSkyIcon(response);
  } else if (main === "Clouds") {
    getCloudsIcon(response);
  } else if (main === "Snow") {
    getSnowIcon(response);
  } else if (main === "Rain") {
    getRainIcon(response);
  } else if (main === "Drizzle") {
    getDrizzleIcon(response);
  } else if (main === "Thunderstorm") {
    getThunderstormIcon(response);
  } else {
    getAtmosphereIcon(response);
  }
}

/*-----------------------------------------*/
function getLocation(response) {
  let locationElement = document.querySelector("#location");
  let city = response.data.name;
  let country = response.data.sys.country;
  let location = `${city}, ${country}`;
  let timeZone = response.data.timezone;
  locationElement.innerHTML = `${location}`;
  console.log(response.data);
}

function getWeatherDescription(response) {
  let description = response.data.weather[0].description;
  let descriptionElem = document.querySelector(".weatherStatus");
  descriptionElem.innerHTML = `${description}`;
}

function getTemperature(response) {
  let temperatureElem = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureElem.innerHTML = `${temperature}`;
}

function getFeelsLike(response) {
  let feelsLikeElem = document.querySelector("#feelsLike");
  let feelsLike = Math.round(response.data.main.feels_like);
  feelsLikeElem.innerHTML = `${feelsLike}`;
}

function getHumidity(response) {
  let humidityElem = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  humidityElem.innerHTML = `${humidity}%`;
}

function getWindSpeed(response) {
  let windSpeedElem = document.querySelector("#windSpeed");
  let mps = response.data.wind.speed;
  let windSpeed = Math.round(mps * (1000 / 3600)); //cover to km/h
  windSpeedElem.innerHTML = `${windSpeed} km/h`;
}

function getWeather(response) {
  getLocation(response);
  getWeatherDescription(response);
  getTemperature(response);
  getFeelsLike(response);
  getHumidity(response);
  getWindSpeed(response);
  updateMainWeatherIcon(response);
}

function searchLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let location = document.querySelector("#location");

  //Condition for blank entries
  let input = searchInput.value.trim();
  if (input) {
    location.innerHTML = `Searching location...`;
  } else {
    location.innerHTML = null;
    alert("Please enter a location.");
  }

  let city = searchInput.value;
  let units = "metric";
  let apiKey = "32002ce1ac753de34a94e79ba08a9e9b";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  //Get weather data
  axios.get(`${apiUrl}`).then(getWeather);

  //Clear the search bar after submission
  document.getElementById("search-form").reset();
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchLocation);

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "32002ce1ac753de34a94e79ba08a9e9b";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(getWeather);
}

function clickedCurrent() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationBttn = document.querySelector("#currentLocationBttn");
currentLocationBttn.addEventListener("click", clickedCurrent);

//Date format: Day, Month DD, YYYY
function getTodaysDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();

  return `${day}, ${month} ${date}, ${year}`;
}

//Time format: 12-hour period AM/PM
function getTimeNow() {
  let now = new Date();
  let hour = String(now.getHours()).padStart(0, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let seconds = String(now.getSeconds()).padStart(2, "0");
  let meridiem = "";

  if (hour < 12) {
    meridiem = "AM";
  } else if (hour === 12) {
    meridiem = "PM";
  } else if (hour === 24) {
    hour = hour - 12;
    meridiem = "AM";
  } else {
    hour = hour - 12;
    meridiem = "PM";
  }
  let time = `${hour}:${minutes}:${seconds} ${meridiem}`;
  timeNow.innerHTML = `${time}`;

  //Performs function for a 'live clock'
  let t = setTimeout(function () {
    getTimeNow();
  }, 1000);
}

//Greeting format: Morning 12AM-11AM, Afternoon 12PM-5PM, Evening 6PM-11PM
function getGreeting(now) {
  let hour = now.getHours();
  let greeting = "";
  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good Afternoon";
  } else if (hour > 17 && hour < 24) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Morning";
  }
  return `${greeting}`;
}

let now = new Date();
let dateToday = document.querySelector("#date-today");
let timeNow = document.querySelector("#time-now");
let greeting = document.querySelector("#greeting");

dateToday.innerHTML = getTodaysDate(now);
greeting.innerHTML = getGreeting(now);
getTimeNow();

/*Fahrenheit/Celsisu function
(17) in Celsius and add link to covert it to Fahrenheit. When clicking 
on it, it should covert the temperature to Fahrenheit. When clicking on 
Celsius, it should convert it back to Celsius
function getFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#temperature");
  fahrenheit.innerHTML = "63";
}
function getCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#temperature");
  celsius.innerHTML = "17";
}
let fahrenheitBttn = document.querySelector("#fahrenheit-link");
let celsiusBttn = document.querySelector("#celsius-link");
//fahrenheitBttn.addEventListener("click", getFahrenheit);
//celsiusBttn.addEventListener("click", getCelsius);
*/
