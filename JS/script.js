const saldoTela = document.querySelector("#saldo");
const receitasTela = document.querySelector("#receitas");
const despesasTela = document.querySelector("#despesas");
const categoria = document.querySelector("#categoria").value;
const data = document.querySelector("#data").value;

const lista = document.querySelector("#lista-transacoes");

const modal = document.querySelector("#modal");
const abrirModal = document.querySelector("#adicionar");
const fecharModal = document.querySelector("#fechar-modal");
const botaoSalvar = document.querySelector("#salvar");

const pesquisa = document.querySelector("#pesquisa");

let indiceEdicao = null;

let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

const graficoLinha = document.querySelector("#graficoLinha");

const graficoPizza = document.querySelector("#graficoPizza");

const graficoBarra = document.querySelector("#graficoBarra");


function salvarTransacoes() {

    localStorage.setItem(
        "transacoes",
        JSON.stringify(transacoes)
    );

}

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

function mostrarTransacoes(listaTransacoes = transacoes) {

    lista.innerHTML = "";

    listaTransacoes.forEach(transacao => {

        const indexOriginal = transacoes.indexOf(transacao);

        const html = `
            <div class="transacao">

                <div>

                    <h4>${transacao.descricao}</h4>

                    <p>${transacao.tipo}</p>

                </div>

                <div style="display:flex;align-items:center;gap:15px;">

                    <span class="valor ${transacao.tipo === "Receita" ? "receita" : "despesa"}">

                        ${transacao.tipo === "Receita" ? "+" : "-"} 
                        R$ ${transacao.valor.toFixed(2)}

                    </span>

                    <button type="button" class="btn-edit" onclick="editarTransacao(${indexOriginal})">
                        <i data-lucide="pencil"></i>
                    </button>

                    <button type="button" class="btn-delete" onclick="removerTransacao(${indexOriginal})">
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

    const posicaoScroll = window.scrollY;

    transacoes.splice(index, 1);

    salvarTransacoes();

    atualizarCards();
    mostrarTransacoes();
    atualizarGraficos();

    window.scrollTo(0, posicaoScroll);
}

function editarTransacao(index) {

   const posicaoScroll = window.scrollY;

    const transacao = transacoes[index];

    document.querySelector("#descricao").value = transacao.descricao;

    document.querySelector("#valor").value = transacao.valor;

    document.querySelector("#tipo").value = transacao.tipo;

    document.querySelector("#categoria").value = transacao.categoria;

    document.querySelector("#data").value = transacao.data;

    indiceEdicao = index;

    modal.classList.add("active");
    
    window.scrollTo(0, posicaoScroll);
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

    const categoria = document.querySelector("#categoria").value;
    
    const data = document.querySelector("#data").value;


    if (descricao.trim() === "") {


        alert("Digite uma descrição.");

        return;


    }



    if (valor <= 0 || isNaN(valor)) {


        alert("Digite um valor maior que zero.");

        return;


    }



    const novaTransacao = {

    descricao,
    tipo,
    valor,
    categoria,
    data

}


    if (indiceEdicao === null) {

        transacoes.push(novaTransacao);

    } else {

        transacoes[indiceEdicao] = novaTransacao;

        indiceEdicao = null;

    }

    atualizarGraficos();

    salvarTransacoes();

    atualizarCards();

    mostrarTransacoes();

    modal.classList.remove("active");

    document.querySelector("#descricao").value = "";

    document.querySelector("#valor").value = "";

    document.querySelector("#tipo").value = "Receita";

    document.querySelector("#categoria").value = "Alimentação";
    
    document.querySelector("#data").value = "";

});

    pesquisa.addEventListener("input", function(){

        const texto = pesquisa.value.toLowerCase();

        const resultado = transacoes.filter(function(transacao){

            return transacao.descricao
                .toLowerCase()
                .includes(texto);


    const resultado = transacoes.filter(transacao => {

    const correspondePesquisa =
        transacao.descricao.toLowerCase().includes(pesquisa);

    const correspondeTipo =
        filtroTipo.value === "Todos" ||
        transacao.tipo === filtroTipo.value;

    return correspondePesquisa && correspondeTipo;
    console.log(resultado);
});
        });

        mostrarTransacoes(resultado);
        console.log(resultado);

    });


    let chartLinha;

    let chartPizza;

    let chartBarra;

    function atualizarGraficos() {

    const receitas = transacoes
        .filter(transacao => transacao && transacao.tipo === "Receita")
        .reduce((total, transacao) => total + transacao.valor, 0);

    const despesas = transacoes
        .filter(transacao => transacao && transacao.tipo === "Despesa")
        .reduce((total, transacao) => total + transacao.valor, 0);


    if (chartBarra) {
        chartBarra.destroy();
    }

    chartBarra = new Chart(graficoBarra, {

        type: "bar",

        data: {

            labels: ["Receitas", "Despesas"],

            datasets: [{
            responsive: true,
            maintainAspectRatio: false,

            label: "Valor",
            responsive: true,
            maintainAspectRatio: false,
            data: [receitas, despesas],

            backgroundColor: ["#45b46a", "#a02f34"]
            }]

        },

        options: {
            responsive: true,

            plugins: {
                legend: {
                    display: false
                }
            }
        }

    });


    const transacoesComData = transacoes
        .filter(transacao => transacao && transacao.data)
        .sort((a, b) => new Date(a.data) - new Date(b.data));


    const datas = [...new Set(
        transacoesComData.map(transacao => transacao.data)
    )];


    const valoresReceitas = datas.map(data => {

        return transacoesComData
            .filter(transacao =>
                transacao.data === data &&
                transacao.tipo === "Receita"
            )
            .reduce((total, transacao) => total + Number(transacao.valor), 0);

    });


    const valoresDespesas = datas.map(data => {

        return transacoesComData
            .filter(transacao =>
                transacao.data === data &&
                transacao.tipo === "Despesa"
            )
            .reduce((total, transacao) => total + transacao.valor, 0);

    });


    if (chartLinha) {
        chartLinha.destroy();
    }


    chartLinha = new Chart(graficoLinha, {

        type: "line",

        data: {

            labels: datas.map(data => {

                const [ano, mes, dia] = data.split("-");

                return `${dia}/${mes}/${ano}`;

            }),

            datasets: [

                {
                    label: "Receitas",

                    data: valoresReceitas,

                    borderColor: "#45b46a",

                    backgroundColor: "#45b46a",

                      

                    tension: 0.3
                },

                {
                    label: "Despesas",

                    data: valoresDespesas,

                    borderColor: "#a02f34",

                    backgroundColor: "#a02f34",

                    tension: 0.3
                }

            ]

        },

           options: {

        responsive: true,

        interaction: {
            intersect: false,
            mode: "index"
        },

        scales: {

            y: {
                beginAtZero: true
            }

        }

    }

}); 
    if (chartPizza) {
            chartPizza.destroy();
        }

    const categoriasUsadas = [...new Set(
    transacoes.map(transacao => transacao.categoria)
)];

    chartPizza = new Chart(graficoPizza, {

        type: "doughnut",

        data: {

        labels: categoriasUsadas,
            datasets: [{
                data: categoriasUsadas.map(categoria => {

                    return transacoes
                        .filter(transacao => transacao.categoria === categoria)
                        .reduce((total, transacao) => total + transacao.valor, 0);
            }),
                backgroundColor: ["#b4a345", "#a02f67", "#4556b4", "#a02f34", "#53a034", "#5d34a0", "#f1f5f5"],
                    
            }],
            
            options: {
                        responsive: true,

                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
            },
        
});
console.log(chartPizza);
} 


atualizarCards();

mostrarTransacoes();

atualizarGraficos();

lucide.createIcons();