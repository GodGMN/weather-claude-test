// DOM Elements
const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
const currentTemp = document.getElementById('current-temp');
const feelsLike = document.getElementById('feels-like');
const weatherIcon = document.getElementById('weather-icon');
const conditionText = document.getElementById('condition-text');
const windSpeed = document.getElementById('wind-speed');
const windDir = document.getElementById('wind-dir');
const humidity = document.getElementById('humidity');
const uvIndex = document.getElementById('uv-index');
const aqiValue = document.getElementById('aqi-value');
const aqiStatus = document.getElementById('aqi-status');
const aqiGaugeFill = document.getElementById('aqi-gauge-fill');
const pm25Value = document.getElementById('pm2_5-value');
const pm10Value = document.getElementById('pm10-value');
const no2Value = document.getElementById('no2-value');
const o3Value = document.getElementById('o3-value');
const so2Value = document.getElementById('so2-value');
const hourlyContainer = document.getElementById('hourly-container');
const dailyContainer = document.getElementById('daily-container');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');
const moonPhase = document.getElementById('moon-phase');
const currentYear = document.getElementById('current-year');
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const celsiusBtn = document.getElementById('celsius-btn');
const fahrenheitBtn = document.getElementById('fahrenheit-btn');

// State
let weatherData = null;
let isCelsius = true;

// Initialize the app
async function initApp() {
    try {
        // Normally we would fetch from an API, but we're using mock data
        const response = await fetch('weatherData.json');
        weatherData = await response.json();
        
        // Display data
        displayCurrentWeather();
        displayAirQuality();
        displayHourlyForecast();
        displayDailyForecast();
        displayAstroInfo();
        
        // Set current year in footer
        currentYear.textContent = new Date().getFullYear();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
}

// Display current weather data
function displayCurrentWeather() {
    if (!weatherData) return;
    
    const current = weatherData.current;
    const location = weatherData.location;
    
    cityName.textContent = location.name;
    currentDate.textContent = formatDate(new Date());
    
    // Display temperature based on unit preference
    if (isCelsius) {
        currentTemp.textContent = `${current.temp_c}°C`;
        feelsLike.textContent = `Feels like: ${current.feelslike_c}°C`;
    } else {
        currentTemp.textContent = `${current.temp_f}°F`;
        feelsLike.textContent = `Feels like: ${current.feelslike_f}°F`;
    }
    
    // Set weather icon (in a real app, this would be a real image path)
    weatherIcon.src = `images/${current.condition.icon}`;
    weatherIcon.alt = current.condition.text;
    
    conditionText.textContent = current.condition.text;
    windSpeed.textContent = isCelsius ? `${current.wind_kph} km/h` : `${current.wind_mph} mph`;
    windDir.textContent = current.wind_dir;
    humidity.textContent = `${current.humidity}%`;
    uvIndex.textContent = current.uv;
}

// Display air quality data
function displayAirQuality() {
    if (!weatherData || !weatherData.current.air_quality) return;
    
    const airQuality = weatherData.current.air_quality;
    
    pm25Value.textContent = airQuality.pm2_5.toFixed(1);
    pm10Value.textContent = airQuality.pm10.toFixed(1);
    no2Value.textContent = airQuality.no2.toFixed(1);
    o3Value.textContent = airQuality.o3.toFixed(1);
    so2Value.textContent = airQuality.so2.toFixed(1);
    
    // AQI value and status
    aqiValue.textContent = airQuality.aqi;
    
    // Set AQI gauge fill width and status text
    let aqiPercentage = (airQuality.aqi / 500) * 100;
    aqiGaugeFill.style.width = `${Math.min(aqiPercentage, 100)}%`;
    
    if (airQuality.aqi <= 50) {
        aqiStatus.textContent = 'Good';
        aqiStatus.style.color = '#4CAF50';
    } else if (airQuality.aqi <= 100) {
        aqiStatus.textContent = 'Moderate';
        aqiStatus.style.color = '#FFEB3B';
    } else if (airQuality.aqi <= 150) {
        aqiStatus.textContent = 'Unhealthy for Sensitive Groups';
        aqiStatus.style.color = '#FF9800';
    } else if (airQuality.aqi <= 200) {
        aqiStatus.textContent = 'Unhealthy';
        aqiStatus.style.color = '#FF5252';
    } else if (airQuality.aqi <= 300) {
        aqiStatus.textContent = 'Very Unhealthy';
        aqiStatus.style.color = '#9C27B0';
    } else {
        aqiStatus.textContent = 'Hazardous';
        aqiStatus.style.color = '#7B1FA2';
    }
}

// Display hourly forecast
function displayHourlyForecast() {
    if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) return;
    
    // Clear previous data
    hourlyContainer.innerHTML = '';
    
    // Get today's hourly forecast
    const today = weatherData.forecast.forecastday[0];
    
    // Create and append hourly items
    today.hour.forEach(hourData => {
        const hourlyItem = document.createElement('div');
        hourlyItem.className = 'hourly-item';
        
        const time = hourData.time.split(' ')[1] || hourData.time;
        const temp = isCelsius ? `${hourData.temp_c}°C` : `${hourData.temp_f}°F`;
        
        hourlyItem.innerHTML = `
            <p>${time}</p>
            <img src="images/${hourData.condition.icon}" alt="${hourData.condition.text}">
            <p>${temp}</p>
            <p>${hourData.humidity}%</p>
        `;
        
        hourlyContainer.appendChild(hourlyItem);
    });
}

