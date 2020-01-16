/* Adicionar Meses
Expected values
2018/11 + 1 = 2018/12
2018/12 + 1 = 2019/01
*/

const formatMonth = n => {
  return n > 9 ? `${n}` : `0${n}`;
};

const addMonth = input => {
  const parts = input.split('/');
  const anoAtual = parseInt(parts[0], 10);
  const mesAtual = parseInt(parts[1], 10);

  if (mesAtual === 12) {
    return `${anoAtual + 1}/01`;
  }
  // return `${parts[0]}/${(mesAtual + 1).formatMonth}`;
  return `${parts[0]}/${formatMonth(mesAtual + 1)}`;
};

module.exports = { formatMonth, addMonth };
