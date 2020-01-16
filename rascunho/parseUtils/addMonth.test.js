/* Adicionar Meses
Expected values
2018/11 + 1 = 2018/12
2018/12 + 1 = 2019/01
*/
const formatMonth = require('./utils');
// function formatMonth(n) {
//   return n > 9 ? "" + n: "0" + n
// }

function addMonth(input) {
  const parts = input.split('/');
  const anoAtual = parseInt(parts[0]);
  const mesAtual = parseInt(parts[1]);

  if (mesAtual === 12) {
    return `${anoAtual + 1}/01`
  }
    return `${parts[0]}/${formatMonth(mesAtual + 1)}`
}

console.log(addMonth('2018/11'));
console.log(addMonth('2018/12'));
console.log(addMonth('2019/01'));