// Display daily forecast
function displayDailyForecast() {
    if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) return;
    
    // Clear previous data
    dailyContainer.innerHTML = '';
    
    // Get forecast days
    const forecastDays = weatherData.forecast.forecastday;
    
    // Create and append daily items
    forecastDays.forEach(dayData => {
        const date = new Date(dayData.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const maxTemp = isCelsius ? `${dayData.day.maxtemp_c}°C` : `${dayData.day.maxtemp_f}°F`;
        const minTemp = isCelsius ? `${dayData.day.mintemp_c}°C` : `${dayData.day.mintemp_f}°F`;
        
        const dailyItem = document.createElement('div');
        dailyItem.className = 'daily-item';
        
        dailyItem.innerHTML = `
            <div class="daily-date">
                <p>${dayName}</p>
                <p>${monthDay}</p>
            </div>
            <div class="daily-condition">
                <img src="images/${dayData.day.condition.icon}" alt="${dayData.day.condition.text}">
                <p>${dayData.day.condition.text}</p>
            </div>
            <div class="daily-temp">
                <p class="max">${maxTemp}</p>
                <p class="min">${minTemp}</p>
            </div>
        `;
        
        dailyContainer.appendChild(dailyItem);
    });
}

// Display astronomical info
function displayAstroInfo() {
    if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) return;
    
    const today = weatherData.forecast.forecastday[0];
    
    if (today.astro) {
        sunriseTime.textContent = today.astro.sunrise;
        sunsetTime.textContent = today.astro.sunset;
        moonPhase.textContent = today.astro.moonphase;
    }
}

// Toggle temperature unit
function toggleTemperatureUnit(unit) {
    if (unit === 'celsius' && !isCelsius) {
        isCelsius = true;
        celsiusBtn.classList.add('active');
        fahrenheitBtn.classList.remove('active');
    } else if (unit === 'fahrenheit' && isCelsius) {
        isCelsius = false;
        fahrenheitBtn.classList.add('active');
        celsiusBtn.classList.remove('active');
    } else {
        return; // No change needed
    }
    
    // Update displayed data with new unit
    displayCurrentWeather();
    displayHourlyForecast();
    displayDailyForecast();
}

// Search functionality (this would connect to a real API in a production app)
function searchCity() {
    const cityToSearch = cityInput.value.trim();
    
    if (cityToSearch) {
        // In a real app, we would fetch data from a weather API here
        // For this mock app, we'll just update the city name
        cityName.textContent = cityToSearch;
        cityInput.value = '';
        
        // Show a notification
        alert(`In a real app, we would load weather data for ${cityToSearch}. Using mock data for now.`);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', initApp);
searchBtn.addEventListener('click', searchCity);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCity();
});
celsiusBtn.addEventListener('click', () => toggleTemperatureUnit('celsius'));
fahrenheitBtn.addEventListener('click', () => toggleTemperatureUnit('fahrenheit'));