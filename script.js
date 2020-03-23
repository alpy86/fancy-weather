// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// const saveCanvasImage = 'canvasImage';
// const saveSizeCanvas = 'sizeCanvas';
// const saveCurrentCity = 'currentCity';
// const saveUrlImage = 'currentUrlImage';
// const saveColor = 'currentColor';
// const messageError = document.getElementById('error-load');
// const bodyForCursor = document.getElementsByTagName('body')[0];
// let currentTool = 'none';
// let newCity = 'Minsk';
// let currentSizeCanvas = '512';
let currentUrlImage = 'none';
let changeCity = 'none';
let localDate;
let currentHour = 0;
let currentMonth = "january";
let requestWeatherData = new Object();
// if (localStorage.getItem(saveUrlImage)) {
//   currentUrlImage = localStorage.getItem(saveUrlImage);
// }
let weatherNow = new Object();
let forecastWeather = new Object();

let saveLang = 'saveLang';
let saveDegree = 'saveDegree';
let currentLanguage = "en";
let degree = " C\u00B0";
let paramSite = {
  apparent: {
    en: 'feels like: ',
    ru: 'ощущается: ',
    be: 'адчуваецца: ',
  },
  wind: {
    en: 'wind: ',
    ru: 'ветер: ',
    be: 'вецер: ',
  },
  gusts: {
    en: 'gusts up to ',
    ru: 'порывы до ',
    be: 'парывы да ',
  },
  humidity: {
    en: 'humidity: ',
    ru: 'влажность ',
    be: 'вільготнасць ',
  },
  latitude: {
    en: 'Latitude: ',
    ru: 'Широта: ',
    be: 'Шырата: ',
  },
  longitude: {
    en: 'Longitude: ',
    ru: 'Долгота: ',
    be: 'Даўгата: ',
  },
  speed: {
    en: ' m/s',
    ru: ' м/с',
    be: ' м/с',
  },
}

let dateLangBel = {
  weekday: {
    short: ['нд', 'пн', 'ат', 'ср', 'чц', 'пт', 'сб'],
    long: ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'],
  },
  month: ['студзеня', 'лютага', 'сакавіка', 'красавіка', 'траўня', 'чэрвеня', 
          'ліпеня', 'жніўня', 'верасня', 'кастрычніка', 'лістапада', 'снежня'],
}

document.body.insertAdjacentHTML("afterbegin",
  `<header>
    <button class="btn-backgrd" id ="btn-backgrd">
      Background
    </button>
    <select id="select-lang">
      <option>ru</option>
      <option>be</option>
      <option>en</option>
    </select>
    <div class="btn-degree">
      <input type="checkbox" class="btn-degree-check" id="btn-degree">
      <div class="degree-knobs"></div>
      <div class="degree-layer"></div>
    </div>
    <label class="label-city" for="select-city">
      <i class="fas fa-search"></i>
      <input type="text" class="select-city" name="select-city" id="select-city">
    </label>
  </header>
  <main>
    <section>
      <div class="location">
        <p>
          <span id="current-city"></span>
          <span id="current-country"></span>
          <span id="current-date"></span>
        <p>
      </div>
      <div class="current-weather" id="current-weather">
        <p class="sum-weather" id="sum-weather"></p>
        <p class="feeling-temper" id="feeling-temper"></p>
        <p class="current-temper" id="current-temper"></p>
        <img class="icon-weather" id="icon-weather" src="#" alt="sunny">
        <p class="humidity-weather" id="humidity-weather"></p>
        <p class="wind-weather" id="wind-weather">
          <span class="wind-gast-weather" id="wind-gast-weather"></span>
        </p>
      </div>
    </section>
    <section>
      <div class="TEMPORARY-BUTTONS">
        <button class="btn-ip" id ="btn-ip">
          Get data user
        </button>
        <button class="btn-weather" id ="btn-weather">
          Get weather
        </button>
      </div>
      <div class="geo-location">
        <p id="geo-latitude"><p>
        <p id="geo-longitude"><p>
      </div>
    </section>
    <section class="forecast-weather" id="forecast-weather">
      <div class="forecast-day">
        <p class="first-weekday" id="first-weekday"></p>
        <p class="first-temper" id="first-temper"></p>
        <img class="forecast-icon" id="first-icon" src="#" alt="sunny">
      </div>
      <div class="forecast-day">
        <p class="second-weekday" id="second-weekday"></p>
        <p class="second-temper" id="second-temper"></p>
        <img class="forecast-icon" id="second-icon" src="#" alt="sunny">
      </div>
      <div class="forecast-day">
        <p class="third-weekday" id="third-weekday"></p>
        <p class="third-temper" id="third-temper"></p>
        <img class="forecast-icon" id="third-icon" src="#" alt="sunny">
      </div>
    </section>
  </main>`
);

