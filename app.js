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