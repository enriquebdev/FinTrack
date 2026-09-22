# FinTrack Dashboard

Aplicação web para organização de finanças pessoais. O FinTrack permite registrar receitas e despesas, acompanhar o saldo, visualizar gráficos e consultar relatórios por período.

## Funcionalidades

- Cadastro, edição e exclusão de transações.
- Pesquisa por descrição e filtros por tipo e mês.
- Cálculo automático de saldo, receitas e despesas.
- Gráficos de fluxo financeiro, distribuição financeira e comparação entre receitas e despesas.
- Relatórios por período com resumo, comparação mensal e evolução diária.
- Resumo de categorias com quantidade de lançamentos e valor total movimentado.
- Navegação na sidebar para Dashboard, Transações, Categorias e Relatórios.
- Feedback visual de erro no modal e notificações de sucesso no rodapé.
- Persistência no PostgreSQL: os dados permanecem após reiniciar a API.

## Tecnologias

- HTML, CSS e JavaScript puro.
- Chart.js para gráficos e Lucide para ícones.
- Node.js, Express e CORS no backend.
- PostgreSQL e `pg` para persistência de dados.

## Estrutura do projeto

```text
FinTrack/
├── CSS/                 # Estilos da interface
├── JS/script.js         # Lógica do dashboard e consumo da API
├── backend/
│   ├── server.js        # API Express e integração com PostgreSQL
│   ├── .env.example     # Modelo das variáveis locais
│   └── package.json     # Dependências do backend
└── index.html           # Interface principal
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

## Próximos passos

- Criar autenticação e associar transações a cada usuário.
- Permitir criar e editar categorias personalizadas.
- Exportar relatórios em CSV ou PDF.
- Criar testes automatizados para a API e a interface.
- Preparar a publicação do frontend, backend e banco de dados.
