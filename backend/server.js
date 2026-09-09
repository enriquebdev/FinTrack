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

app.post("/transacoes", (req, res) => {
    const novaTransacao = req.body;
    novaTransacao.id = transacoes.length + 1;
    transacoes.push(novaTransacao);

res.status(201).json(novaTransacao);
    console.log(novaTransacao);
});

app.listen(3000, () => {
    console.log("Servidor do FinTrack iniciado na porta 3000");
});