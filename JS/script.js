const transacoes = [
    {
        tipo: "Receita",
        valor: 3500
    },
    {
        tipo: "Despesa",
        valor: 250
    },
    {
        tipo: "Despesa",
        valor: 100
    }
];
let saldo = 0;

transacoes.forEach(transacao => {

    if (transacao.tipo === "Receita") {
        saldo += transacao.valor;
    } else {
        saldo -= transacao.valor;
    }

});

const saldoTela = document.querySelector("#saldo");

saldoTela.textContent = `R$ ${saldo}`;