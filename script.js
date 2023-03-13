const apiKey = '31b3810dbf652efa0955c5e31cac1375';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const inputElement = document.getElementById('input');
const buttonElement = document.getElementById('button');
const errorElement = document.getElementById('error');
const answerElement = document.getElementById('answer');

function handleKeyEnter(event) {
  if (event.keyCode === 13) {
    getWeatherDetails();
  }
}

function getWeatherDetails() {
  const city = inputElement.value.trim();
  if (city === '') {
    errorElement.textContent = 'Please enter a city name';
    answerElement.innerHTML = '';
    return;
  }
  errorElement.innerHTML = '';
  answerElement.innerHTML = 'Loading...';
  fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      answerElement.innerHTML = `<p>Weather in ${data.name}, ${data.sys.country}:</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Feels like: ${data.main.feels_like}°C</p>
        <p>Weather description: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>`;
    })
    .catch(error => {
      answerElement.innerHTML = '';
      errorElement.textContent = `Error: ${error.message}`;
    });
}

buttonElement.addEventListener('click', getWeatherDetails);
