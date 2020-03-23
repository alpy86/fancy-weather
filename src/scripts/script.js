import 'babel-polyfill';
import './assets';
import { getLocationWithoutSeconds, getSeasons, getPeriodDay } from './helpers';
import template from './template';
import { paramSite, dateLangBel, optionsDate } from '../config/index';
import * as api from '../config/api';

let currentUrlImage = 'none';
let changeCity = 'none';
let currentMonth = 'january';
let currentLanguage = 'en';
let degree = ' C\u00B0';
const saveLang = 'saveLang';
const saveDegree = 'saveDegree';
let requestWeatherData = {};
const weatherNow = {};
const forecastWeather = {};
let localDate;
let currentHour = 0;
let offset = 0;
let currentLat;
let currentLong;

document.body.insertAdjacentHTML('afterbegin', template);

const changeBackgrd = document.getElementById('btn-backgrd');
const selectLang = document.getElementById('select-lang');
const toggleDegree = document.getElementById('btn-degree');
const selectCity = document.getElementById('select-city');
const sayCity = document.getElementById('say-city');
const latitudeCity = document.getElementById('geo-latitude');
const longitudeCity = document.getElementById('geo-longitude');
const currentCity = document.getElementById('current-city');
const currentCountry = document.getElementById('current-country');
const currentDate = document.getElementById('current-date');
const errorMessage = document.getElementById('error-load-data');

weatherNow.paramApparentTemper = document.getElementById('param-feeling');
weatherNow.apparentTemper = document.getElementById('feeling-temper');
weatherNow.currentTemperatureMain = document.getElementById('current-temper-main');
weatherNow.currentTemperatureFraction = document.getElementById('current-temper-fraction');
weatherNow.paramCurrentHumidity = document.getElementById('param-humidity');
weatherNow.currentHumidity = document.getElementById('humidity-weather');
weatherNow.paramCurrentWind = document.getElementById('param-wind');
weatherNow.currentWind = document.getElementById('wind-weather');
weatherNow.paramCurrentWindGust = document.getElementById('param-wind-gast');
weatherNow.currentWindGust = document.getElementById('wind-gast-weather');
weatherNow.summary = document.getElementById('sum-weather');
weatherNow.icon = document.getElementById('icon-weather');

forecastWeather.firstDayTemper = document.getElementById('first-temper');
forecastWeather.firstWeekDay = document.getElementById('first-weekday');
forecastWeather.firstIcon = document.getElementById('first-icon');
forecastWeather.secondDayTemper = document.getElementById('second-temper');
forecastWeather.secondWeekDay = document.getElementById('second-weekday');
forecastWeather.secondIcon = document.getElementById('second-icon');
forecastWeather.thirdDayTemper = document.getElementById('third-temper');
forecastWeather.thirdWeekDay = document.getElementById('third-weekday');
forecastWeather.thirdIcon = document.getElementById('third-icon');

const optionsLang = selectLang.options;
selectCity.placeholder = paramSite.search[currentLanguage];

if (localStorage.getItem(saveLang)) {
  currentLanguage = localStorage.getItem(saveLang);
  selectCity.placeholder = paramSite.search[currentLanguage];
  for (let i = 0; i < optionsLang.length; i++) {
    if (optionsLang[i].text === currentLanguage) {
      selectLang.selectedIndex = i;
    }
  }
}

if (localStorage.getItem(saveDegree)) {
  degree = localStorage.getItem(saveDegree);
  if (degree === ' F\u00B0') {
    toggleDegree.checked = true;
  }
}

getLocationUser(); // load current location user with forecast weather

function getMap() {
  /* eslint-disable */
  mapboxgl.accessToken = api.accessKeyMapBox;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [currentLong, currentLat],
    zoom: 9,
  });
  /* eslint-enable */
}

changeBackgrd.addEventListener('click', getBackgrdImage);

selectLang.addEventListener('change', () => {
  const indexLang = selectLang.selectedIndex;
  currentLanguage = optionsLang[indexLang].text;
  selectCity.placeholder = paramSite.search[currentLanguage];
  updateInfApp(changeCity);
});

