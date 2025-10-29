'use strict';

// ============================================================================
// WEATHER PAGE CLASS
// ============================================================================
class Weather {
    constructor() {
        this.currentLocation = 'Baku';
        this.currentCoords = null;
        this.apiKey = null; // OpenWeatherMap API key can be added here if needed
        this.openMeteoUrl = 'https://api.open-meteo.com/v1/forecast';
        this.geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';

        // DOM Elements
        this.searchBtn = document.getElementById('searchLocationBtn');
        this.locationInput = document.getElementById('locationInput');
        this.citySelect = document.getElementById('citySelector');
        this.currentLocationEl = document.getElementById('currentLocation');
        this.currentDateEl = document.getElementById('currentDate');
        this.currentTempEl = document.getElementById('currentTemp');
        this.feelsLikeEl = document.getElementById('feelsLike');
        this.currentConditionEl = document.getElementById('currentCondition');
        this.currentIconEl = document.getElementById('currentIcon');
        this.humidityEl = document.getElementById('humidity');
        this.windSpeedEl = document.getElementById('windSpeed');
        this.minTempEl = document.getElementById('minTemp');
        this.maxTempEl = document.getElementById('maxTemp');
        this.visibilityEl = document.getElementById('visibility');
        this.cloudinessEl = document.getElementById('cloudiness');
        this.pressureEl = document.getElementById('pressure');
        this.uvIndexEl = document.getElementById('uvIndex');
        this.hourlyWeatherWrapper = document.getElementById('hourlyWeatherWrapper');
        this.dailyWeatherEl = document.getElementById('dailyWeather');

        this.init();
    }

    async init() {
        // Get user's current location
        await this.getCurrentLocation();

        // Populate city dropdown from AZERBAIJAN_CITIES
        this.populateCitySelect();

        // Setup event listeners
        this.setupEventListeners();

        // Load weather data
        await this.loadWeatherData();
    }

    populateCitySelect() {
        if (!this.citySelect) return;

        const frag = document.createDocumentFragment();

        AZERBAIJAN_CITIES.forEach(city => {
            const opt = document.createElement('option');
            opt.value = `${city.lat},${city.lng}`;
            opt.textContent = city.name;
            frag.appendChild(opt);
        });

        this.citySelect.appendChild(frag);

        // Set dropdown to current location if available
        if (this.currentCoords) {
            this.citySelect.value = `${this.currentCoords.latitude},${this.currentCoords.longitude}`;
        }
        this.updateSelectStyle(this.citySelect);
    }

    updateSelectStyle(select) {
        if (!select) return;
        const hasValue = select.value && select.value !== '' && !select.options[select.selectedIndex]?.disabled;
        if (hasValue) {
            select.classList.add('has-value');
        } else {
            select.classList.remove('has-value');
        }
    }

    setupEventListeners() {
        // Location search
        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', () => this.searchLocation());
        }

