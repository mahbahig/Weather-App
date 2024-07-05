const key = 'ffbffdcda0644538b3d113835240407';
const baseUrl = 'http://api.weatherapi.com/v1';
const forecastUrl = '/forecast.json';

const city = document.querySelector('#city');
const currentTemp = document.querySelector('#currentTemp');
const today = document.querySelector('#today');
const date = document.querySelector('#date');
const stat = document.querySelector('#status');
const rain = document.querySelector('#rain');
const wind = document.querySelector('#wind');
const direction = document.querySelector('#direction');
// const date = document.querySelector('#date');

async function getResponse() {
    let data = await fetch(`${baseUrl}${forecastUrl}?key=${key}&q=Cairo&days=3`);
    let finalData = await data.json();

    city.innerHTML = finalData.location.name;
    currentTemp.innerHTML = finalData.current.temp_c;
    date.innerHTML = formatDate(true);
    today.innerHTML = formatDate(false);
    stat.innerHTML = finalData.forecast.forecastday[0].day.condition.text;
    rain.innerHTML = finalData.current.humidity;
    wind.innerHTML = finalData.current.wind_kph;
    direction.innerHTML = directions(finalData.current.wind_dir);
}

function formatDate(flag) {
    let date = new Date();
    let day = date.getDate();
    let month = date.toLocaleString('default', { month: 'long' });
    let weekday = date.toLocaleString('default', { weekday: 'long' });

    if (flag == true) {return `${day} ${month}`;}
    else if (flag == false) {return `${weekday}`;}
}
function directions(flag) {
    switch (flag) {
        case 'N': return 'North';
        case 'E': return 'East';
        case 'W': return 'West';
        case 'S': return 'South';
    }
}

getResponse();

// http://api.weatherapi.com/v1/forecast.json?key=ffbffdcda0644538b3d113835240407&q=Cairo