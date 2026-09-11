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

    const transacaoAtualizada = {
        id,
        ...reqToken
.body
    };

    transacoes[indice] = transacaoAtualizada;

    res.json(transacaoAtualizada);
});
app.listen(3000, () => {
    console.log("Servidor do FinTrack iniciado na porta 3000");
});