// document.body.insertAdjacentHTML("afterbegin",
//   `<button class="btn-map" id ="btn-map">
//     Get map
//   </button>
//   <img id="img-map" src="#" alt="map"`);


let selectLang = document.getElementById('select-lang');
let optionsLang = selectLang.options;

if (localStorage.getItem(saveLang)) {
  currentLanguage = localStorage.getItem(saveLang);
  for (let i = 0; i < optionsLang.length; i++) {
    if (optionsLang[i].text === currentLanguage) {
      selectLang.selectedIndex = i;
    }
  }
}

selectLang.addEventListener('change', () => {
  let indexLang = selectLang.selectedIndex;
  currentLanguage = optionsLang[indexLang].text;
  getDataAboutWeather();
  updateInfApp(changeCity);
});

let toggleDegree = document.getElementById('btn-degree');

if (localStorage.getItem(saveDegree)) {
  degree = localStorage.getItem(saveDegree);
  if (degree === ' F\u00B0') {
    toggleDegree.checked = true;
  }
}

toggleDegree.addEventListener('change', () => {
  if (toggleDegree.checked) {
    degree = ' F\u00B0';
  } else {
    degree = ' C\u00B0';
  }
  changeScaleTemp(requestWeatherData);
});

const selectCity = document.getElementById('select-city');
selectCity.addEventListener('change', () => {
  changeCity = selectCity.value;
  updateInfApp(changeCity);
}); //select City through select/option

document.getElementById('btn-ip').addEventListener('click', getLocationUser);

async function getLocationUser() {
  const baseUrl = `https://ipinfo.io/json?token=`;
  const accessKey = 'b982ebf358550b';
  const url = baseUrl + accessKey;
  try {
    const response = await fetch(url);
    let data = await response.json();
    console.log(data.city);
    changeCity = data.city;
    updateInfApp(changeCity);
  } catch (e) {
    throw new Error(e);
  }
}

let latitudeCity = document.getElementById('geo-latitude');
let longitudeCity = document.getElementById('geo-longitude');

let currentCity = document.getElementById('current-city');
let currentCountry = document.getElementById('current-country');
let currentDate = document.getElementById('current-date');
let currentLat;
let currentLng;
let offset = 0;

async function updateInfApp(city) {
  console.log(city);
  const baseUrl = `https://api.opencagedata.com/geocode/v1/json?q=`;
  const openCageDataKey = '7ef1d00f103e431a9082c712056d7c35';
  const url = `${baseUrl}${city}&key=${openCageDataKey}&language=${currentLanguage}&pretty=1`;
  try {
    const response = await fetch(url);
    let data = await response.json();
    latitudeCity.textContent = `${paramSite.latitude[currentLanguage]}${data.results[0].annotations.DMS.lat}`;
    currentLat = data.results[0].geometry.lat;
    currentLng = data.results[0].geometry.lng;
    console.log(currentLat);
    console.log(currentLng);
    offset = data.results[0].annotations.timezone.offset_sec * 1000;
    longitudeCity.textContent = `${paramSite.longitude[currentLanguage]}${data.results[0].annotations.DMS.lng}`;
    console.log(data.results[0]);
    if (data.results[0].components.city) {
      currentCity.textContent = `${data.results[0].components.city}, `;
    } else if (data.results[0].components.county) {
      currentCity.textContent = `${data.results[0].components.county}, `;
    } else {
      currentCity.textContent = `${data.results[0].components.state}, `;
    }
    currentCountry.textContent = `${data.results[0].components.country}`;
    console.log(data);
  } catch (e) {
    throw new Error(e);
  }
}

document.body.onload = digitalWatch();

function digitalWatch() {
  getDigitalWatch();
  setInterval(function () {
    getDigitalWatch();
  }, 10000);
}

