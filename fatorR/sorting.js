// Ordenar os meses
// REGEX: /[\d]{2}\/[\d]{4}/

const data1 = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const data2 = ['12', '11', '10', '8', '9', '7', '5', '6', '4', '3', '2', '1'];
const data3 = [
  { competencia: '2019/12' },
  { competencia: '2019/06' },
  { competencia: '2018/12' },
  { competencia: '2018/06' },
];
const data = [
  { competencia: '12/2019' },
  { competencia: '01/2019' },
  { competencia: '11/2019' },
  { competencia: '02/2019' },
  { competencia: '04/2019' },
  { competencia: '03/2019' },
  { competencia: '08/2019' },
  { competencia: '06/2019' },
  { competencia: '05/2019' },
  { competencia: '09/2019' },
  { competencia: '07/2019' },
  { competencia: '10/2019' },
  { competencia: '01/2018' },
  { competencia: '06/2018' },
  { competencia: '04/2017' },
  { competencia: '09/2016' },
];

// Sorting Array
// console.log(data1.sort((a,b) => { return a - b }));
// console.log(data2.sort((a,b) => { return a - b }));

// Sorting Objects
const output = data3.sort((a, b) => {
  if (a.competencia > b.competencia) return 1;
  if (a.competencia < b.competencia) return -1;
  return 0;
});

console.log(output);

// Filtering 4 first objects
const filtered = output.slice(0, 4);

console.log(`Lenght: ${output.length} || Apenas 4 primeiros:`);
console.log(filtered);
