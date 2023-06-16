const form = document.querySelector('#weatherForm');
const weatherInfo = document.querySelector('#weatherInfo');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.querySelector('#cityInput').value;
    getWeather(city);
});

function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d564f5a436cdf8abc6015c18b52129a2&units=metric`;

    weatherInfo.innerHTML = '';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error:', error);
            weatherInfo.innerHTML = 'Ha ocurrido un error al obtener el clima.';
        });
}

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherIcon = data.weather[0].icon;
    const windSpeed = data.wind.speed;

    // weatherInfo.innerHTML += `<div class = "weather-container"
    //                           <h2>${cityName}</h2>
    //                           <p>Temperatura: ${temperature}</p>
    //                           <p> Velocidad del viento: ${windSpeed} m/s >`

    const weatherContainer = document.createElement('div');
    weatherContainer.classList.add('weather-container');

    const cityElement = document.createElement('h2');
    cityElement.textContent = `${cityName}`;

    const temperatureElement = document.createElement('p');
    temperatureElement.innerHTML = `Temperatura: ${temperature}°C`;

    const iconElement = document.createElement('img');
    iconElement.src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
    iconElement.alt = 'Weather Icon';

    const windElement = document.createElement('p');
    windElement.innerHTML = `Velocidad del viento: ${windSpeed} m/s`;

    weatherContainer.appendChild(cityElement);
    weatherContainer.appendChild(temperatureElement);
    weatherContainer.appendChild(iconElement);
    weatherContainer.appendChild(windElement);

    weatherInfo.appendChild(weatherContainer);
}



