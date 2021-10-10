function formatDate(timestamp){
  let dateTime = new Date(timestamp);
  let hours = dateTime.getHours();
  if (hours < 10){
    hours = `0${hours}`;
  }

  let minutes = dateTime.getMinutes();
  if (minutes < 10){
    minutes = `0${minutes}`;
  }

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[dateTime.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response){
 
  let temperatureElement = document.querySelector("#main-temp");
  celciusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  let cityElement = document.querySelector("#city-to-display");
  cityElement.innerHTML = `${response.data.name} <i class="fas fa-home"></i>`;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = response.data.main.pressure;
  let dateElement = document.querySelector("#date-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt",response.data.weather[0].description);

  
}

function search(city){
  let apiKey = "1504ebb010471d47f96224deb5dd303e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
}
  

function handleCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  search(cityInput.value);
}

function displayFahrenheitTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  let fahreinheitTemperature = (celciusTemperature * 1.8) + 32;
  temperatureElement.innerHTML = Math.round(fahreinheitTemperature);
  }

 function displayCelciusTemperature(event){
   event.preventDefault();
   let temperatureElement = document.querySelector("#main-temp");
    temperatureElement.innerHTML = Math.round(celciusTemperature);
 } 

  let celciusTemperature = null;

let form = document.querySelector("#search-engine");
form.addEventListener("submit", handleCity);


let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celciusLink = document.querySelector("#celciusLink");
celciusLink.addEventListener("click", displayCelciusTemperature);

search("Accra");