toggleDegree.addEventListener('change', () => {
  if (toggleDegree.checked) {
    degree = ' F\u00B0';
  } else {
    degree = ' C\u00B0';
  }
  changeScaleTemp(requestWeatherData);
});

selectCity.addEventListener('change', () => {
  changeCity = selectCity.value;
  updateInfApp(changeCity);
});

// eslint-disable-next-line
const recognition = new webkitSpeechRecognition();
recognition.interimResults = true;

sayCity.addEventListener('click', () => {
  recognition.lang = currentLanguage;
  recognition.onresult = (event) => {
    const result = event.results[event.resultIndex];
    if (result.isFinal) {
      selectCity.value = result[0].transcript;
      changeCity = selectCity.value;
      updateInfApp(changeCity);
    }
  };
  recognition.start();
});

async function getLocationUser() {
  const url = api.urlIpinfo + api.accessKeyIpinfo;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    changeCity = data.city;
  } catch (e) {
    changeCity = 'Vawkavysk';
  }
  updateInfApp(changeCity);
}

async function updateInfApp(city) {
  const url = `${api.urlOpenCage}${city}&key=${api.accessKeyOpenCage}&language=${currentLanguage}&pretty=1`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    latitudeCity.textContent = paramSite.latitude[currentLanguage]
      + getLocationWithoutSeconds(data.results[0].annotations.DMS.lat);
    longitudeCity.textContent = paramSite.longitude[currentLanguage]
      + getLocationWithoutSeconds(data.results[0].annotations.DMS.lng);
    currentLat = data.results[0].geometry.lat;
    currentLong = data.results[0].geometry.lng;
    offset = data.results[0].annotations.timezone.offset_sec * 1000;

    if (data.results[0].components.city) {
      currentCity.textContent = `${data.results[0].components.city}, `;
    } else if (data.results[0].components.county) {
      currentCity.textContent = `${data.results[0].components.county}, `;
    } else {
      currentCity.textContent = `${data.results[0].components.state}, `;
    }

    currentCountry.textContent = `${data.results[0].components.country}`;

    getDataAboutWeather();
    getMap();
    getBackgrdImage();
    getDigitalWatch();

    errorMessage.style.display = 'none';
  } catch (e) {
    errorMessage.textContent = paramSite.errorCity[currentLanguage];
    errorMessage.style.display = 'block';
  }
}

document.body.onload = digitalWatch();

function digitalWatch() {
  getDigitalWatch();
  setInterval(() => {
    getDigitalWatch();
  }, 60000);
}

function getDigitalWatch() {
  const date = new Date();
  const timeZoneOffsetInMs = date.getTimezoneOffset() * 60000;
  if (offset) {
    localDate = new Date(Date.now() + offset + timeZoneOffsetInMs);
  } else {
    localDate = new Date(Date.now());
  }

  if (currentLanguage === 'be') {
    currentDate.textContent = `${dateLangBel.weekday.short[localDate.getDay()]}, 
      ${localDate.getDate()}, ${dateLangBel.month[localDate.getMonth()]},
      ${localDate.toLocaleString('be', { hour: 'numeric', minute: 'numeric' })}`;
  } else {
    currentDate.textContent = localDate.toLocaleString(`${currentLanguage}`, optionsDate);
  }

  currentMonth = localDate.toLocaleString('en', { month: 'long' });
  currentHour = localDate.toLocaleString('ru', { hour: 'numeric' });
}

function getWeekday(time, lang) {
  const date = new Date();
  const timeZoneOffsetInMs = date.getTimezoneOffset() * 60000;
  const dateForecast = new Date(time * 1000 + offset + timeZoneOffsetInMs);
  let nameWeekdayForecast = dateForecast.toLocaleString(lang, { weekday: 'long' });
  if (lang === 'be') {
    nameWeekdayForecast = dateLangBel.weekday.long[dateForecast.getDay()];
  }
  return nameWeekdayForecast;
}

