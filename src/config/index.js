const paramSite = {
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
    ru: 'влажность: ',
    be: 'вільготнасць: ',
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
  search: {
    en: 'Enter city name',
    ru: 'Укажите название города',
    be: 'Увядзіце назву горада',
  },
  errorCity: {
    en: 'Error: city ​​not found. Try entering the name again.',
    ru: 'Ошибка: город не найден. Попробуйте ввести название еще раз.',
    be: 'Памылка: горад не знойдзены. Паспрабуйце ўвесці назву яшчэ раз.',
  },
  errorWeather: {
    en: 'Error: No weather data found. Try later.',
    ru: 'Ошибка: данные о погоде не найдены. Попробуйте позже.',
    be: 'Памылка: дадзеныя пра надвор\'е не знойдзены. Паспрабуйце пазней.',
  },
};

const dateLangBel = {
  weekday: {
    short: ['нд', 'пн', 'ат', 'ср', 'чц', 'пт', 'сб'],
    long: ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'],
  },
  month: ['студзеня', 'лютага', 'сакавіка', 'красавіка', 'траўня', 'чэрвеня',
    'ліпеня', 'жніўня', 'верасня', 'кастрычніка', 'лістапада', 'снежня'],
};

const optionsDate = {
  weekday: 'short',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

export {
  paramSite,
  dateLangBel,
  optionsDate,
};
