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
    if (
    typeof novaTransacao.descricao !== "string" ||
    novaTransacao.descricao.trim() === ""
) {
    return res.status(400).json({
        mensagem: "A descrição é obrigatória"
    });
}
if(
    typeof novaTransacao.valor !== "number" ||
    !Number.isFinite(novaTransacao.valor) ||
    novaTransacao.valor <= 0
) {
    return res.status(400).json({
        mensagem: "O valor deve ser um número maior que zero"
    });
}
if(
    typeof novaTransacao.tipo !== "string" ||
    novaTransacao.tipo.trim() === ""
) {
    return res.status(400).json({
        mensagem: "Selecione um tipo válido"
    });
}
if(
    typeof novaTransacao.categoria !== "string" ||
    novaTransacao.categoria.trim() === ""
) {
    return res.status(400).json({
        mensagem: "A categoria é obrigatória"
    });
}
if (
    typeof novaTransacao.data !== "string" ||
    novaTransacao.data.trim() === "" ||
    Number.isNaN(Date.parse(novaTransacao.data))
) {
    return res.status(400).json({
        mensagem: "Informe uma data válida"
    });
}if (data === "") {
   return res.status(400).json({
        mensagem: "Selecione uma data."
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