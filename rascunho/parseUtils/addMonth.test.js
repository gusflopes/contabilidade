const addMonth = require('./addMonth');

test('add Month 2018/11 + 1', () => {
  expect(addMonth('2018/11')).toBe('2018/12');
});

test('add Month 2018/12 + 1', () => {
  expect(addMonth('2018/12')).toBe('2019/01');
});

test('add Month 2018/09 + 1', () => {
  expect(addMonth('2018/09')).toBe('2018/10');
});
