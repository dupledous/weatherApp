const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const weatherResult = document.getElementById('weather-info');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const apiKey = '413fdf1186bfd844590a03346ab3b4ee';
    const city = cityInput.value.trim();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    if (city === '') {
        weatherResult.textContent = 'Please enter a city name.';
    }
    else {
        localStorage.setItem('lastCity', city);
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (response.ok) {
            weatherResult.textContent = 'Loading...';

            const temperature = data.main.temp;
            const climate = data.weather[0].main;
            const humidity = data.main.humidity;
            const icon = data.weather[0].icon;
            if (climate === 'Clear') {
                weatherResult.style.backgroundColor = "lightblue";
            } else if (climate === 'Rain') {
                weatherResult    .style.backgroundColor = "lightgray";
            }
            setTimeout(() => {
                weatherResult.innerHTML = `
                    <h2>Weather in ${city}</h2>
                    <p>Temperature: ${temperature} °C</p>
                    <p>Climate: ${climate} <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${climate} icon"></p>
                    <p>Humidity: ${humidity}%</p>
                `;
            }, 2000);

        } else {
            weatherResult.textContent = 'City not found. Please try again.';
        }
    } catch (error) {
        weatherResult.textContent = 'An error occurred. Please try again later.';
    }
    cityInput.value = '';
    }
});
window.addEventListener('load', () => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        cityInput.value = lastCity;
        form.dispatchEvent(new Event('submit'));
    }
});
