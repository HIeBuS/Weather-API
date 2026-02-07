async function getWeatherData(city){
    const APIkey = "key";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("City not found! Please try again!"); 
    }

    return await response.json();
}

const weatherBox = document.querySelector('#weather-display');
const form = document.querySelector("#search-section");
const input = document.querySelector('#search-input');
const button = document.querySelector('#search-btn');

input.classList.add("search-input-props");
button.classList.add("search-btn-props");

function displayWeather(data){
    weatherBox.classList.add("weatherStyles");
    weatherBox.textContent = '';

    const cityBox = document.createElement('h2');
    cityBox.textContent = `City: ${data.name}`;
    weatherBox.appendChild(cityBox);

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const iconImg = document.createElement('img');
    iconImg.src = iconUrl;
    iconImg.alt = "Weather icon";
    iconImg.classList.add('weather-icon')
    
    weatherBox.appendChild(iconImg);

    const tempBox = document.createElement('p');
    tempBox.textContent = `Temperature: ${data.main.temp}°C`;
    weatherBox.appendChild(tempBox);

    const humidityBox = document.createElement('p');
    humidityBox.textContent = `Humidity: ${data.main.humidity}%`;
    weatherBox.appendChild(humidityBox);

    const windBox = document.createElement('p');
    windBox.textContent = `Wind: ${data.wind.speed} m/s`;
    weatherBox.appendChild(windBox);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const city = input.value.trim();

    if(!city){
        window.alert("Enter city name!");
        return;
    }

    weatherBox.textContent='';

    const weatherArea = document.createElement('p');
    weatherArea.textContent="Fetching weather...";
    weatherBox.appendChild(weatherArea);

    try {
        const weatherData = await getWeatherData(city);
        console.log(weatherData);
        displayWeather(weatherData);
    } catch(error) {
        console.error(error);
        weatherArea.textContent = error.message;
    }
});
