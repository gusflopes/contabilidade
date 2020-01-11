
function formatMonth(n) {
  return n > 9 ? "" + n: "0" + n
}

function addMonth(input) {
  const parts = input.split('/');
  const anoAtual = parseInt(parts[0]);
  const mesAtual = parseInt(parts[1]);

  if (mesAtual === 12) {
    return `${anoAtual + 1}/01`
  }
    return `${parts[0]}/${formatMonth(mesAtual + 1)}`
}

  /***
 * UTILITÁRIOS
 */
/*
const formatMonth = (n) => {
  return n > 9 ? "" + n: "0" + n
},
*/

const addMonthFunc = (input) => {
  const parts = input.split('/');
  const anoAtual = parseInt(parts[0]);
  const mesAtual = parseInt(parts[1]);

  if (mesAtual === 12) {
    return `${anoAtual + 1}/01`
  }
    return `${parts[0]}/${formatMonth(mesAtual + 1)}`
}

const somar = (key, data) => {
  return data.reduce((a,b) => a + (b[key] || 0), 0);
}

const classificar = (data) => {
  const sorted = data.sort((a,b) => { 
    if (a.competencia > b.competencia) return -1;
    if (a.competencia < b.competencia) return 1;
    return 0;
  });
  return sorted
}

const validar = (data) => {
  console.log(data.length)
  var n = 0;
  var erro;

  data.forEach(function (item) {
    if (n === (data.length -1)) {
      console.log('Não precisa verificar');
      return;
    } else {
      if (data[n].competencia === addMonth(data[n+1].competencia)) {
        console.log(`Passou na validação de: ${data[n].competencia}`);
        console.log(item);
        n++
        return;
      } else {
        console.warn(`!!! Não passou na validação de: ${data[n].competencia}. n = ${n}/${data.length}`);
        console.log(item);
        erro = true;
        return 'erro!';
      }
    }
    })

  if (erro) { return erro}
  return;
}

const round = (num, places) => {
	if (!("" + num).includes("e")) {
		return +(Math.round(num + "e+" + places)  + "e-" + places);
	} else {
		let arr = ("" + num).split("e");
		let sig = ""
		if (+arr[1] + places > 0) {
			sig = "+";
		}

		return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
	}
}

console.log(round(1.005, 2)); // 1.01

module.exports = {formatMonth, addMonthFunc, somar, classificar, validar, round}