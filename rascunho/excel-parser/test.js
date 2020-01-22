// Planilha copiada com Ctrl + C e Ctrl + V
const source = `Data	Debito	Credito	Valor	Historico
01/01/19	1	3	R$ 500,00	Pagamento de fornecedor conf. comprovante.
02/01/19	2	1	R$ 350,00	Pagamento de fornecedor conf. comprovante.
03/01/19	1	2	R$ 450,00	Pagamento de cliente
04/01/19	1	2	R$ 153,00	Depósito em Cheque
05/01/19	3	1	R$ 215,00	Saque para o Caixa
06/01/19	1	3	R$ 34,00	Recebimento de Venda
07/01/19	2	1	R$ 542,00	Pagamento de fornecedor conf. comprovante.
08/01/19	1	2	R$ 456,00	Pagamento de fornecedor conf. comprovante.
09/01/19	1	2	R$ 954,00	Pagamento de cliente
10/01/19	3	1	R$ 500,00	Depósito em Cheque
11/01/19	1	3	R$ 350,00	Saque para o Caixa
12/01/19	2	1	R$ 450,00	Recebimento de Venda
13/01/19	1	2	R$ 153,00	Pagamento de fornecedor conf. comprovante.
14/01/19	1	2	R$ 215,00	Pagamento de fornecedor conf. comprovante.
15/01/19	3	1	R$ 34,00	Pagamento de cliente
16/01/19	1	3	R$ 542,00	Depósito em Cheque
17/01/19	2	1	R$ 456,00	Saque para o Caixa
18/01/19	1	2	R$ 954,00	Recebimento de Venda
19/01/19	1	2	R$ 153,00	Pagamento de fornecedor conf. comprovante.
20/01/19	3	1	R$ 154,00	Pagamento de fornecedor conf. comprovante.`;

const data = source.split(/\t|\n/);
console.log(data.length / 5);

console.log(data[0]);

const file = {
  date: data[5],
  debit: data[6],
  credit: data[7],
  value: data[8],
  description: data[9],
};

console.log(file);

/*
const file = {
  data[0].value: data[6],
  data[1]: data[7],
  data[2]: data[8],
  data[3]: data[9],
  data[4]: data[10],
  data[5]: data[11],
}
*/