function getDigitalWatch() {
  let date = new Date();
  let timeZoneOffsetInMs = date.getTimezoneOffset() * 60000;
  if (offset) {
    localDate = new Date(Date.now() + offset + timeZoneOffsetInMs);
  } else {
    localDate = new Date(Date.now());
  }
  
  let optionsDate = {
    weekday: 'short', month: 'long', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric'
  };
  if (currentLanguage === 'be') {
    currentDate.textContent = `${dateLangBel.weekday.short[localDate.getDay()]}, ${localDate.getDate()}, ${dateLangBel.month[localDate.getMonth()]},
    ${localDate.toLocaleString('be', { hour: 'numeric', minute: 'numeric', second: 'numeric'})}`;
  } else {
    currentDate.textContent = localDate.toLocaleString(`${currentLanguage}`, optionsDate);
  }
  currentMonth = localDate.toLocaleString('en', { month: 'long' }); // define place
  currentHour = localDate.toLocaleString('ru', { hour: 'numeric' });
}

function getWeekday(time, lang) {
  let date = new Date();
  let timeZoneOffsetInMs = date.getTimezoneOffset() * 60000;
  let dateForecast = new Date(time * 1000 + offset + timeZoneOffsetInMs);
  let nameWeekdayForecast = dateForecast.toLocaleString(lang, { weekday: 'long' });
  if (lang === "be") {
    nameWeekdayForecast = dateLangBel.weekday.long[dateForecast.getDay()];
  }
  return nameWeekdayForecast;
}

let getSeasons = function (month) {
  let season;
  switch (true) {
    case month === 'December':
    case month === 'January':
    case month === 'February':
      season = "winter";
      break;
    case month === 'March':
    case month === 'April':
    case month === 'May':
      season = "spring";
      break;
    case month === 'June':
    case month === 'July':
    case month === 'August':
      season = "summer";
      break;
    case month === 'September':
    case month === 'October':
    case month === 'November':
      season = "autumn";
      break;
    default:
      season = "season undefined";
  }
  return season;
}

let getPeriodDay = function (hour) {
  let periodDay;
 switch (true) {
  case hour >= 0 && hour <= 3:
    periodDay = "night";
    break;
  case hour >= 4 && hour <= 11:
    periodDay = "morning";
    break;
  case hour >= 12 && hour <= 16:
    periodDay = "afternoon";
    break;
  case hour >= 17 && hour <= 23:
    periodDay = "evening";
    break;
  default:
    periodDay = "period undefined";
  }
  return periodDay;
}


let imgMap = document.getElementById('img-map');

// document.getElementById('btn-map').addEventListener('click', async () => {
//   const baseUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4241,37.78,14.25,0,60/600x600?access_token=`;
//   let mapBoxKey = 'pk.eyJ1IjoiYWxweTg2IiwiYSI6ImNrM2l6Y2dxODBjcWIzbm9jOXJncGJ3YzMifQ.bK-wG1P-1g5YLwEJP3KAPA';
//   const url = `${baseUrl}${mapBoxKey}`;
//   try {
//     const response = await fetch(url);
//     console.log(response);
//     let data = await response.json();
//     console.log(data);
//     imgMap.src = data;
//   } catch (e) {
//     throw new Error(e);
//   }
// });



weatherNow.apparentTemperature = document.getElementById('feeling-temper');
weatherNow.currentTemperature = document.getElementById('current-temper');
weatherNow.currentHumidity = document.getElementById('humidity-weather');
weatherNow.currentWindSpeed = document.getElementById('wind-weather');
weatherNow.currentWindGust = document.getElementById('wind-gast-weather');
weatherNow.summary = document.getElementById('sum-weather');
weatherNow.icon = document.getElementById('icon-weather');
console.log(weatherNow);



let getTemp = function(temp) {
  if (degree === ' F\u00B0') {
    temp = temp * 9 / 5 + 32;
  }
  return temp;
}

