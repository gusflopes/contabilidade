/* Adicionar Meses
Expected values
2018/11 + 1 = 2018/12
2018/12 + 1 = 2019/01
*/

module.exports = {
  async formatMonth(n) {
    return n > 9 ? `${n}` : `0${n}`;
  },

  async addMonth(input) {
    const parts = input.split('/');
    const anoAtual = parseInt(parts[0]);
    const mesAtual = parseInt(parts[1]);

    if (mesAtual === 12) {
      return `${anoAtual + 1}/01`;
    }
    return `${parts[0]}/${(mesAtual + 1).formatMonth}`;
    // return `${parts[0]}/${formatMonth(mesAtual + 1)}`;
  },
};
