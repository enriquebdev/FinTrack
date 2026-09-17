require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const portaApi = 3000;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
});

app.use(express.json());
app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"]
}));

function validarTransacao(transacao) {
    if (!transacao || typeof transacao !== "object" || Array.isArray(transacao)) {
        return "Envie os dados da transação";
    }

    if (typeof transacao.descricao !== "string" || transacao.descricao.trim() === "") {
        return "A descrição é obrigatória";
    }

    if (typeof transacao.valor !== "number" || !Number.isFinite(transacao.valor) || transacao.valor <= 0) {
        return "O valor deve ser um número maior que zero";
    }

    if (!["Receita", "Despesa"].includes(transacao.tipo)) {
        return "O tipo deve ser Receita ou Despesa";
    }

    if (typeof transacao.categoria !== "string" || transacao.categoria.trim() === "") {
        return "A categoria é obrigatória";
    }

    if (typeof transacao.data !== "string" || transacao.data.trim() === "" || Number.isNaN(Date.parse(transacao.data))) {
        return "Informe uma data válida";
    }

    return null;
}

function obterIdValido(valor) {
    const id = Number(valor);
    return Number.isInteger(id) && id > 0 ? id : null;
}

const camposRetorno = `
    id,
    descricao,
    valor::float8 AS valor,
    tipo,
    categoria,
    TO_CHAR(data, 'YYYY-MM-DD') AS data
`;

async function inicializarBanco() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS transacoes (
            id SERIAL PRIMARY KEY,
            descricao VARCHAR(255) NOT NULL,
            valor NUMERIC(12, 2) NOT NULL CHECK (valor > 0),
            tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('Receita', 'Despesa')),
            categoria VARCHAR(100) NOT NULL,
            data DATE NOT NULL,
            criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
    `);

    await pool.query("ALTER TABLE transacoes DROP CONSTRAINT IF EXISTS transacoes_tipo_check");
    await pool.query(`
        UPDATE transacoes
        SET tipo = CASE
            WHEN LOWER(tipo) = 'receita' THEN 'Receita'
            WHEN LOWER(tipo) = 'despesa' THEN 'Despesa'
            ELSE tipo
        END
    `);
    await pool.query(`
        ALTER TABLE transacoes
        ADD CONSTRAINT transacoes_tipo_check
        CHECK (tipo IN ('Receita', 'Despesa'))
    `);
}

app.get("/", (req, res) => {
    res.send("Bem-vindo à API do FinTrack!");
});

app.get("/transacoes", async (req, res, next) => {
    try {
        const resultado = await pool.query(`SELECT ${camposRetorno} FROM transacoes ORDER BY data DESC, id DESC`);
        res.json(resultado.rows);
    } catch (erro) {
        next(erro);
    }
});

app.get("/transacoes/:id", async (req, res, next) => {
    const id = obterIdValido(req.params.id);
    if (!id) return res.status(400).json({ mensagem: "Identificador inválido" });

    try {
        const resultado = await pool.query(`SELECT ${camposRetorno} FROM transacoes WHERE id = $1`, [id]);
        if (resultado.rowCount === 0) return res.status(404).json({ mensagem: "Transação não encontrada" });
        res.json(resultado.rows[0]);
    } catch (erro) {
        next(erro);
    }
});

app.post("/transacoes", async (req, res, next) => {
    const erroValidacao = validarTransacao(req.body);
    if (erroValidacao) return res.status(400).json({ mensagem: erroValidacao });

    const { descricao, valor, tipo, categoria, data } = req.body;
    try {
        const resultado = await pool.query(
            `INSERT INTO transacoes (descricao, valor, tipo, categoria, data)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING ${camposRetorno}`,
            [descricao.trim(), valor, tipo, categoria.trim(), data]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        next(erro);
    }
});

app.put("/transacoes/:id", async (req, res, next) => {
    const id = obterIdValido(req.params.id);
    if (!id) return res.status(400).json({ mensagem: "Identificador inválido" });

    const erroValidacao = validarTransacao(req.body);
    if (erroValidacao) return res.status(400).json({ mensagem: erroValidacao });

    const { descricao, valor, tipo, categoria, data } = req.body;
    try {
        const resultado = await pool.query(
            `UPDATE transacoes
             SET descricao = $1, valor = $2, tipo = $3, categoria = $4, data = $5
             WHERE id = $6
             RETURNING ${camposRetorno}`,
            [descricao.trim(), valor, tipo, categoria.trim(), data, id]
        );
        if (resultado.rowCount === 0) return res.status(404).json({ mensagem: "Transação não encontrada" });
        res.json(resultado.rows[0]);
    } catch (erro) {
        next(erro);
    }
});

app.delete("/transacoes/:id", async (req, res, next) => {
    const id = obterIdValido(req.params.id);
    if (!id) return res.status(400).json({ mensagem: "Identificador inválido" });

    try {
        const resultado = await pool.query("DELETE FROM transacoes WHERE id = $1", [id]);
        if (resultado.rowCount === 0) return res.status(404).json({ mensagem: "Transação não encontrada" });
        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
});

app.use((erro, req, res, next) => {
    console.error("Erro na API:", erro);
    res.status(500).json({ mensagem: "Não foi possível processar a operação no banco de dados" });
});

inicializarBanco()
    .then(() => {
        app.listen(portaApi, () => console.log(`Servidor do FinTrack iniciado na porta ${portaApi}`));
    })
    .catch((erro) => {
        console.error("Não foi possível conectar ao PostgreSQL:", erro.message);
        process.exit(1);
    });
