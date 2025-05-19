const apiKey = "eedc173bea18474ab2e160929241512";
const weatherCards = document.getElementById("weatherCards");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
    );
    const data = await response.json();

    if (data.error) {
      alert("City not found. Please try again.");
      return;
    }

    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Could not fetch weather data. Please try again.");
  }
}

function displayWeather(data) {
  weatherCards.innerHTML = "";
  const current = data.current;
  const location = data.location;

  const todayCard = `
    <div class="col-md-4 mb-4">
      <div class="weather-card">
        <h3>${location.name} - Today</h3>
        <h2>${current.temp_c}°C</h2>
        <p>${current.condition.text}</p>
        <img src="https:${current.condition.icon}" alt="Weather Icon" />
        <p>Humidity: ${current.humidity}% | Wind: ${current.wind_kph} km/h</p>
      </div>
    </div>
  `;
  weatherCards.innerHTML += todayCard;

  data.forecast.forecastday.forEach((day, index) => {
    if (index === 0) return;
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    const card = `
      <div class="col-md-4 mb-4">
        <div class="weather-card h-100">
          <div class="card-date">${dayName}</div>
          <h2>${day.day.avgtemp_c}°C</h2>
          <p>${day.day.condition.text}</p>
          <img src="https:${day.day.condition.icon}" alt="Weather Icon" />
        </div>
      </div>
    `;
    weatherCards.innerHTML += card;
  });
}

window.onload = function () {
  getWeather("Cairo");
};
