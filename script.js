
       
        let currentState = {
            loading: false,
            error: null,
            data: null,
            lastCity: localStorage.getItem('lastCity') || ''
        };

        // DOM Elements
        const cityInput = document.getElementById('cityInput');
        const searchBtn = document.getElementById('searchBtn');
        const loadingEl = document.getElementById('loading');
        const errorEl = document.getElementById('error');
        const weatherDisplay = document.getElementById('weatherDisplay');
        const cityNameEl = document.getElementById('cityName');
        const temperatureEl = document.getElementById('temperature');
        const conditionEl = document.getElementById('condition');
        const humidityEl = document.getElementById('humidity');
        const forecastSection = document.getElementById('forecastSection');
        const forecastDaysEl = document.getElementById('forecastDays');

       
        function generateMockData(city) {
            const baseTemp = Math.floor(Math.random() * 30) + 10; // 10-40°C
            const conditions = ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm'];
            const condition = conditions[Math.floor(Math.random() * conditions.length)];
            const humidity = Math.floor(Math.random() * 50) + 40; // 40-90%

       
            const forecast = [];
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
            for (let i = 0; i < 5; i++) {
                forecast.push({
                    date: days[i],
                    temp: Math.floor(baseTemp + (Math.random() - 0.5) * 10), // Vary around base
                    condition: conditions[Math.floor(Math.random() * conditions.length)]
                });
            }

            return {
                city: city.charAt(0).toUpperCase() + city.slice(1),
                temp: baseTemp,
                condition: condition,
                humidity: humidity,
                forecast: forecast
            };
        }

        // Initialize: Load last city if available
        if (currentState.lastCity) {
            cityInput.value = currentState.lastCity;
            fetchMockWeather(currentState.lastCity);
        }

        // Event Listeners
        searchBtn.addEventListener('click', handleSearch);
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });

        // Functions for State Updates
        function updateState(newState) {
            Object.assign(currentState, newState);
            render();
            if (currentState.data && currentState.data.city) {
                localStorage.setItem('lastCity', currentState.data.city);
            }
        }

        function render() {
            loadingEl.style.display = currentState.loading ? 'block' : 'none';
            searchBtn.disabled = currentState.loading;

            if (currentState.error) {
                errorEl.textContent = currentState.error;
                errorEl.style.display = 'block';
                weatherDisplay.style.display = 'none';
            } else {
                errorEl.style.display = 'none';
            }

            if (currentState.data) {
                weatherDisplay.style.display = 'block';
                cityNameEl.textContent = currentState.data.city;
                temperatureEl.textContent = `${Math.round(currentState.data.temp)}°C`;
                conditionEl.textContent = currentState.data.condition;
                humidityEl.textContent = `Humidity: ${currentState.data.humidity}%`;

                if (currentState.data.forecast && currentState.data.forecast.length > 0) {
                    forecastSection.style.display = 'block';
                    renderForecast(currentState.data.forecast);
                } else {
                    forecastSection.style.display = 'none';
                }
            } else {
                weatherDisplay.style.display = 'none';
            }
        }

        async function handleSearch() {
            const city = cityInput.value.trim();
            if (!city) {
                updateState({ error: 'Please enter a city name.' });
                return;
            }

            updateState({ loading: true, error: null, data: null });
            // Simulate delay for loading
            setTimeout(() => {
                fetchMockWeather(city);
            }, 1000); // 1 second delay to show loading
        }

        function fetchMockWeather(city) {
            try {
                // Simulate occasional "error" for testing (e.g., if city is "error")
                if (city.toLowerCase() === 'error') {
                    throw new Error(`Mock error: City "${city}" not found.`);
                }

                const mockData = generateMockData(city);

                updateState({
                    loading: false,
                    data: mockData
                });
            } catch (err) {
                updateState({ loading: false, error: err.message });
            }
        }

        function renderForecast(forecast) {
            forecastDaysEl.innerHTML = '';
            forecast.forEach(day => {
                const dayEl = document.createElement('div');
                dayEl.className = 'forecast-day';
                dayEl.innerHTML = `
                    <div class="day-name">${day.date}</div>
                    <div class="day-temp">${day.temp}°C</div>
                    <div class="day-condition">${day.condition}</div>
                `;
                forecastDaysEl.appendChild(dayEl);
            });
        }
    