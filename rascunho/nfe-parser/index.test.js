const { nfeParser, hello } = require('./index');

function sum(a, b) {
  return a + b;
}

describe('NFe Parser', () => {
  it('should return 3 when we sum 1+2', async () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('should be able to call the hello funciton', async () => {
    expect(hello()).toContain(String('Hello World'));
  });
  it('should be able to import the XML NFe', async () => {
    const nfe = await nfeParser('./rascunho/assets/nfe-example.xml');
    expect(nfe).toBe(Object);
  });
});
