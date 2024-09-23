let searchForm = document.querySelector('#search-form');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value.trim();

    if (!cityName) {
        return showAlert("Por favor, insira o nome de uma cidade.");
    }

    const apiKey = '744e819f020e8e5cf0eddbc07225c67a';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`; // Backticks para interpolação

    try {
        const results = await fetch(apiUrl);
        const json = await results.json();

        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });

       
    } catch (error) {
        showAlert("Erro ao obter dados da API. Tente novamente mais tarde.");
        console.error("Erro na API:", error);
    }
});


function showInfo(json) {
    showAlert('');

    document.querySelector(".box-container").classList.add('show');

    document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#temp-value').innerHTML = `${Math.round(json.temp).toString()} <sup> Cº</sup>`;

    document.querySelector("#temp-description").innerHTML = `${json.description}`;

    document.querySelector("#temp-img").setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('#temp-max').innerHTML = `${Math.round(json.tempMax).toString()} <sup> Cº</sup>`;

    document.querySelector('#temp-min').innerHTML = `${Math.round(json.tempMin).toString()} <sup> Cº</sup>`;

    document.querySelector("#humidity").innerHTML = `${json.humidity}%`;

    document.querySelector("#wind").innerHTML = `${json.windSpeed.toFixed(1)}KM/H`;
}





function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}
