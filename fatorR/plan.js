// Planejamento para benefício com tributação no Anexo III
// Simulador 

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

const Utils = require('./utils');

function formatCurrency(value) {
  // return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function fatorR(data) {
  // Recebe um array de objetos contendo: competencia, receita e folha
  // Classifica por competência e filtra apenas as últimas 12
  
  const sorted = Utils.classificar(data);
  // ##Mudar para 12 quando terminar
  const filtered = sorted.slice(0, 12);

  // VERIFICAR SE TEM ALGUMA COMPETÊNCIA FALTANDO
  
  const validacao = Utils.validar(filtered)
  if (validacao) { return console.warn('Erro: Todos os meses devem estar cadastrados.')}
  console.log('Dados validados com sucesso!');

  const recTotal = Utils.somar('receita', filtered);
  const folhaTotal = Utils.somar('folha', filtered);

  const fatorR = folhaTotal / recTotal;
  const competencia = Utils.addMonthFunc(filtered[0].competencia);
  
  return {fatorR, competencia, recTotal, folhaTotal, filtered};
}

/***
 * CHAMAR O MÉTODO
 */

const response = fatorR(data);

function planejar(filtered, projReceita, projFolha) {
  // Excluir a competência mais antiga de filtered
  const deletado = filtered.slice(0, -1);
  console.log(deletado);

  // Somar Receita e Folha (11 meses) e Adicionar a Projeção
  const recTotal = Utils.somar('receita', deletado) + projReceita;
  const folhaTotal = Utils.somar('folha', deletado) + projFolha;
  console.log(`Valores Acumulados (${deletado.length + 1}m) - Receita: ${formatCurrency(recTotal)} e Folha: ${formatCurrency(folhaTotal)}`);

  // Adicionar Receita e calcular quanto de folha para Fator R >= 0.28
  console.log(`Fator R: ${folhaTotal/recTotal}`);

  return Utils.round(((0.2801 * recTotal) - folhaTotal), 2);
}

const planResponse = planejar(response.filtered, 10000, 0)

console.log(`Valor pendente para Anexo III: ${formatCurrency(planResponse)}`);
