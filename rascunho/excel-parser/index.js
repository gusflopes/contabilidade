const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const format = require('date-fns/format');
const utils = require('./utils');

async function writeFile(file, data) {
  fs.appendFile(file, data, err => {
    if (err) throw err;
    console.log('The data was appended to file!');
  });

  return console.log(`${file} was generated.`);
}

async function createOutput(data, cnpj, user) {
  let output = `|0000|${cnpj}|\n`;
  data.map(n => {
    const { date, debit, credit, value, description } = n;
    const formattedDate = format(date, 'dd/MM/yyyy');

    output += `|6000|X||||`;
    output += `|6100|${formattedDate}|${debit}|${credit}|${value}||${description}|${user}||`;
  });

  return output;
}

async function importFile(filePath) {
  const importedExcel = excelToJson({
    sourceFile: filePath,
    header: {
      rows: 1,
    },
    columnToKey: {
      A: 'date',
      B: 'debit',
      C: 'credit',
      D: 'value',
      E: 'description',
    },
  });

  return Object.values(importedExcel)[0];
}

const file = utils.generateFileName();
const filePath = 'template.xlxs';
const cnpj = '26649391000163';
const user = 'ADMIN';
