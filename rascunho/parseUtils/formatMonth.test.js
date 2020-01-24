const formatMonth = require('./formatMonth');

test('formatmonth 9 = 09', () => {
  expect(formatMonth(9)).toBe('09');
});

test('formatmonth 10 = 10', () => {
  expect(formatMonth(10)).toBe('10');
});

test('formatmonth 9 = 09', () => {
  expect(formatMonth(1)).toBe('01');
});