forecastWeather.firstDayTemper = document.getElementById('first-temper');
forecastWeather.firstWeekDay = document.getElementById('first-weekday');
forecastWeather.firstIcon = document.getElementById('first-icon');
forecastWeather.secondDayTemper = document.getElementById('second-temper')
forecastWeather.secondWeekDay = document.getElementById('second-weekday');
forecastWeather.secondIcon = document.getElementById('second-icon');
forecastWeather.thirdDayTemper = document.getElementById('third-temper');
forecastWeather.thirdWeekDay = document.getElementById('third-weekday');
forecastWeather.thirdIcon = document.getElementById('third-icon');
console.log(forecastWeather);

document.getElementById('btn-weather').addEventListener('click', getDataAboutWeather);

async function getDataAboutWeather() {
  const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
  const baseUrl = 'https://api.darksky.net/forecast/';
  let darkSkyKey = '272de4feea55039132960731322b3885';
  console.log(`${baseUrl}${darkSkyKey}/${currentLat},${currentLng}`);
  const url = `${corsAnywhere}${baseUrl}${darkSkyKey}/${currentLat},${currentLng}?lang=${currentLanguage}&units=si`;
  try {
    const response = await fetch(url);
    console.log(response);
    let dataWeather = await response.json();
    console.log(dataWeather);
    changeScaleTemp(dataWeather);
    setWeekdayForecast(dataWeather);
    weatherNow.summary.textContent = dataWeather.currently.summary;  
    weatherNow.currentHumidity.textContent = `${paramSite.humidity[currentLanguage]}${Math.ceil(dataWeather.currently.humidity * 100)} %`;
    weatherNow.currentWindSpeed.textContent = paramSite.wind[currentLanguage] + Math.ceil(dataWeather.currently.windSpeed) + paramSite.speed[currentLanguage];
    weatherNow.currentWindGust.value = paramSite.gusts[currentLanguage] + Math.ceil(dataWeather.currently.windGust) + paramSite.speed[currentLanguage];
    weatherNow.icon.src = `assets/${dataWeather.currently.icon}.png`;
    weatherNow.icon = dataWeather.currently.icon;
    
    forecastWeather.firstIcon.src = `assets/${dataWeather.daily.data[1].icon}.png`;
    forecastWeather.secondIcon.src = `assets/${dataWeather.daily.data[2].icon}.png`;
    forecastWeather.thirdIcon.src = `assets/${dataWeather.daily.data[3].icon}.png`;
    console.log(dataWeather.daily.data[1].temperatureMax);
  } catch (e) {
    throw new Error(e);
  }
}

function changeScaleTemp(obj) {
  requestWeatherData = obj;
  if (obj) {
  weatherNow.apparentTemperature.textContent = paramSite.apparent[currentLanguage] + getTemp(obj.currently.apparentTemperature).toFixed(1) + degree;
  weatherNow.currentTemperature.textContent = getTemp(obj.currently.temperature).toFixed(1) + degree;
  forecastWeather.firstDayTemper.textContent = getTemp(((obj.daily.data[1].temperatureMax - obj.daily.data[1].temperatureMin) / 2)).toFixed() + degree;
  forecastWeather.secondDayTemper.textContent = getTemp(((obj.daily.data[2].temperatureMax - obj.daily.data[2].temperatureMin) / 2)).toFixed() + degree;
  forecastWeather.thirdDayTemper.textContent = getTemp(((obj.daily.data[3].temperatureMax - obj.daily.data[3].temperatureMin) / 2)).toFixed() + degree;
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





let changeBackgrd = document.getElementById('btn-backgrd');
changeBackgrd.addEventListener('click', async () => {
  const baseUrl = `https://api.unsplash.com/photos/random?query=${getSeasons(currentMonth)},${getPeriodDay(currentHour)},${weatherNow.icon}&client_id=`;
  const accessKey = '7ecf2c24d5d034741fef228be12d923381e2468cf13c79ee3b5236b81f3f5220';
  const url = baseUrl + accessKey;
  console.log(`season:   ${getSeasons(currentMonth)}`);
  console.log(`hour:   ${getPeriodDay(currentHour)}`);
  console.log(`weather:   ${weatherNow.icon}`);
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
    console.log(data);
  } catch (e) {
    throw new Error(e);
  }
  currentUrlImage = data.urls.regular;
  document.body.style = `background-image: url(${currentUrlImage})`;
});

window.onbeforeunload = () => {
  localStorage.setItem(saveLang, currentLanguage);
  localStorage.setItem(saveDegree, degree);
};
