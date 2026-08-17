const API_KEY = "54945e9dedf4e63c6a9022d6a2df4651";

// Load last searched city or Delhi
const city = localStorage.getItem("city") || "Delhi";

// Display current date
const today = new Date();
const options = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};

document.querySelector(".span1").textContent =
  today.toLocaleDateString("en-GB", options);

// Fetch weather
async function getWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    if (response.ok && data.cod == 200) {
      localStorage.setItem("city", cityName);
      update(data);
    } else {
      alert("City Not Found!");
    }
  } catch (error) {
    console.error(error);
    alert("Unable to fetch weather data.");
  }
}

// Load default city
getWeather(city);

// Search button
document.querySelector(".icon1").addEventListener("click", () => {
  const cityName = document.querySelector(".inp").value.trim();

  if (cityName === "") {
    alert("Please enter a city name.");
    return;
  }

  getWeather(cityName);
});

// Search using Enter key
document.querySelector(".inp").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.querySelector(".icon1").click();
  }
});

// Update UI
function update(data) {
  document.querySelector(".inp").value = "";

  document.querySelector(".delhi").textContent = data.name;
  document.querySelector(".temp2").textContent = `${Math.round(
    data.main.temp
  )}°C`;
  document.querySelector(".temp1").textContent = data.weather[0].main;
  document.querySelector(".t").textContent = `${Math.round(
    data.main.feels_like
  )}°C`;
  document.querySelector(".h").textContent = `${data.main.humidity}%`;
  document.querySelector(".w").textContent = `${data.wind.speed} km/h`;
  document.querySelector(".p").textContent = `${data.main.pressure} hPa`;

  // Weather Emoji
  const weather = data.weather[0].main.toLowerCase();
  const icon = document.querySelector(".weather-icon");

  switch (weather) {
    case "clear":
      icon.textContent = "☀️";
      break;

    case "clouds":
      icon.textContent = "☁️";
      break;

    case "rain":
      icon.textContent = "🌧️";
      break;

    case "drizzle":
      icon.textContent = "🌦️";
      break;

    case "thunderstorm":
      icon.textContent = "⛈️";
      break;

    case "snow":
      icon.textContent = "❄️";
      break;

    case "mist":
    case "fog":
    case "haze":
      icon.textContent = "🌫️";
      break;

    case "smoke":
      icon.textContent = "💨";
      break;

    default:
      icon.textContent = "🌤️";
  }
}
