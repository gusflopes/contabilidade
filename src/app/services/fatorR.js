import {
  classificar,
  validar,
  somar,
  addMonth,
  round,
} from '../utils/DataUtils';

const formatCurrency = value => {
  // return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const fatorRfunction = data => {
  // Recebe um array de objetos contendo: competencia, receita e folha
  // Classifica por competência e filtra apenas as últimas 12

  const sorted = classificar(data);
  // ##Mudar para 12 quando terminar
  const filtered = sorted.slice(0, 12);

  // VERIFICAR SE TEM ALGUMA COMPETÊNCIA FALTANDO

  const validacao = validar(filtered);
  if (validacao) {
    return console.warn('Erro: Todos os meses devem estar cadastrados.');
  }
  console.log('Dados validados com sucesso!');

  // console.log(filtered[0].recBruta);

  const recTotal = somar('recBruta', filtered);
  const folhaTotal = somar('despFolha', filtered);

  const fatorR = folhaTotal / recTotal;
  const competencia = addMonth(filtered[0].competencia);

  return { fatorR, competencia, recTotal, folhaTotal, filtered };
};

const planejar = (filtered, projReceita, projFolha) => {
  // Excluir a competência mais antiga de filtered

  // ############################# ATENÇÃO #############################
  // #### CRIAR UM IF = SÓ PODE EXCLUIR SE POSSUIR 12 COMPETENCIAS #####
  // ############################# ATENÇÃO #############################
  console.log(filtered.length);

  const deletado = filtered.length === 12 ? filtered.slice(0, -1) : filtered;

  console.log(`Deletado: ${deletado.length} e Filtered: ${filtered.length}`);

  // Somar Receita e Folha (11 meses) e Adicionar a Projeção
  const recTotal = somar('recBruta', deletado) + projReceita;
  const folhaTotal = somar('despFolha', deletado) + projFolha;
  console.log(
    `Valores Acumulados (${deletado.length + 1}m) - Receita: ${formatCurrency(
      recTotal
    )} e Folha: ${formatCurrency(folhaTotal)}`
  );

  // Adicionar Receita e calcular quanto de folha para Fator R >= 0.28
  console.log(`Fator R: ${folhaTotal / recTotal}`);

  const fatorR = folhaTotal / recTotal;
  const folhaPendente = round(0.2801 * recTotal - folhaTotal, 2);
  const mediaFaturamento = recTotal / deletado.length;
  const mediaFolhaRecomendada = mediaFaturamento * 0.285;
  const mensagem =
    folhaPendente > 0
      ? `Valor pendente para Anexo III: ${formatCurrency(folhaPendente)}`
      : `Extrapolou em ${formatCurrency(
          folhaPendente * -1
        )} o necessário para o Anexo III`;

  return {
    competencia: addMonth(deletado[0].competencia),
    fatorR,
    folhaPendente,
    projReceita,
    projFolha,
    mensagem,
    mediaFaturamento,
    mediaFolhaRecomendada,
    data: deletado,
  };
};

// const planResponse = planejar(response.filtered, 10000, 0);

// console.log(`Valor pendente para Anexo III: ${formatCurrency(planResponse)}`);

module.exports = { formatCurrency, fatorRfunction, planejar };
