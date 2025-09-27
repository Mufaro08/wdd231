const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';

 const apiKey = '23bd5a286af8b011b2674afcb1bd4040'; // Replace with your actual OpenWeatherMap API key
  const city = 'Harare'; // You can make this dynamic later

  async function fetchWeather() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();

      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

      const weatherHTML = `
        <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
        <p><strong>Temperature:</strong> ${data.main.temp}°C (feels like ${data.main.feels_like}°C)</p>
        <p><strong>Min/Max:</strong> ${data.main.temp_min}°C / ${data.main.temp_max}°C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Visibility:</strong> ${data.visibility / 1000} km</p>
        <p><strong>Wind:</strong> ${data.wind.speed} m/s at ${data.wind.deg}°</p>
        <p><strong>Sunrise:</strong> ${sunrise}</p>
        <p><strong>Sunset:</strong> ${sunset}</p>
        <p><strong>Coordinates:</strong> [${data.coord.lat}, ${data.coord.lon}]</p>
      `;

      document.getElementById('weather-info').innerHTML = weatherHTML;
    } catch (error) {
      document.getElementById('weather-info').innerHTML = 'Failed to load weather data.';
      console.error('Weather fetch error:', error);
    }
  }

  fetchWeather();

