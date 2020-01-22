# Lançamentos Contábeis

## Informações

Gerar um arquivo de importação de lançamentos contábeis para o
Domínio sistemas a partir de uma planilha de Excel !

## Estrutura do Excel

Data | Categoria |

## Parametrização

### Plano de Contas

Categoria X Conta Contábil
Conta Bancária/Caixa X Conta Contábil

### Tipo de Lançamento

- Baixa de provisão: apenas um lançamento (Contas a Receber ou Contas a Pagar);
- Lançamento não provisionado: apenas um lançamento (lançado diretamente em uma Conta de Receita ou Conta de Despesa/Custo)
- Provisão e baixa: dois lançamentos (ex: D_Contas a Receber e C_Receita de Vendas; e em seguida: D_Caixa/Banco e C_Contas a Receber)

### Copiado do Excel

Data Debito Credito Valor Historico
01/01/19 1 3 R$ 500,00	Pagamento de fornecedor conf. comprovante.
02/01/19	2	1	R$ 350,00 Pagamento de fornecedor conf. comprovante.
03/01/19 1 2 R$ 450,00	Pagamento de cliente
04/01/19	1	2	R$ 153,00 Depósito em Cheque
05/01/19 3 1 R$ 215,00	Saque para o Caixa
06/01/19	1	3	R$ 34,00 Recebimento de Venda
07/01/19 2 1 R$ 542,00	Pagamento de fornecedor conf. comprovante.
08/01/19	1	2	R$ 456,00 Pagamento de fornecedor conf. comprovante.
09/01/19 1 2 R$ 954,00	Pagamento de cliente
10/01/19	3	1	R$ 500,00 Depósito em Cheque
11/01/19 1 3 R$ 350,00	Saque para o Caixa
12/01/19	2	1	R$ 450,00 Recebimento de Venda
13/01/19 1 2 R$ 153,00	Pagamento de fornecedor conf. comprovante.
14/01/19	1	2	R$ 215,00 Pagamento de fornecedor conf. comprovante.
15/01/19 3 1 R$ 34,00	Pagamento de cliente
16/01/19	1	3	R$ 542,00 Depósito em Cheque
17/01/19 2 1 R$ 456,00	Saque para o Caixa
18/01/19	1	2	R$ 954,00 Recebimento de Venda
19/01/19 1 2 R$ 153,00	Pagamento de fornecedor conf. comprovante.
20/01/19	3	1	R$ 154,00 Pagamento de fornecedor conf. comprovante.
