const { nfeParser, hello } = require('./index');

test('shoulb be able to call the hello funciton', async () => {
  hello();
  expect(hello()).toBeCalled();
});
