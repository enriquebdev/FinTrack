# FinTrack Dashboard

O FinTrack foi criado para substituir o uso de planilhas do Google no controle financeiro pessoal e familiar.

Embora planilhas sejam úteis, elas exigem preenchimento manual, podem ficar desorganizadas com o tempo e dificultam a visualização rápida de informações importantes, como saldo disponível, total de receitas, despesas por categoria e comparação entre meses.

O FinTrack centraliza esse controle em uma interface mais simples e visual. A aplicação permite cadastrar, editar e excluir transações, pesquisar lançamentos, filtrar por mês ou tipo, acompanhar gráficos financeiros e gerar relatórios em PDF.

Os dados são armazenados em um banco PostgreSQL por meio de uma API construída com Node.js e Express, trazendo mais organização e persistência para o controle financeiro.

Com isso, o usuário pode acompanhar sua vida financeira sem depender de fórmulas, abas ou configurações manuais de planilhas.

## Funcionalidades

- Cadastro, edição e exclusão de transações.
- Pesquisa por descrição e filtros por tipo e mês.
- Cálculo automático de saldo, receitas e despesas.
- Gráficos de fluxo financeiro, distribuição financeira e comparação entre receitas e despesas.
- Relatórios por período com resumo, comparação mensal e evolução diária.
- Exportação de relatórios em PDF conforme o período selecionado.
- Resumo de categorias com quantidade de lançamentos e valor total movimentado.
- Meta mensal de economia configurável, com acompanhamento do valor economizado no mês.
- Navegação na sidebar para Dashboard, Transações, Categorias, Relatórios e Configurações.
- Feedback visual de erro no modal e notificações de sucesso no rodapé.
- Persistência no PostgreSQL: os dados permanecem após reiniciar a API.

## Tecnologias

- HTML, CSS e JavaScript puro.
- Chart.js para gráficos, Lucide para ícones e jsPDF para documentos PDF.
- Node.js, Express e CORS no backend.
- PostgreSQL e `pg` para persistência de dados.

## Estrutura do projeto

```text
FinTrack/
├── CSS/                 # Estilos da interface, incluindo a página de Configurações
├── JS/
│   ├── script.js         # Lógica do dashboard e consumo da API
│   └── configuracoes.js  # Lógica da página de Configurações
├── backend/
│   ├── server.js        # API Express e integração com PostgreSQL
│   ├── .env.example     # Modelo das variáveis locais
│   └── package.json     # Dependências do backend
├── index.html           # Dashboard principal
└── configuracoes.html   # Página para definir a meta mensal
```

## Pré-requisitos

- Node.js instalado.
- PostgreSQL instalado e em execução.
- Banco de dados `Fintrack` criado.
- Um servidor local para o front-end, como Live Server no VS Code.

## Configuração

Na pasta `backend`, crie um arquivo `.env` baseado em `.env.example`:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=Fintrack
DB_PASSWORD=sua_senha
DB_PORT=5432
```

O `.env` contém credenciais e não deve ser versionado.

Instale as dependências do backend:

```bash
cd backend
npm install
```

## Como executar

1. Inicie a API:

   ```bash
   cd backend
   node server.js
   ```

2. Abra `index.html` em um servidor local na porta `5500`.

A interface é acessada em `http://localhost:5500` e a API em `http://localhost:3000`.

## Rotas da API

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/transacoes` | Lista todas as transações. |
| `GET` | `/transacoes/:id` | Consulta uma transação pelo ID. |
| `POST` | `/transacoes` | Cria uma transação. |
| `PUT` | `/transacoes/:id` | Atualiza uma transação. |
| `DELETE` | `/transacoes/:id` | Exclui uma transação. |
| `GET` | `/configuracoes` | Consulta a meta mensal configurada. |
| `PUT` | `/configuracoes` | Atualiza a meta mensal de economia. |

## Próximos passos

- Criar autenticação e associar transações a cada usuário.
- Permitir criar e editar categorias personalizadas.
- Criar testes automatizados para a API e a interface.
- Preparar a publicação do frontend, backend e banco de dados.