async function getDataAboutWeather() {
  const url = `${api.corsAnywhere}${api.urlDarksky}${api.accessKeyDarkSky}/${currentLat},${currentLong}?lang=${currentLanguage}&units=si`;
  try {
    const response = await fetch(url);
    const dataWeather = await response.json();
    changeScaleTemp(dataWeather);
    setWeekdayForecast(dataWeather);
    weatherNow.summary.textContent = dataWeather.currently.summary;
    weatherNow.paramCurrentHumidity.textContent = paramSite.humidity[currentLanguage];
    weatherNow.currentHumidity.textContent = `${Math.ceil(dataWeather.currently.humidity * 100)} %`;
    weatherNow.paramCurrentWind.textContent = paramSite.wind[currentLanguage];
    weatherNow.currentWind.textContent = Math.ceil(dataWeather.currently.windSpeed)
      + paramSite.speed[currentLanguage];

    if (dataWeather.currently.windGust > 8) {
      weatherNow.paramCurrentWindGust.textContent = paramSite.gusts[currentLanguage];
      weatherNow.currentWindGust.textContent = Math.ceil(dataWeather.currently.windGust)
      + paramSite.speed[currentLanguage];
    } else {
      weatherNow.paramCurrentWindGust.textContent = '';
      weatherNow.currentWindGust.textContent = '';
    }
    weatherNow.icon.src = `assets/${dataWeather.currently.icon}.png`;
    forecastWeather.firstIcon.src = `assets/${dataWeather.daily.data[1].icon}.png`;
    forecastWeather.secondIcon.src = `assets/${dataWeather.daily.data[2].icon}.png`;
    forecastWeather.thirdIcon.src = `assets/${dataWeather.daily.data[3].icon}.png`;
  } catch (e) {
    errorMessage.textContent = paramSite.errorWeather[currentLanguage];
    errorMessage.style.display = 'block';
  }
}

function getTemp(temp) {
  let newTemp = temp;
  if (degree === ' F\u00B0') {
    newTemp = (temp * 9) / 5 + 32;
  }
  return newTemp;
}

function changeScaleTemp(obj) {
  requestWeatherData = obj;
  if (obj) {
    weatherNow.paramApparentTemper.textContent = paramSite.apparent[currentLanguage];
    weatherNow.apparentTemper.textContent = getTemp(obj.currently.apparentTemperature).toFixed(1)
      + degree;
    const resultTemp = String(getTemp(obj.currently.temperature).toFixed(1));
    weatherNow.currentTemperatureMain.textContent = resultTemp.slice(0, resultTemp.indexOf('.'));
    weatherNow.currentTemperatureFraction.textContent = resultTemp.slice(resultTemp.indexOf('.'), resultTemp.indexOf('.') + 2)
      + degree;
    forecastWeather.firstDayTemper.textContent = getTemp(obj.daily.data[1].temperatureMin
      + ((obj.daily.data[1].temperatureMax - obj.daily.data[1].temperatureMin) / 2)).toFixed()
      + degree;
    forecastWeather.secondDayTemper.textContent = getTemp(obj.daily.data[2].temperatureMin
      + ((obj.daily.data[2].temperatureMax - obj.daily.data[2].temperatureMin) / 2)).toFixed()
      + degree;
    forecastWeather.thirdDayTemper.textContent = getTemp(obj.daily.data[3].temperatureMin
      + ((obj.daily.data[3].temperatureMax - obj.daily.data[3].temperatureMin) / 2)).toFixed()
      + degree;
  }
}

function setWeekdayForecast(obj) {
  requestWeatherData = obj;
  if (obj) {
    forecastWeather.firstWeekDay.textContent = getWeekday(obj.daily.data[1].time, currentLanguage);
    forecastWeather.secondWeekDay.textContent = getWeekday(obj.daily.data[2].time, currentLanguage);
    forecastWeather.thirdWeekDay.textContent = getWeekday(obj.daily.data[3].time, currentLanguage);
  }
}

async function getBackgrdImage() {
  const keyWords = `${currentCity.textContent},${getSeasons(currentMonth)},${getPeriodDay(currentHour)},${weatherNow.summary.textContent}`;
  const url = api.urlUnsplash + keyWords + api.accessKeyUnsplash;
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
    currentUrlImage = data.urls.regular;
    document.body.style = `background-image: url(${currentUrlImage})`;
  } catch (e) {
    document.body.style = 'background-color: blue';
  }
}

window.onbeforeunload = () => {
  localStorage.setItem(saveLang, currentLanguage);
  localStorage.setItem(saveDegree, degree);
};
