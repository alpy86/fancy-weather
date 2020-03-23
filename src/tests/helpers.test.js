import * as helpers from '../scripts/helpers';

const getLocWithoutSec = helpers.getLocationWithoutSeconds;
const getSeason = helpers.getSeasons;
const getPeriod = helpers.getPeriodDay;


describe('getLocationWithoutSeconds', () => {
  it('should return location without seconds', () => {
    expect(getLocWithoutSec('53° 54\' 39"')).toBe('53° 54\'');
    expect(getLocWithoutSec('133° 44\' 20"')).toBe('133° 44\'');
  });

  it('check availability seconds', () => {
    expect(getLocWithoutSec('133° 44\' 20"').includes('\'\'')).toBeFalsy();
    expect(getLocWithoutSec('133° 44\' 20"')).not.toContain('\'\'');
  });
});

describe('getSeasons', () => {
  it('should return season', () => {
    expect(getSeason('January')).toBe('winter');
    expect(getSeason('August')).toBe('summer');
  });

  it('without arguments should return defined', () => {
    expect(getSeason()).toBeDefined();
  });

  it('any arguments except month should return season undefined', () => {
    expect(getSeason('any')).toContain('season undefined');
    expect(getSeason('that')).not.toContain('that');
  });
});

describe('getPeriodDay', () => {
  it('should return period day', () => {
    expect(getPeriod(23)).toBe('evening');
    expect(getPeriod('1')).toBe('night');
  });

  it('without arguments should return defined', () => {
    expect(getPeriod()).toBeDefined();
  });

  it('any arguments except hour day should return period undefined', () => {
    expect(getPeriod('any')).toContain('period undefined');
    expect(getPeriod('that')).not.toContain('that');
  });
});
