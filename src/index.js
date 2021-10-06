// The current date & time
let time = document.querySelector(".time");
let currentTime = new Date();
let date = currentTime.getDate();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = currentTime.getFullYear();

let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thur",
  "Fri",
  "Sat"
];
let day = days[currentTime.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[currentTime.getMonth()];

time.innerHTML = `${day}, ${month} ${date}, ${year} <br/> ${hours}:${minutes}`;


//Changing Celcius to Fahrenheit
function changeToFahrenheit(event) {
  event.preventDefault();
  let changeCelcius = document.querySelector("#temp-to-change");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  let Fahrenheit = 84;
  fahrenheitLink.innerHTML = `°F`;
  changeCelcius.innerHTML = `${Fahrenheit}`;
}
let changeTemp = document.querySelector("#fahrenheit-link");
changeTemp.addEventListener("click", changeToFahrenheit);

//changing Fahrenheit to Celcius
function changeToCelcius(event) {
  event.preventDefault();
  let changeFahrenheit = document.querySelector("#temp-to-change");
  let celciusLink = document.querySelector("#celcius-link");
  let Celcius = 29;
  celciusLink.innerHTML = `°C`;
  changeFahrenheit.innerHTML = `${Celcius}`;
}
let changeTemperature = document.querySelector("#celcius-link");
changeTemperature.addEventListener("click", changeToCelcius);



// The search engine
function showWeatherCondition(response) {
  document.querySelector("#city-display").innerHTML = `${response.data.name} <i class="fas fa-home"></i>`;
  document.querySelector("#main-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed) + "km/h";
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity) + "%";
  document.querySelector("#pressure").innerHTML = Math.round(response.data.main.pressure) + "mb";
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
}

function search(city) {
  let apiKey = "1504ebb010471d47f96224deb5dd303e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  search(city);
}

let form = document.querySelector("#search-engine");
form.addEventListener("submit", handleCity);

//current location
function searchLocation(position) {
  let apiKey = "1504ebb010471d47f96224deb5dd303e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {

  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-loc-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Accra");