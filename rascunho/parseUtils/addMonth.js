const formatMonth = require('./formatMonth');

const addMonth = input => {
  const parts = input.split('/');
  const anoAtual = parseInt(parts[0], 10);
  const mesAtual = parseInt(parts[1], 10);

  if (mesAtual === 12) {
    return `${anoAtual + 1}/01`;
  }
  return `${parts[0]}/${formatMonth(mesAtual + 1)}`;
};

module.exports = addMonth;
