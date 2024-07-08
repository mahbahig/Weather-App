const key = 'ffbffdcda0644538b3d113835240407';
const baseUrl = 'https://api.weatherapi.com/v1';
const forecastUrl = '/forecast.json';

const city = document.querySelector('#city');
const currentTemp = document.querySelector('#currentTemp');
const today = document.querySelector('#today');
const tomorrow = document.querySelector('#tomorrow');
const afterTom = document.querySelector('#afterTom');
const date = document.querySelector('#date');
const stat = document.querySelector('#status');
const statTom = document.querySelector('#statusTom');
const statAfterTom = document.querySelector('#statusAfterTom');
const rain = document.querySelector('#rain');
const wind = document.querySelector('#wind');
const direction = document.querySelector('#direction');
const tomMax = document.querySelector('#tomMax');
const tomMin = document.querySelector('#tomMin');
const afterTomMax = document.querySelector('#afterTomMax');
const afterTomMin = document.querySelector('#afterTomMin');

async function getResponse() {
    let data = await fetch(`${baseUrl}${forecastUrl}?key=${key}&q=Cairo&days=3`);
    // let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ffbffdcda0644538b3d113835240407&q=Cairo&days=3`);
    let finalData = await data.json();

    city.innerHTML = finalData.location.name;
    currentTemp.innerHTML = finalData.current.temp_c;
    date.innerHTML = formatDate('date');
    today.innerHTML = formatDate('today');
    tomorrow.innerHTML = formatDate('tom');
    afterTom.innerHTML = formatDate('afterTom');
    stat.innerHTML = finalData.forecast.forecastday[0].day.condition.text;
    statTom.innerHTML = finalData.forecast.forecastday[0].day.condition.text;
    statAfterTom.innerHTML = finalData.forecast.forecastday[0].day.condition.text;
    rain.innerHTML = finalData.current.humidity;
    wind.innerHTML = finalData.current.wind_kph;
    tomMax.innerHTML = finalData.forecast.forecastday[1].day.maxtemp_c
    tomMin.innerHTML = finalData.forecast.forecastday[1].day.mintemp_c
    afterTomMax.innerHTML = finalData.forecast.forecastday[2].day.maxtemp_c
    afterTomMin.innerHTML = finalData.forecast.forecastday[2].day.mintemp_c
    direction.innerHTML = directions(finalData.current.wind_dir);
}

function formatDate(flag) {
    let date = new Date();

    if (flag == 'date') {
        let day = date.getDate();
        let month = date.toLocaleString('default', { month: 'long' });
        return `${day} ${month}`;
    }
    else if (flag == 'today') {
        let weekday = date.toLocaleString('default', { weekday: 'long' });
        return `${weekday}`;
    }
    else if (flag == 'tom') {
        date.setDate(date.getDate() + 1);
        let tomorrowDayName = date.toLocaleString('default', { weekday: 'long' });
        return `${tomorrowDayName}`;
    }
    else if (flag == 'afterTom') {
        date.setDate(date.getDate() + 2);
        let afterTomorrowDayName = date.toLocaleString('default', { weekday: 'long' });
        return `${afterTomorrowDayName}`;
    }
}

function directions(flag) {
    let direction = flag.charAt(flag.length - 1)
    switch (direction) {
        case 'N': return 'North';
        case 'E': return 'East';
        case 'W': return 'West';
        case 'S': return 'South';
    }
}

getResponse();

// https://api.weatherapi.com/v1/forecast.json?key=ffbffdcda0644538b3d113835240407&q=Cairo&days=3