const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ]
}));

app.get("/", (req, res) => {
    res.send("Bem-vindo à API do FinTrack!");
});

app.get("/transacoes", (req, res) => {
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

    res.json(transacoes);
});

app.listen(3000, () => {
    console.log("Servidor do FinTrack iniciado na porta 3000");
});