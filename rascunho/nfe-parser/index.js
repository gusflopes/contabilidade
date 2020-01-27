/* eslint-disable */
const convert = require('xml-js');
const fs = require('fs');

module.exports = {
  nfeParser: async xmlFile => {
    const xmlfile = fs.readFileSync(
      './rascunho/assets/nfe-example.xml',
      'utf8'
    );
    const options = { compact: true, ignoreComment: true, spaces: 4 };

    const { nfeProc } = await convert.xml2js(xmlfile, options);

    const { NFe } = nfeProc;
    const { ide, emit, dest, det, total, tranp } = NFe;
    console.log(ide);

    return NFe;
  },
  hello: () => {
    return 'Hello World';
  },
};
