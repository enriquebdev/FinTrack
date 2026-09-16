# FinTrack Dashboard

Aplicação web para controle financeiro pessoal, com painel de saldo, receitas, despesas, transações e gráficos.

## Tecnologias

- HTML, CSS e JavaScript puro
- Chart.js e Lucide carregados por CDN
- Node.js, Express, PostgreSQL e CORS no backend

## Funcionalidades atuais

- Cadastro, edição, exclusão, pesquisa e filtros de transações.
- Cálculo de saldo, receitas e despesas.
- Gráficos de linha, pizza e barras.
- API REST com validação dos campos de descrição, valor, tipo, categoria e data.

### Rotas da API

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/transacoes` | Lista as transações. |
| `GET` | `/transacoes/:id` | Busca uma transação pelo identificador. |
| `POST` | `/transacoes` | Cria uma transação. |
| `PUT` | `/transacoes/:id` | Atualiza uma transação. |
| `DELETE` | `/transacoes/:id` | Exclui uma transação. |

## Como executar

Em um terminal, instale as dependências do backend e inicie a API:

```bash
cd backend
npm install
node server.js
```

A API fica disponível em `http://localhost:3000`. Abra o `index.html` por um servidor local na porta `5500` (por exemplo, Live Server), pois essa é a origem permitida pela configuração de CORS.

## Persistência de dados

O PostgreSQL é a fonte única de dados. Ao iniciar, a API cria a tabela `transacoes` caso ela ainda não exista. O front-end não utiliza LocalStorage para transações.

Crie `backend/.env` a partir de `backend/.env.example` e informe as credenciais locais do PostgreSQL. Esse arquivo contém dados sensíveis e não deve ser enviado ao Git.

## Próximos passos

- Adicionar autenticação e associar transações a usuários.
