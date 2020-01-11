// Utiliza a Receita Bruta dos Últimos 12 meses e a despesa total com folha de pagamento dos últimos meses para calcular o Fator R.
// Pode ser utilizado por empresas do Simples Nacional do Anexo III ou V, sujeitas ao Fator R


const data = [
  { competencia: '2018/09', receita: 0, folha: 0 },
  { competencia: '2020/01', receita: 10000, folha: 1800 },
  { competencia: '2020/02', receita: 10000, folha: 1800 },
  { competencia: '2020/03', receita: 10000, folha: 1800 },
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

/***
 * UTILITÁRIOS
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

function somar(key, data) {
  return data.reduce((a,b) => a + (b[key] || 0), 0);
}

function classificar(data) {
  const sorted = data.sort((a,b) => { 
    if (a.competencia > b.competencia) return -1;
    if (a.competencia < b.competencia) return 1;
    return 0;
  });
  return sorted
}

function validar(data) {
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


/***
 * METÓDO PRINCIPAL
 */

function fatorR(data) {
  // Recebe um array de objetos contendo: competencia, receita e folha
  // Classifica por competência e filtra apenas as últimas 12
  
  const sorted = classificar(data);
  // ##Mudar para 12 quando terminar
  const filtered = sorted.slice(0, 12);

  // VERIFICAR SE TEM ALGUMA COMPETÊNCIA FALTANDO
  
  const validacao = validar(filtered)
  if (validacao) { return console.warn('Erro: Todos os meses devem estar cadastrados.')}
  console.log('Dados validados com sucesso!');

  const recTotal = somar('receita', filtered);
  const folhaTotal = somar('folha', filtered);

  const fatorR = folhaTotal / recTotal;
  const competencia = addMonth(filtered[0].competencia);
  
  return {fatorR, competencia, recTotal, folhaTotal, filtered};
}

/***
 * CHAMAR O MÉTODO
 */

const response = fatorR(data);
if (response) {
  console.log(`Fator R: ${response.fatorR} da competência: ${response.competencia}`);
  
  console.log(`Receita Total: ${response.recTotal} e Total da Folha: ${response.folhaTotal}`)
  console.log('Informações Utilizadas:');
  console.log(response.filtered);
}
