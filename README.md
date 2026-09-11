 FinTrack Dashboard

O FinTrack Dashboard é uma aplicação web desenvolvida para auxiliar no controle de finanças pessoais por meio de uma interface moderna, intuitiva e responsiva.

O projeto foi criado com o objetivo de praticar conceitos fundamentais de desenvolvimento Front-end, aplicando HTML, CSS e JavaScript em um sistema completo de gerenciamento financeiro.

Funcionalidades
Dashboard com resumo financeiro
Cadastro de receitas e despesas
Cálculo automático do saldo
Histórico de transações
Exclusão e edição de registros
Gráficos para visualização dos dados
Armazenamento local utilizando LocalStorage
Interface responsiva para desktop, tablet e smartphone
Tema claro e escuro (Dark Mode)

Tecnologias utilizadas:
HTML5
CSS3
JavaScript (ES6+)
Chart.js
LocalStorage
Git e GitHub

### Implementado

-  Dashboard com cálculo automático de saldo, receitas e despesas.
-  Cadastro e listagem de transações com descrição, valor, tipo, categoria e data.
-  Validação de descrição e valor no formulário de cadastro.
-  Pesquisa por descrição e filtros por tipo e mês.
-  Gráficos com Chart.js: fluxo financeiro por data, distribuição por categoria e comparação entre receitas e despesas.
-  Leitura e gravação de transações no LocalStorage.
-  Backend com Node.js, Express e configuração de CORS para desenvolvimento local.
-  Rotas da API própria para listar, consultar por ID e cadastrar transações, com armazenamento em memória.
-  Integração do front-end com a API própria para listagem e cadastro usando Fetch API e async/await.
-  Edição e exclusão no front-end com requisições simuladas pelo JSONPlaceholder e atualização do LocalStorage.
-  Verificação de respostas HTTP e mensagem de erro ao carregar transações.

### Próximos passos

-  Concluir e corrigir a rota de atualização de transações na API própria.
-  Implementar a rota de exclusão de transações.
-  Integrar edição e exclusão do front-end à API própria, substituindo o JSONPlaceholder.
-  Implementar persistência com PostgreSQL para manter os dados após reiniciar o servidor.
-  Definir a sincronização entre LocalStorage e API para evitar divergências nos dados.
-  Validar os dados no backend e melhorar o tratamento de erros de cadastro, edição e exclusão na interface.
-  Adicionar autenticação e vincular as transações a cada usuário.
