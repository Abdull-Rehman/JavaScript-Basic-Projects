const city = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const img = document.querySelector(".image-info img");
console.log(img);
const temperature = document.querySelector(".temperature");
const weatherStatus = document.querySelector(".weather-status");
const humidity_value = document.querySelector(".humidity .title-value .value");
const wind_speed = document.querySelector(".windSpeed .title-value .value");
const error_div = document.querySelector(".error-container");
const main_div = document.querySelector(".body");

searchBtn.addEventListener("click", () => {
  displayWeather(city.value);
});

let displayWeather = async (city) => {
  const api_key = "4c743e5cf06e174afae639f7cd9af3c5";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  let weather_data = await fetch(url).then((response) => response.json());
  console.log(weather_data);

  if (weather_data.cod === "404") {
    error_div.style.display = "block";
    main_div.style.display = "none";
    return;
  }
  error_div.style.display = "none";
  main_div.style.display = "block";

  updatingDom(weather_data);
  updatingImages(weather_data);
};

function updatingDom(weather_data) {
  let temp = `${Math.round(weather_data.main.temp - 273.15)}<sup>°C</sup>`;
  temperature.innerHTML = temp;
  weatherStatus.innerHTML = weather_data.weather[0].description;
  humidity_value.innerHTML = `${weather_data.main.humidity}%`;
  let speed = `${Math.round(weather_data.wind.speed)} KM/H`;
  wind_speed.innerHTML = speed;
  console.log(weather_data.weather[0].main);
}

function updatingImages(weather_data) {
  switch (weather_data.weather[0].main) {
    case "clear":
      img.src = "./assets/clear.png";
      break;
    case "clouds":
      img.src = "./assets/cloud.png";
      break;
    case "mist":
      img.src = "./assets/mist.png";
      break;
    case "rain":
      img.src = "./assets/rain.png";
      break;
    case "snow":
      img.src = "./assets/snow.png";
      break;
  }
}
