# FinTrack Dashboard

Aplicação web para organização de finanças pessoais. O FinTrack permite registrar receitas e despesas, acompanhar o saldo, visualizar gráficos e consultar relatórios por período.

## Funcionalidades

- Cadastro, edição e exclusão de transações.
- Pesquisa por descrição e filtros por tipo e mês.
- Cálculo automático de saldo, receitas e despesas.
- Gráficos de fluxo financeiro, distribuição financeira e comparação entre receitas e despesas.
- Relatório por período com cards de resumo e evolução diária.
- Resumo de categorias com quantidade de lançamentos e valor total movimentado.
- Navegação na sidebar para Dashboard, Transações, Categorias e Relatórios.
- Feedback visual de erro no modal e notificações de sucesso no rodapé.
- Persistência no PostgreSQL: os dados permanecem após reiniciar a API.

## Tecnologias

- HTML, CSS e JavaScript puro.
- [Chart.js](https://www.chartjs.org/) para gráficos.
- [Lucide](https://lucide.dev/) para ícones.
- Node.js, Express e CORS no backend.
- PostgreSQL e `pg` para o banco de dados.

## Estrutura do projeto

FinTrack/
├── CSS/                 # Estilos da interface
├── JS/script.js         # Lógica do dashboard e consumo da API
├── backend/
│   ├── server.js        # API Express e integração com PostgreSQL
│   ├── .env.example     # Modelo das variáveis locais
│   └── package.json     # Dependências do backend
└── index.html           # Interface principal
```

- Cadastro, edição, exclusão, pesquisa e filtros de transações.
- Cálculo de saldo, receitas e despesas.
- Gráficos de linha, pizza e barras.
- Relatórios por período com receitas, despesas, saldo e evolução diária.
- API REST com validação dos campos de descrição, valor, tipo, categoria e data.


## Pré-requisitos

- Node.js instalado.
- PostgreSQL instalado e em execução.
- Banco de dados `Fintrack` criado.
- Uma extensão de servidor local, como Live Server no VS Code.

## Configuração

=======

## Pré-requisitos

- Node.js instalado.
- PostgreSQL instalado e em execução.
- Banco de dados `Fintrack` criado.
- Uma extensão de servidor local, como Live Server no VS Code.

## Configuração

>>>>>>> a86027a (docs: atualizar documentação do FinTrack)
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

2. Abra `index.html` com Live Server na porta `5500`.

A interface é servida em `http://localhost:5500` e a API em `http://localhost:3000`.

## Banco de dados

Ao iniciar, a API cria a tabela `transacoes` caso ela ainda não exista. O PostgreSQL é a fonte única de dados; o LocalStorage não é utilizado para salvar transações.

## Rotas da API

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/transacoes` | Lista todas as transações. |
| `GET` | `/transacoes/:id` | Consulta uma transação pelo ID. |
| `POST` | `/transacoes` | Cria uma transação. |
| `PUT` | `/transacoes/:id` | Atualiza uma transação. |
| `DELETE` | `/transacoes/:id` | Exclui uma transação. |

Exemplo de corpo para criação ou edição:

```json
{
  "descricao": "Supermercado",
  "valor": 150.5,
  "tipo": "Despesa",
  "categoria": "Alimentação",
  "data": "2026-09-17"
}
```

## Próximos passos

- Criar autenticação e associar transações a cada usuário.
- Permitir criar e editar categorias personalizadas.
- Adicionar comparação com o mês anterior nos relatórios.
- Exportar relatórios em CSV ou PDF.
- Criar testes automatizados para a API e a interface.
- Preparar a publicação do frontend, backend e banco de dados.
