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

const lines = source.split(/\n/);
const titulos = lines[0];

const header = lines.splice(0, 1)[0].split(/\t/);

const columns = [];

for (i = 0; i < header.length; i++) {
  columns.push("col" + (i + 1));
}
console.log(columns);

let result = [];
lines.map(line => {
  const input = line.split(/\t/);

  input.map((value, index) => {
    result[columns[index]] = value;
  });
});

console.log("result", result);
