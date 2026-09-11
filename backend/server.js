const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ]
}));

const transacoes = [
    {
        id: 1,
        descricao: "Salário",
        valor: 3500,
        tipo: "Receita",
        categoria: "Salário",
        data: "2026-09-01"
    }
];

//VALIDAR TRANSÇÕES
function validarTransacao(transacao) {
    if (
        typeof transacao.descricao !== "string" ||
        transacao.descricao.trim() === ""
    ) {
        return "A descrição é obrigatória";
    }

// VALIDA VALORES
if (
    typeof transacao.valor !== "number" ||
    !Number.isFinite(transacao.valor) ||
    transacao.valor <= 0
) {
    return "O valor deve ser um número maior que zero";
}

// VALIDA TIPO
const tiposPermitidos = ["Receita", "Despesa"];

if (!tiposPermitidos.includes(transacao.tipo)) {
    return "O tipo deve ser Receita ou Despesa";
}

// VALIDA CATEGORIA
if (
    typeof transacao.categoria !== "string" ||
    transacao.categoria.trim() === ""
) {
    return "A categoria é obrigatória";
}

// VALIDA DATA
if (
    typeof transacao.data !== "string" ||
    transacao.data.trim() === "" ||
    Number.isNaN(Date.parse(transacao.data))
) {
    return "Informe uma data válida";
}


    return null;
}



app.get("/", (req, res) => {
    res.send("Bem-vindo à API do FinTrack!");
});

app.get("/transacoes", (req, res) => {
    res.json(transacoes);
});

app.get("/transacoes/:id", (req, res) => {
    const id = Number(req.params.id);

    const transacaoEncontrada = transacoes.find(
        transacao => transacao.id === id
    );
    if (!transacaoEncontrada) {
        return res.status(404).json({
            mensagem: "Transação não encontrada"
        });
}
    res.json(transacaoEncontrada);
});

app.post("/transacoes", (req, res) => {
    const novaTransacao = req.body;
    const erroValidacao = validarTransacao(novaTransacao);

if (erroValidacao) {
    return res.status(400).json({
        mensagem: erroValidacao
    });
}
    

    novaTransacao.id = transacoes.length + 1;
    transacoes.push(novaTransacao);

    console.log(novaTransacao);

    res.status(201).json(novaTransacao);
});
app.put("/transacoes/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = transacoes.findIndex(
        transacao => transacao.id === id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Transação não encontrada"
        });
    }
const erroValidacao = validarTransacao(req.body);

if (erroValidacao) {
    return res.status(400).json({
        mensagem: erroValidacao
    });
}
    const transacaoAtualizada = {
        id,
        ...req.body
    };

    transacoes[indice] = transacaoAtualizada;

    res.json(transacaoAtualizada);
});
app.delete("/transacoes/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = transacoes.findIndex(
        transacao => transacao.id === id
    );
    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Transação não encontrada"
        });
    }

    transacoes.splice(indice, 1);
    res.status(204).send();
});
app.listen(3000, () => {
    console.log("Servidor do FinTrack iniciado na porta 3000");
});