        if (this.locationInput) {
            // Debounced input for suggestions
            const debouncedHandler = this.debounce((e) => {
                this.handleSearchInput(e);
            }, 300);
            this.locationInput.addEventListener('input', debouncedHandler);

            this.locationInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.hideSuggestions();
                    this.searchLocation();
                }
            });

            // Close suggestions when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.weather-location-selector')) {
                    this.hideSuggestions();
                }
            });
        }

        // City dropdown change
        if (this.citySelect) {
            this.citySelect.addEventListener('change', () => this.handleCityChange());
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    async handleSearchInput(event) {
        const query = event.target.value.trim();

        if (!query || query.length < 2) {
            this.hideSuggestions();
            return;
        }

        console.log('Searching for:', query);

        try {
            const suggestions = await this.fetchCitySuggestions(query);
            console.log('Found suggestions:', suggestions);
            this.displaySuggestions(suggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }

    async fetchCitySuggestions(query) {
        // Filter from AZERBAIJAN_CITIES if available
        let cities = [];
        const lowercaseQuery = query.toLowerCase();

        if (typeof AZERBAIJAN_CITIES !== 'undefined') {
            const allMatches = AZERBAIJAN_CITIES.filter(city =>
                city.name.toLowerCase().includes(lowercaseQuery)
            );

            // Separate cities that start with the query from those that contain it
            const startsWithQuery = [];
            const containsQuery = [];

            allMatches.forEach(city => {
                if (city.name.toLowerCase().startsWith(lowercaseQuery)) {
                    startsWithQuery.push(city);
                } else {
                    containsQuery.push(city);
                }
            });

            // Return starts with first, then contains (max 5 total)
            cities = [...startsWithQuery, ...containsQuery].slice(0, 5);
        } else {
            console.log('AZERBAIJAN_CITIES not available');
        }

        return cities;
    }

    displaySuggestions(suggestions) {
        if (!suggestions || suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }

        const locationSelector = document.querySelector('.weather-location-selector');
        if (!locationSelector) return;

        // Remove existing suggestions
        let suggestionsContainer = locationSelector.querySelector('.weather-location-suggestions');
        if (suggestionsContainer) {
            suggestionsContainer.remove();
        }

        // Create suggestions container
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'weather-location-suggestions';

        suggestions.forEach(city => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'weather-location-suggestion';
            suggestionItem.innerHTML = `
                <i class="ri-map-pin-line"></i>
                <span>${city.name}</span>
            `;

            suggestionItem.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectCity(city);
            });

            suggestionsContainer.appendChild(suggestionItem);
        });

        locationSelector.appendChild(suggestionsContainer);
    }

    hideSuggestions() {
        const suggestionsContainer = document.querySelector('.weather-location-suggestions');
        if (suggestionsContainer) {
            suggestionsContainer.remove();
        }
    }

    selectCity(city) {
        if (this.locationInput) {
            this.locationInput.value = city.name;
        }

        this.currentLocation = city.name;
        this.currentCoords = {
            latitude: city.lat,
            longitude: city.lng
        };

        if (this.currentLocationEl) {
            this.currentLocationEl.textContent = city.name;
        }

        // Update dropdown to match selected city
        this.updateDropdownToCity(city);

        this.hideSuggestions();
        this.loadWeatherData();
    }

    updateDropdownToCity(city) {
        if (!this.citySelect) return;

        // Find the option that matches this city
        for (let i = 0; i < this.citySelect.options.length; i++) {
            const option = this.citySelect.options[i];
            const [lat, lng] = option.value.split(',');

            // Check if coordinates match (with tolerance for floating point)
            const latMatch = Math.abs(parseFloat(lat) - city.lat) < 0.001;
            const lonMatch = Math.abs(parseFloat(lng) - city.lng) < 0.001;

            if (latMatch && lonMatch) {
                this.citySelect.value = option.value;
                this.updateSelectStyle(this.citySelect);
                break;
            }
        }
    }

    handleCityChange() {
        if (!this.citySelect) return;

        this.updateSelectStyle(this.citySelect);

        const selectedValue = this.citySelect.value;
        const selectedText = this.citySelect.options[this.citySelect.selectedIndex].text;

        if (selectedValue) {
            const [latitude, longitude] = selectedValue.split(',');
            this.currentLocation = selectedText;
            this.currentCoords = {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            };

            // Update location display
            if (this.currentLocationEl) {
                this.currentLocationEl.textContent = selectedText;
            }

            // Load weather data for selected city
            this.loadWeatherData();
        }
    }

    async getCurrentLocation() {
        try {
            // Try to get location from IP
            const locationData = await getLocationFromIP();

            if (locationData && locationData.city) {
                // Try to find the city in AZERBAIJAN_CITIES
                const foundCity = AZERBAIJAN_CITIES.find(city =>
                    city.name.toLowerCase() === locationData.city.toLowerCase()
                );

                if (foundCity) {
                    this.currentLocation = foundCity.name;
                    this.currentCoords = {
                        latitude: foundCity.lat,
                        longitude: foundCity.lng
                    };
                } else {
                    this.currentLocation = locationData.city;
                    this.currentCoords = {
                        latitude: locationData.latitude,
                        longitude: locationData.longitude
                    };
                }
            }
        } catch (error) {
            console.error('Error getting location:', error);
            // Default to Baku
            this.currentLocation = 'Bakı';
            this.currentCoords = {
                latitude: 40.4093,
                longitude: 49.8671
            };
        }
    }

    async searchLocation() {
        if (!this.locationInput) return;

        const cityName = this.locationInput.value.trim();

        if (!cityName) {
            return;
        }

        try {
            // Search for city coordinates
            const geocodeUrl = `${this.geocodingUrl}?name=${encodeURIComponent(cityName)}&count=1&language=az`;
            const response = await fetch(geocodeUrl);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const location = data.results[0];
                this.currentLocation = location.name;
                this.currentCoords = {
                    latitude: location.latitude,
                    longitude: location.longitude
                };

                await this.loadWeatherData();
            } else {
                alert('Şəhər tapılmadı');
            }
        } catch (error) {
            console.error('Error searching location:', error);
            alert('Xəta baş verdi');
        }
    }

    async loadWeatherData() {
        if (!this.currentCoords) {
            return;
        }

        try {
            // Update current location display
            if (this.currentLocationEl) {
                this.currentLocationEl.textContent = this.currentLocation;
            }

            // Fetch current weather
            await this.loadCurrentWeather();

            // Fetch hourly forecast
            await this.loadHourlyForecast();

            // Fetch daily forecast
            await this.loadDailyForecast();

        } catch (error) {
            console.error('Error loading weather data:', error);
        }
    }

    async loadCurrentWeather() {
        const { latitude, longitude } = this.currentCoords;
        const url = `${this.openMeteoUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day&timezone=auto`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.current) {
                this.updateCurrentWeatherDisplay(data.current, data.current_units);
            }
        } catch (error) {
            console.error('Error loading current weather:', error);
            this.displayMockData();
        }
    }

    async loadHourlyForecast() {
        const { latitude, longitude } = this.currentCoords;
        const url = `${this.openMeteoUrl}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code,precipitation_probability,windspeed_10m&forecast_days=1&timezone=auto`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.hourly && data.hourly.time) {
                this.displayHourlyForecast(data.hourly);
            }
        } catch (error) {
            console.error('Error loading hourly forecast:', error);
            this.displayMockHourlyData();
        }
    }

    async loadDailyForecast() {
        const { latitude, longitude } = this.currentCoords;
        const url = `${this.openMeteoUrl}?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,windspeed_10m_max&forecast_days=7&timezone=auto`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.daily) {
                this.displayDailyForecast(data.daily);
            }
        } catch (error) {
            console.error('Error loading daily forecast:', error);
            this.displayMockDailyData();
        }
    }

    updateCurrentWeatherDisplay(current, units) {
        const temp = Math.round(current.temperature_2m);
        const humidity = current.relative_humidity_2m_2m;
        const windSpeed = current.wind_speed_10m;
        const weatherCode = current.weather_code;
        const isDay = current.is_day;

        // Update main temperature
        if (this.currentTempEl) this.currentTempEl.textContent = temp;
        if (this.feelsLikeEl) this.feelsLikeEl.textContent = temp;

        // Update condition
        const condition = this.getWeatherCondition(weatherCode);
        if (this.currentConditionEl) this.currentConditionEl.textContent = condition;

        // Update icon
        if (this.currentIconEl) {
            this.updateWeatherIcon(this.currentIconEl, weatherCode, isDay);
        }

        // Update stats
        if (this.humidityEl) this.humidityEl.textContent = Math.round(humidity);
        if (this.windSpeedEl) this.windSpeedEl.textContent = Math.round(windSpeed);

        // Mock additional data
        if (this.minTempEl) this.minTempEl.textContent = temp - 5;
        if (this.maxTempEl) this.maxTempEl.textContent = temp + 5;

        // Update date
        const now = new Date();
        const dateStr = now.toLocaleDateString('az-AZ', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        if (this.currentDateEl) this.currentDateEl.textContent = dateStr;

        // Mock additional details
        if (this.visibilityEl) this.visibilityEl.textContent = '10 km';
        if (this.cloudinessEl) this.cloudinessEl.textContent = '45%';
        if (this.pressureEl) this.pressureEl.textContent = '1013 hPa';
        if (this.uvIndexEl) this.uvIndexEl.textContent = '4';
    }

    displayHourlyForecast(hourly) {
        if (!this.hourlyWeatherWrapper) return;

        this.hourlyWeatherWrapper.innerHTML = '';

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const hoursToShow = 24;
        let currentIndex = 0;

        for (let i = 0; i < hoursToShow && i < hourly.time.length; i++) {
            const hourData = this.getHourData(hourly, i);
            const dataHour = new Date(hourData.time).getHours();

            // Check if this hour matches current hour
            const isNow = (dataHour === currentHour);
            if (isNow) {
                currentIndex = i;
            }

            const hourCard = document.createElement('div');
            hourCard.className = 'swiper-slide';
            hourCard.innerHTML = `
                <div class="hourly-weather__item ${isNow ? 'hourly-weather__item--active' : ''}">
                    <div class="hourly-weather__time">${this.formatHour(hourData.time, isNow)}</div>
                    <div class="hourly-weather__icon">
                        ${this.getWeatherIconSVG(hourData.weatherCode, hourData.isDay)}
                    </div>
                    <div class="hourly-weather__temp">${hourData.temp}°</div>
                    <div class="hourly-weather__precipitation">
                        <i class="ri-drop-line"></i>
                        ${hourData.precipitation}%
                    </div>
                </div>
            `;

            this.hourlyWeatherWrapper.appendChild(hourCard);
        }

        // Initialize Swiper and scroll to current hour
        this.initHourlySwiper(currentIndex);
    }

    displayDailyForecast(daily) {
        if (!this.dailyWeatherEl) return;

        this.dailyWeatherEl.innerHTML = '';

        for (let i = 0; i < daily.time.length; i++) {
            const dayData = this.getDayData(daily, i);
            const isToday = i === 0;

            const dayCard = document.createElement('div');
            dayCard.className = 'daily-weather__item';
            dayCard.innerHTML = `
                <div class="daily-weather__date">${this.formatDay(dayData.date, isToday)}</div>
                <div class="daily-weather__icon">
                    ${this.getWeatherIconSVG(dayData.weatherCode, true)}
                </div>
                <div class="daily-weather__temps">
                    <span class="daily-weather__max">${dayData.max}°</span>
                    <span class="daily-weather__min">${dayData.min}°</span>
                </div>
                <div class="daily-weather__precipitation">
                    <i class="ri-drop-line"></i>
                    ${dayData.precipitation}%
                </div>
                <div class="daily-weather__wind">
                    <i class="ri-windy-line"></i>
                    ${dayData.windSpeed} km/h
                </div>
            `;

            this.dailyWeatherEl.appendChild(dayCard);
        }
    }

    getHourData(hourly, index) {
        return {
            time: hourly.time[index],
            temp: Math.round(hourly.temperature_2m[index]),
            weatherCode: hourly.weather_code[index],
            precipitation: hourly.precipitation_probability ? Math.round(hourly.precipitation_probability[index]) : 0,
            isDay: new Date(hourly.time[index]).getHours() >= 6 && new Date(hourly.time[index]).getHours() < 20
        };
    }

    getDayData(daily, index) {
        return {
            date: daily.time[index],
            max: Math.round(daily.temperature_2m_max[index]),
            min: Math.round(daily.temperature_2m_min[index]),
            weatherCode: daily.weather_code[index],
            precipitation: daily.precipitation_probability_max ? Math.round(daily.precipitation_probability_max[index]) : 0,
            windSpeed: daily.windspeed_10m_max ? Math.round(daily.windspeed_10m_max[index]) : 0
        };
    }

    formatHour(dateStr, isNow) {
        if (isNow) return 'İndi';

        const date = new Date(dateStr);
        const hours = date.getHours();
        return `${hours}:00`;
    }

    formatDay(dateStr, isToday) {
        if (isToday) return 'Bugün';

        const date = new Date(dateStr);
        const days = ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'];
        const dayName = days[date.getDay()];
        return dayName;
    }

    getWeatherCondition(code) {
        const conditions = {
            0: 'Açıq',
            1: 'Əsasən açıq',
            2: 'Qismən buludlu',
            3: 'Buludlu',
            45: 'Sis',
            48: 'Qızğın sis',
            51: 'Yüngül yağış',
            53: 'Orta yağış',
            55: 'Güclü yağış',
            56: 'Yüngül dondurucu yağış',
            57: 'Güclü dondurucu yağış',
            61: 'Yüngül yağış',
            63: 'Orta yağış',
            65: 'Güclü yağış',
            66: 'Yüngül dondurucu yağış',
            67: 'Güclü dondurucu yağış',
            71: 'Yüngül qar',
            73: 'Orta qar',
            75: 'Güclü qar',
            77: 'Qar dənəcikləri',
            80: 'Yüngül yağış',
            81: 'Orta yağış',
            82: 'Güclü yağış',
            85: 'Yüngül qar',
            86: 'Güclü qar',
            95: 'Tufan',
            96: 'Tufan və dolu',
            99: 'Güclü tufan və dolu'
        };

        return conditions[code] || 'Bilinməyən';
    }

    updateWeatherIcon(element, code, isDay) {
        const iconClass = getWeatherIconClass(code, isDay);
        element.innerHTML = `<i class="${iconClass}"></i>`;
    }

    getWeatherIconSVG(code, isDay) {
        const iconClass = getWeatherIconClass(code, isDay);
        return `<i class="${iconClass}"></i>`;
    }

    initHourlySwiper(initialSlide = 0) {
        if (window.hourlySwiper) {
            window.hourlySwiper.destroy();
        }

        window.hourlySwiper = new Swiper('.swiper--hourly-weather', {
            slidesPerView: 'auto',
            spaceBetween: 16,
            freeMode: true,
            grabCursor: true,
            initialSlide: initialSlide - 1 < 0 ? 0 : initialSlide - 1,
        });
    }

    displayMockData() {
        // Display mock data if API fails
        if (this.currentTempEl) this.currentTempEl.textContent = '22';
        if (this.feelsLikeEl) this.feelsLikeEl.textContent = '23';
        if (this.currentConditionEl) this.currentConditionEl.textContent = 'Açıq';
        if (this.humidityEl) this.humidityEl.textContent = '65';
        if (this.windSpeedEl) this.windSpeedEl.textContent = '15';
        if (this.minTempEl) this.minTempEl.textContent = '18';
        if (this.maxTempEl) this.maxTempEl.textContent = '26';
    }

    displayMockHourlyData() {
        if (!this.hourlyWeatherWrapper) return;

        this.hourlyWeatherWrapper.innerHTML = '';

        for (let i = 0; i < 12; i++) {
            const hour = new Date();
            hour.setHours(hour.getHours() + i);

            const hourCard = document.createElement('div');
            hourCard.className = 'swiper-slide';
            hourCard.innerHTML = `
                <div class="hourly-weather__item">
                    <div class="hourly-weather__time">${i === 0 ? 'İndi' : hour.getHours() + ':00'}</div>
                    <div class="hourly-weather__icon">
                        <i class="ri-sun-line"></i>
                    </div>
                    <div class="hourly-weather__temp">${22 + i}°</div>
                </div>
            `;

            this.hourlyWeatherWrapper.appendChild(hourCard);
        }

        this.initHourlySwiper();
    }

    displayMockDailyData() {
        if (!this.dailyWeatherEl) return;

        this.dailyWeatherEl.innerHTML = '';

        const days = ['Bugün', 'Bazar', 'Bazar ertəsi', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'];

        for (let i = 0; i < 7; i++) {
            const dayCard = document.createElement('div');
            dayCard.className = 'daily-weather__item';
            dayCard.innerHTML = `
                <div class="daily-weather__date">${days[i]}</div>
                <div class="daily-weather__icon">
                    <i class="ri-sun-line"></i>
                </div>
                <div class="daily-weather__temps">
                    <span class="daily-weather__max">${25 + i}°</span>
                    <span class="daily-weather__min">${18 + i}°</span>
                </div>
                <div class="daily-weather__precipitation">
                    <i class="ri-drop-line"></i>
                    0%
                </div>
                <div class="daily-weather__wind">
                    <i class="ri-windy-line"></i>
                    15 km/h
                </div>
            `;

            this.dailyWeatherEl.appendChild(dayCard);
        }
    }
}

// ============================================================================
// HEADER WEATHER WIDGET CLASS
// ============================================================================
class HeaderWeatherWidget {
    constructor() {
        this.cityElement = document.querySelector('.weather__city');
        this.tempElement = document.querySelector('.weather__temp');
        this.iconElement = document.querySelector('.weather__icon');

        // Only initialize if elements exist (header widget)
        if (this.cityElement && this.tempElement && this.iconElement) {
            this.init();
        }
    }

    async init() {
        try {
            const locationData = await getLocationFromIP();

            if (locationData) {
                const { city, latitude, longitude } = locationData;
                const weatherData = await getCurrentWeather(latitude, longitude);

                if (weatherData) {
                    this.updateWeatherDisplay(city, weatherData);
                }
            }
        } catch (error) {
            console.error('Weather widget error:', error);
        }
    }

    updateWeatherDisplay(city, weatherData) {
        this.cityElement.textContent = city;
        this.tempElement.textContent = `${weatherData.temperature}°C`;
        this.updateWeatherIcon(weatherData.weatherCode, weatherData.isDay);
    }

    updateWeatherIcon(code, isDay) {
        const iconClass = getWeatherIconClass(code, isDay);
        this.iconElement.className = `weather__icon ${iconClass}`;
    }
}

// ============================================================================
// SHARED UTILITIES FUNCTIONS
// ============================================================================

// ==================== GET LOCATION FROM IP ====================
const getLocationFromIP = async () => {
    // Return default location (Bakı) to avoid CORS issues
    // when hosted on GitHub Pages
    return {
        city: 'Bakı',
        latitude: 40.4093,
        longitude: 49.8671
    };
}

// ==================== GET CURRENT WEATHER ====================
const getCurrentWeather = async (lat, lng) => {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&temperature_unit=celsius`
        );
        const data = await response.json();

        return {
            temperature: Math.round(data.current_weather.temperature),
            weatherCode: data.current_weather.weathercode,
            isDay: data.current_weather.is_day
        };
    } catch (error) {
        console.error('Weather fetch error:', error);
        return null;
    }
}

// ==================== GET WEATHER ICON CLASS ====================
const getWeatherIconClass = (code, isDay) => {
    if (code === 0) {
        return isDay ? 'ri-sun-line' : 'ri-moon-line';
    } else if (code >= 1 && code <= 3) {
        return isDay ? 'ri-sun-cloudy-line' : 'ri-moon-cloudy-line';
    } else if (code >= 45 && code <= 48) {
        return 'ri-mist-line';
    } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
        return 'ri-rainy-line';
    } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
        return 'ri-snowy-line';
    } else if (code >= 95 && code <= 99) {
        return 'ri-thunderstorms-line';
    } else {
        return 'ri-cloudy-line';
    }
}

// ============================================================================
// AUTO-INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize weather page (only if on weather page)
    if (document.getElementById('weatherPage')) {
        new Weather();
    }

    // Initialize header weather widget (for all pages)
    new HeaderWeatherWidget();
});

