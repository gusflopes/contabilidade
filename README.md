# Utilitários de Contabilidade

O objetivo deste repositório é concentrar diversos utilitários relacionados à Contabilidade e Tributação que podem ser utilizados em projetos ou outras funcionalidades.

## Autor

Este projeto é mantido por LSCONT, e coordenado pelo sócio-fundador Gutavo Ferreira Lopes, Advogado e Contador, com especialização em Direito Tributário e MBA em Gestão Financeira, além de formação como Software Developer adquirida em bootcamps e cursos diversos.

## Linguagem

Mudar a linguagem para Typescript.

## Roadmap

Nesta primeira fase o objetivo é consolidar algumas ferramentas utilizadas no dia a dia, ou procedimentos, e implementar as regras de negócio utilizando Javascript e/ou Node.js

### Primeiros Projetos

Os primeiros projetos

- Simulador Tributação PF x PJ (Simples Nacional - Anexo IV)
- Análise do Fator R ()
- Outros?

## Considerações

### Estrutura

Todo o sistema deverá ser estruturado da seguinte forma:
Dados > KPI > Insight
Os dados serão alimentados no sistema (Receita, Despesa com Folha, etc.), os quais gerarão os KPI (ex. Fator R, Media de Faturamento, etc.), que por sua vez serão utilizados na geração dos insights (ex. "É necessário aumentar o gasto com pessoal em R\$ xxx para tributação pelo Anexo III do Simples Nacional.")

### Fator R

Para evitar inconsistência nos dados, não é permitido cadastrar uma competência fora de ordem, sendo permitido o cadastramento apenas da competência seguinte àquela anteriormente cadastrada.
Caso seja necessária cadastrar uma competência anterior à primeira cadastrada, será necessário deletar a empresa e refazer o cadastro do zero. Isso se faz necessário para que não sejam geradas inconsistência dos meses anteriores, uma vez que o cálculo do Fator R se baseia nos últimos 12 meses de faturamento de despesa de folha.
No cadastro inicial, caso se trate de empresa já em atividade, deve-se cadastrar os 12 meses anteriores à competência que será utilizado o sistema.

#### Desenvolver

- Criar uma rota específica para o cadastro inicial, a qual deve conter uma **flag** sinalizando se a empresa iniciou atividade no mês cadastrado (hipótese em que é permitido o cadastro de uma única competência), ou caso contrário deve ser cadastrado todas as 12 últimas competências;
- Ao invés de calcular o fator R e fazer o planejamento tributário em cada requisição, criar um **hook** para adicionar/alterar registro na coluna **fatorR**, devendo o fator R ser calculado quando do cadastro da competência, e não sob demanda.
- O cálculo sob demanda será utilizado tão somente na hipótese de planejamento para o próxima competência;
- Permitir buscar fator R de uma competência específica. Será que deve ser implementado?
- Analisar a viabilidade de uma tabela independente para o **Fator R**, no qual podem ser cadastrados outros indicadores.
  - Deve ser possível alterar os indicadores e produzir efeitos retroativos?
  - Deve ser possível aplicar indicadores novos a dados antigos?
  - Qual a vantagem de calcular os indicadores/insights toda vez?
