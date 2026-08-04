const saldoTela = document.querySelector("#saldo");
const receitasTela = document.querySelector("#receitas");
const despesasTela = document.querySelector("#despesas");

const lista = document.querySelector("#lista-transacoes");

const modal = document.querySelector("#modal");
const abrirModal = document.querySelector("#adicionar");
const fecharModal = document.querySelector("#fechar-modal");
const botaoSalvar = document.querySelector("#salvar");


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

function atualizarCards() {

    let saldo = 0;
    let receitas = 0;
    let despesas = 0;

    transacoes.forEach(transacao => {

        if (transacao.tipo === "Receita") {

            saldo += transacao.valor;
            receitas += transacao.valor;

        } else {

            saldo -= transacao.valor;
            despesas += transacao.valor;

        }

    });

    saldoTela.textContent = `R$ ${saldo.toFixed(2)}`;
    receitasTela.textContent = `R$ ${receitas.toFixed(2)}`;
    despesasTela.textContent = `R$ ${despesas.toFixed(2)}`;

}

function mostrarTransacoes() {

    lista.innerHTML = "";

    transacoes.forEach((transacao, index) => {

        const html = `
        <div class="transacao">

            <div>

                <h4>${transacao.descricao}</h4>

                <p>${transacao.tipo}</p>

            </div>

            <div style="display:flex;align-items:center;gap:15px;">

                <span class="valor ${transacao.tipo === "Receita" ? "receita" : "despesa"}">

                    ${transacao.tipo === "Receita" ? "+" : "-"} R$ ${transacao.valor.toFixed(2)}

                </span>

                <button class="btn-delete" onclick="removerTransacao(${index})">

                    <i data-lucide="trash-2"></i>

                </button>

            </div>

        </div>
        `;

        lista.innerHTML += html;

    });

    lucide.createIcons();

}

function removerTransacao(index) {

    transacoes.splice(index, 1);

    atualizarCards();

    mostrarTransacoes();

}

abrirModal.addEventListener("click", function () {

    modal.classList.add("active");

});

fecharModal.addEventListener("click", function () {

    modal.classList.remove("active");

});

botaoSalvar.addEventListener("click", function () {

    const descricao = document.querySelector("#descricao").value;

    const valor = Number(document.querySelector("#valor").value);

    const tipo = document.querySelector("#tipo").value;

    if (descricao.trim() === "") {

        alert("Digite uma descrição.");

        return;

    }

    if (valor <= 0) {

        alert("Digite um valor maior que zero.");

        return;

    }

    const novaTransacao = {

        descricao: descricao,

        tipo: tipo,

        valor: valor

    };

    transacoes.push(novaTransacao);

    atualizarCards();

    mostrarTransacoes();


    modal.classList.remove("active");


    document.querySelector("#descricao").value = "";

    document.querySelector("#valor").value = "";

    document.querySelector("#tipo").value = "Receita";

});

abrirModal.addEventListener("click", function () {

    console.log("clicou");

    modal.classList.add("active");

});

atualizarCards();

mostrarTransacoes();

lucide.createIcons();