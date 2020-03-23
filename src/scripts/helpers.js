function getLocationWithoutSeconds(param) {
  const i = param.indexOf('\'') + 1;
  return param.slice(0, i);
}

function getSeasons(month) {
  let season;
  switch (true) {
    case month === 'December':
    case month === 'January':
    case month === 'February':
      season = 'winter';
      break;
    case month === 'March':
    case month === 'April':
    case month === 'May':
      season = 'spring';
      break;
    case month === 'June':
    case month === 'July':
    case month === 'August':
      season = 'summer';
      break;
    case month === 'September':
    case month === 'October':
    case month === 'November':
      season = 'autumn';
      break;
    default:
      season = 'season undefined';
  }
  return season;
}

function getPeriodDay(hour) {
  let periodDay;
  switch (true) {
    case hour >= 0 && hour <= 3:
      periodDay = 'night';
      break;
    case hour >= 4 && hour <= 11:
      periodDay = 'morning';
      break;
    case hour >= 12 && hour <= 16:
      periodDay = 'afternoon';
      break;
    case hour >= 17 && hour <= 23:
      periodDay = 'evening';
      break;
    default:
      periodDay = 'period undefined';
  }
  return periodDay;
}

export {
  getLocationWithoutSeconds,
  getSeasons,
  getPeriodDay,
};
