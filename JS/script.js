const saldoTela = document.querySelector("#saldo");
const receitasTela = document.querySelector("#receitas");
const despesasTela = document.querySelector("#despesas");
const transacoes = [
    {
        descricao: "Salário",
        tipo: "Receita",
        valor: 3500
    },
    {
        descricao: "Mercado",
        tipo: "Despesa",
        valor: 450
    },
    {
        descricao: "Internet",
        tipo: "Despesa",
        valor: 100
    },
    {
        descricao: "Freelance",
        tipo: "Receita",
        valor: 800
    }
];

let saldo = 0;
let receitas = 0;
let despesas = 0;

transacoes.forEach(transacao => {

    if (transacao.tipo === "Receita") {
        receitas += transacao.valor;
        saldo += transacao.valor;
    } else {
        despesas += transacao.valor;
        saldo -= transacao.valor;
    }

});

saldoTela.textContent = "R$ " + saldo;

receitasTela.textContent = "R$ " + receitas;

despesasTela.textContent = "R$ " + despesas;


const lista = document.querySelector("#lista-transacoes");

transacoes.forEach(transacao => {

    const html = `
        <div class="transacao">

            <h4>${transacao.descricao}</h4>

            <p>${transacao.tipo}</p>

            <span>R$ ${transacao.valor}</span>

        </div>
    `;

    lista.innerHTML += html;

});
const botao = document.querySelector("#adicionar");

botao.addEventListener("click", function(){

    const descricao = document.querySelector("#descricao").value;

    const valor = document.querySelector("#valor").value;

    const tipo = document.querySelector("#tipo").value;



});
