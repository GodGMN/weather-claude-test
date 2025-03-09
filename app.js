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