const API_KEY = "4d41581d21f277d7c8eec0fcc71a0e16";

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");

const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");


async function getWeather(cityName) {

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=uk`
        );

        if (!response.ok) {
            throw new Error("Місто не знайдено");
        }

        const data = await response.json();

        console.log(data);

        
        city.textContent = data.name;

        
        temperature.textContent = `${Math.round(data.main.temp)}°C`;

        
        description.textContent = data.weather[0].description;

        
        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherIcon.alt = data.weather[0].description;

    } catch (error) {

        console.log(error);

        city.textContent = "Помилка";
        temperature.textContent = "";
        description.textContent = "Місто не знайдено";
        
        weatherIcon.src =
            "https://openweathermap.org/img/wn/02d@2x.png";
    }
}



searchButton.addEventListener("click", function () {

    const cityName = cityInput.value.trim();

    if (cityName === "") {
        return;
    }

    getWeather(cityName);
});



cityInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        const cityName = cityInput.value.trim();

        if (cityName === "") {
            return;
        }

        getWeather(cityName);
    }
});



getWeather("Kyiv");