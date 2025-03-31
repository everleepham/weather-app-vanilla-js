const API_KEY = "381c3dddef8d4f79b4e101211252803"
let cityLocation = "Paris"

const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityLocation}&aqi=yes`

const fetchWeather = async () => {
	try {
		const response = await fetch(URL)
		if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

		const { location, current } = await response.json();
		const { name: city } = location;

		const { temp_c: temp, wind_kph: wind, humidity, uv, feelslike_c: feelslike } = current;

		const icon = current.condition.icon;

		document.querySelector(".card-title").textContent = city;
		document.querySelector(".card-img").src = icon;

		
		const display = [
			`Temperature: ${temp} °C`,
			`Humidity: ${humidity}%`,
			`Feels like: ${feelslike}°C`,
			`Wind: ${wind} km/h`,
			`UV: ${uv}`
		];

		document.querySelectorAll(".list-group-item").forEach((item, index) => {
			item.textContent = display[index];
		});


	} catch (error) {
		console.error(`Fetch error: ${error}`);
	}
}

window.onload = fetchWeather