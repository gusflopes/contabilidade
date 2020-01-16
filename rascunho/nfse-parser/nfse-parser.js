var convert = require('xml-js');
var fs = require('fs');

var xmlfile = fs.readFileSync('nfse-example.xml', 'utf8');
var options = { compact: true, ignoreComment: true, spaces: 4 };

var { declaration, NOTAS_FISCAIS } = convert.xml2js(xmlfile, options);

console.log(NOTAS_FISCAIS.NOTA_FISCAL[0].NUM_NOTA._text);
console.log('-----');
// AQUI É O TESTE!!!
console.log(NOTAS_FISCAIS.NOTA_FISCAL[0].VALOR_NOTA);

function nfseXmlParser(nfse) {
  // console.log(nfse.NUM_NOTA._text);
  // console.log(nfse.DATA_HORA_EMISSAO._text)

  const response = {
    nfse: {
    num_nota: parseInt(nfse.NUM_NOTA._text, 10),
    data_hora_emissao: nfse.DATA_HORA_EMISSAO._text,
    dia_emissao: nfse.DIA_EMISSAO._text,
    mes_competencia: nfse.MES_COMPETENCIA._text,
    situacao_nf: nfse.SITUACAO_NF._text,
    data_hora_cancelamento: nfse.DATA_HORA_CANCELAMENTO._text,
  },
  prestador: {
    cpf_cnpj: nfse.PRESTADOR_CPF_CNPJ ? nfse.PRESTADOR_CPF_CNPJ._text : null,
    insc_municipal: nfse.PRESTADOR_INSCRICAO_MUNICIPAL ? nfse.PRESTADOR_INSCRICAO_MUNICIPAL._text : null,
    razao_social: nfse.PRESTADOR_RAZAO_SOCIAL ? nfse.PRESTADOR_RAZAO_SOCIAL._text : null,
    nome_fantasia: nfse.PRESTADOR_NOME_FANTASIA ? nfse.PRESTADOR_NOME_FANTASIA._text : null,
    logradouro: nfse.PRESTADOR_LOGRADOURO._text,
    numero: nfse.PRESTADOR_PREST_NUMERO._text,
    complemento: nfse.PRESTADOR_COMPLEMENTO ? nfse.PRESTADOR_COMPLEMENTO._text : null,
    bairro: nfse.PRESTADOR_BAIRRO._text,
    cidade: nfse.PRESTADOR_CIDADE._text,
    uf: nfse.PRESTADOR_UF._text,
    cep: nfse.PRESTADOR_CEP._text,
    ddd: nfse.PRESTADOR_DDD_TELEFONE ? nfse.PRESTADOR_DDD_TELEFONE._text : null,
    telefone: nfse.PRESTADOR_TELEFONE ? nfse.PRESTADOR_TELEFONE._text : null,
  },
  tomador: {
    cpf_cnpj: nfse.TOMADOR_CPF_CNPJ._text,
    razao_social: nfse.TOMADOR_RAZAO_SOCIAL._text,
    logradouro: nfse.TOMADOR_LOGRADOURO._text,
    numero: nfse.TOMADOR_NUMERO._text,
    complemento: nfse.TOMADOR_COMPLEMENTO ? nfse.TOMADOR_COMPLEMENTO._text : null,
    bairro : nfse.TOMADOR_BAIRRO._text,
    cidade: nfse.TOMADOR_CIDADE._text,
    uf: nfse.TOMADOR_UF._text,
    cep: nfse.TOMADOR_CEP._text,
    email: nfse.TOMADOR_EMAIL._text,
    telefone: nfse.TOMADOR_TELEFONE ? nfse.TOMADOR_TELEFONE._text : null,
    ddd: nfse.TOMADOR_DDD_TELEFONE ? nfse.TOMADOR_DDD_TELEFONE._text : null,

    optante_simples: nfse.TOMADOR_OPTANTE_SIMPLES._text,

  },
  valor: {
    nota: parseFloat(nfse.VALOR_NOTA._text.replace(",", ".")),
    servico: parseFloat(nfse.VALOR_SERVICO._text.replace(',', '.')),
    deducao: parseFloat(nfse.VALOR_DEDUCAO._text.replace(',', '.')),
    iss: parseFloat(nfse.VALOR_ISS._text.replace(',', '.')),
    irrf: parseFloat(nfse.VALOR_IR._text.replace(',', '.')),
    pis: parseFloat(nfse.VALOR_PIS._text.replace(',', '.')),
    cofins: parseFloat(nfse.VALOR_COFINS._text.replace(',', '.')),
    csll: parseFloat(nfse.VALOR_CSLL._text.replace(',', '.')),
    inss: parseFloat(nfse.VALOR_INSS._text.replace(',', '.')),
  },
  tributacao: {

  codigo_atividade: nfse.CODIGO_ATIVIDADE._text,
  descricao_atividade: nfse.DESCRICAO_ATIVIDADE._text,
  local_incidencia_atividade: nfse.LOCAL_INCIDENCIA_ATIVIDADE._text,

  },
  resumo: {

    documento_prestacao: nfse.DOCUMENTO_PRESTACAO._text,
    serie_prestacao: nfse.SERIE_PRESTACAO._text,
    tributacao_prestacao: nfse.TRIBUTACAO_PRESTACAO._text,
    descricao_nota: nfse.DESCRICAO_NOTA ? nfse.DESCRICAO_NOTA._text : null,
    codigo_verificacao: nfse.CODIGO_VERIFICACAO._text,
    id_nota_fiscal: nfse.ID_NOTA_FISCAL._text,

  }
  };

  console.log(nfseXmlParser);
  return response;

}

// console.log(nfseXmlParser(NOTAS_FISCAIS.NOTA_FISCAL[0]));

// NOTAS_FISCAIS.map(nf => sanitizar(nf));

console.log(`Notas Fiscais no arquivo: ${NOTAS_FISCAIS.NOTA_FISCAL.length}`);
const nfseArray = [];

for (let i = 0; i < NOTAS_FISCAIS.NOTA_FISCAL.length; i++) {
  console.log(`--------------- Nota Fiscal nº ${i+1} ---------------`)
  console.log(nfseXmlParser(NOTAS_FISCAIS.NOTA_FISCAL[i]));
  nfseArray.push(nfseXmlParser(NOTAS_FISCAIS.NOTA_FISCAL[i]));
}

const nfse_prestadas = [];
const nfse_tomadas = [];

nfseArray.map(nfse => {
  if (nfse.prestador.cpf_cnpj === '26649391000163') {
    nfse_prestadas.push(nfse);
  }

  if (nfse.tomador.cpf_cnpj === '26649391000163') {
    nfse_tomadas.push(nfse);
  }
});
console.log('----------------- FIM ------------------');
console.log(`${nfse_prestadas.length} Notas Fiscais de Serviços Prestados e ${nfse_tomadas.length} Notas Fiscais de Serviços Tomados.`);
