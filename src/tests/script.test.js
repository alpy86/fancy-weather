import getTemp from './index';

describe('getTemp', () => {
  it('should return temperature in degrees fahrenheit', () => {
    expect(getTemp('24.5', ' F\u00B0')).toBe(76.1);
    expect(getTemp('-5.555', ' F\u00B0')).toBe(22.001);
    expect(getTemp('0', ' F\u00B0')).toBe(32);
    expect(getTemp(0, ' F\u00B0')).toBe(32);
    expect(getTemp(-3, ' F\u00B0')).toBe(26.6);
    expect(getTemp(-18, ' F\u00B0')).toBe(-0.3999999999999986);
  });

  it('should return temperature in degrees fahrenheit', () => {
    expect(getTemp('24.5', ' C\u00B0')).toBe('24.5');
    expect(getTemp('-5.555', ' C\u00B0')).toBe('-5.555');
    expect(getTemp(0, ' C\u00B0')).toBe(0);
    expect(getTemp(-3, ' C\u00B0')).toBe(-3);
  });


  it('check availability plus', () => {
    expect(getTemp(-3, ' F\u00B0')).not.toContain('+');
  });
});
