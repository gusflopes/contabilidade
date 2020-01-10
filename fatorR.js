// Utiliza a Receita Bruta dos Últimos 12 meses e a despesa total com folha de pagamento dos últimos meses para calcular o Fator R.
// Pode ser utilizado por empresas do Simples Nacional do Anexo III ou V, sujeitas ao Fator R

const data = [
  { competencia: '2018/09', receita: 0, folha: 0 },
  { competencia: '2018/10', receita: 10000, folha: 1800 },
  { competencia: '2018/12', receita: 10000, folha: 1800 },
  { competencia: '2018/11', receita: 10000, folha: 1800 },
  { competencia: '2019/01', receita: 10000, folha: 1800 },
  { competencia: '2019/11', receita: 10000, folha: 1800 },
  { competencia: '2019/02', receita: 10000, folha: 1800 },
  { competencia: '2019/03', receita: 10000, folha: 1800 },
  { competencia: '2019/04', receita: 10000, folha: 1800 },
  { competencia: '2019/08', receita: 10000, folha: 1800 },
  { competencia: '2019/06', receita: 10000, folha: 1800 },
  { competencia: '2019/05', receita: 10000, folha: 1800 },
  { competencia: '2019/09', receita: 10000, folha: 1800 },
  { competencia: '2019/07', receita: 10000, folha: 1800 },
  { competencia: '2019/12', receita: 10000, folha: 1800 },
  { competencia: '2019/10', receita: 10000, folha: 1800 },
]

/* Tentar fazer funcionar
function somarReceita(key) {
  return this.reduce((a,b) => a + (b[key] || 0), 0);
}
*/

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


function fatorR(data) {

  const sorted = data.sort((a,b) => { 
    if (a.competencia > b.competencia) return -1;
    if (a.competencia < b.competencia) return 1;
    return 0;
  });
  
  const filtered = sorted.slice(0, 12);
  
  const recTotal = filtered.reduce((a,b) => a + (b['receita'] || 0), 0);
  const folhaTotal = filtered.reduce((a,b) => a + (b['folha'] || 0), 0);
  const fatorR = folhaTotal / recTotal;
  const competencia = addMonth(filtered[0].competencia);
  
  console.log(filtered);

  return {fatorR, competencia, recTotal, folhaTotal};
}

const response = fatorR(data);

console.log(`Fator R: ${response.fatorR} da competência: ${response.competencia}`);

console.log(`Receita Total: ${response.recTotal} e Total da Folha: ${response.folhaTotal}`)
