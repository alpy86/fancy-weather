const template = `<header>
<div class="control-panel">
  <button class="btn-backgrd" id ="btn-backgrd">
    <i class="fas fa-image"></i>
  </button>
  <select class="select-lang" id="select-lang">
    <option>en</option>
    <option>ru</option>
    <option>be</option>
  </select>
  <div class="btn-degree">
    <input type="checkbox" class="btn-degree-check" id="btn-degree">
    <div class="degree-knobs"></div>
    <div class="degree-layer"></div>
  </div>
  <label class="label-city" for="select-city">
    <input type="text" class="select-city" name="select-city" id="select-city">
    <i class="fas fa-microphone" id="say-city"></i>
  </label>
</div>
<div class="background-border" id="current-date"></div>
<div class="error-load-data" id="error-load-data"></div>
</header>
<main>
<section class="current-param-weather background-border">
  <p class="sum-weather" id="sum-weather"></p>
  <p>
    <span class="description-weather" id="param-feeling"></span>
    <span class="value-weather" id="feeling-temper"></span>
  </p>
  <p>
    <span class="description-weather" id="param-humidity"></span>
    <span class="value-weather" id="humidity-weather"></span>
  </p>
  <p>
    <span class="description-weather" id="param-wind"></span>
    <span class="value-weather" id="wind-weather"></span>
  </p>
  <p>
    <span class="description-weather-wind-gast" id="param-wind-gast"></span>
    <span class="value-weather" id="wind-gast-weather"></span>
  </p>
</section>
<section class="current-temper-icon background-border">
  <div class="city-country-icon">
    <div class="city-country">
      <p class="current-location" id="current-city"></p>
      <p class="current-location" id="current-country"></p>
    </div>
    <img class="icon-weather" id="icon-weather" src="#" alt="sunny">
  </div>
  <p class="current-temper">
    <span class="current-temper-main" id="current-temper-main"></span>
    <span class="current-temper-fraction" id="current-temper-fraction"></span>
  </p>
</section>
<section class="location-map">
  <div class="geo-location background-border">
    <p class="geo-text" id="geo-latitude"></p>
    <p class="geo-text" id="geo-longitude"></p>
  </div>
  <div class="wrapper-map" id='map'></div> 
</section>
</main>
<footer>
  <div class="forecast-day background-border">
    <p class="weekday" id="first-weekday"></p>
    <div class="temper-icon">
      <img class="forecast-icon" id="first-icon" src="#" alt="sunny">
      <p class="forecast-temper" id="first-temper"></p>
    </div>
  </div>
  <div class="forecast-day background-border">
    <p class="weekday" id="second-weekday"></p>
    <div class="temper-icon">
      <img class="forecast-icon" id="second-icon" src="#" alt="sunny">
      <p class="forecast-temper" id="second-temper"></p>
    </div>
  </div>
  <div class="forecast-day background-border">
    <p class="weekday" id="third-weekday"></p>
    <div class="temper-icon">
      <img class="forecast-icon" id="third-icon" src="#" alt="sunny">
      <p class="forecast-temper" id="third-temper"></p>
    </div>
  </div>
</footer>`;

export default template;
