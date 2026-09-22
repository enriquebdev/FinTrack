const saldoTela = document.querySelector("#saldo");
const receitasTela = document.querySelector("#receitas");
const despesasTela = document.querySelector("#despesas");
const categoria = document.querySelector("#categoria").value;
const data = document.querySelector("#data").value;

const lista = document.querySelector("#lista-transacoes");
const listaCategorias = document.querySelector("#lista-categorias");

const filtroTipo = document.querySelector("#filtro-tipo");
const filtroMes = document.querySelector("#filtro-mes");

const limparMes = document.querySelector("#limpar-mes");

const modal = document.querySelector("#modal");
const modalContent = document.querySelector(".modal-content");
const feedbackModal = document.querySelector("#modal-feedback");
const toastSucesso = document.querySelector("#toast-sucesso");
const abrirModal = document.querySelector("#adicionar");
const fecharModal = document.querySelector("#fechar-modal");
const botaoSalvar = document.querySelector("#salvar");

const pesquisa = document.querySelector("#pesquisa");

let indiceEdicao = null;
let temporizadorToast;



let transacoes = [];

const graficoLinha = document.querySelector("#graficoLinha");

const graficoPizza = document.querySelector("#graficoPizza");

const graficoBarra = document.querySelector("#graficoBarra");
const filtroRelatorioMes = document.querySelector("#filtro-relatorio-mes");
const botaoExportarRelatorio = document.querySelector("#exportar-relatorio");
const relatorioReceitas = document.querySelector("#relatorio-receitas");
const relatorioDespesas = document.querySelector("#relatorio-despesas");
const relatorioSaldo = document.querySelector("#relatorio-saldo");
const comparacaoReceitas = document.querySelector("#comparacao-receitas");
const comparacaoDespesas = document.querySelector("#comparacao-despesas");
const comparacaoSaldo = document.querySelector("#comparacao-saldo");
const graficoRelatorio = document.querySelector("#graficoRelatorio");

function mostrarErroNoModal(mensagem) {
    feedbackModal.textContent = mensagem;
    modal.classList.add("active");
    modalContent.classList.remove("modal-error");
    void modalContent.offsetWidth;
    modalContent.classList.add("modal-error");
}

function limparErroDoModal() {
    feedbackModal.textContent = "";
    modalContent.classList.remove("modal-error");
}

function mostrarNotificacao(mensagem, tipo = "sucesso") {
    clearTimeout(temporizadorToast);
    toastSucesso.textContent = mensagem;
    toastSucesso.classList.toggle("erro", tipo === "erro");
    toastSucesso.classList.remove("ativo");
    void toastSucesso.offsetWidth;
    toastSucesso.classList.add("ativo");

    temporizadorToast = setTimeout(() => {
        toastSucesso.classList.remove("ativo");
    }, 3000);
}

function mostrarSucesso(mensagem) {
    mostrarNotificacao(mensagem);
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
                        <p>${transacao.categoria}</p>
                        <p>${transacao.data}</p>

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
limparMes.addEventListener("click", () => {

    filtroMes.value = "";

    aplicarFiltro();
});
async function removerTransacao(index) {

    const posicaoScroll = window.scrollY;

    const transacaoSelecionada = transacoes[index];

    try {
        await excluirTransacaoDaApi(transacaoSelecionada.id);
    } catch (erro) {
        console.error("Erro ao excluir transação:", erro);
        mostrarErroNoModal(erro.message);
        return;
    }

    transacoes.splice(index, 1);

    atualizarCards();
    atualizarCategorias();
    aplicarFiltro();
    atualizarGraficos();
    atualizarRelatorios();

    window.scrollTo(0, posicaoScroll);
    mostrarSucesso("Transação excluída com sucesso.");
}

function editarTransacao(index) {

    
    const transacao = transacoes[index];

    document.querySelector("#descricao").value = transacao.descricao;
    document.querySelector("#valor").value = transacao.valor;
    document.querySelector("#tipo").value = transacao.tipo;
    document.querySelector("#categoria").value = transacao.categoria;
    document.querySelector("#data").value = transacao.data;

    indiceEdicao = index;

    limparErroDoModal();

    modal.classList.add("active");

    
}

abrirModal.addEventListener("click", function () {

    limparErroDoModal();

    modal.classList.add("active");

});

fecharModal.addEventListener("click", function () {

    limparErroDoModal();
    modal.classList.remove("active");


});


botaoSalvar.addEventListener("click", async function () {

    const posicaoScroll = window.scrollY;

    const descricao = document.querySelector("#descricao").value;

    const valor = Number(document.querySelector("#valor").value);

    const tipo = document.querySelector("#tipo").value;

    const categoria = document.querySelector("#categoria").value;
    
    const data = document.querySelector("#data").value;


    if (descricao.trim() === "") {


        mostrarErroNoModal("Digite uma descrição.");

        return;


    }



    if (valor <= 0 || isNaN(valor)) {


        mostrarErroNoModal("Digite um valor maior que zero.");

        return;


    }
    if (data === "") {
    mostrarErroNoModal("Selecione uma data.");
    return;
}
    const novaTransacao = {

    descricao,
    tipo,
    valor,
    categoria,
    data
}
    
    const estaEditando = indiceEdicao !== null;

    try {
        if (indiceEdicao === null) {
            const resultadoApi = await enviarTransacao(novaTransacao);
            transacoes.push(resultadoApi);
        } else {
            const transacaoOriginal = transacoes[indiceEdicao];
            const resultadoAtualizacao = await atualizarTransacao(
                transacaoOriginal.id,
                novaTransacao
            );

            transacoes[indiceEdicao] = resultadoAtualizacao;
            indiceEdicao = null;
        }
    } catch (erro) {
        console.error("Erro ao salvar transação:", erro);
        mostrarErroNoModal(erro.message);
        return;
    }
requestAnimationFrame(() => {
        window.scrollTo(0, posicaoScroll);
    });
    atualizarGraficos();
    atualizarRelatorios();

    atualizarCards();
    atualizarCategorias();

    aplicarFiltro();

    modal.classList.remove("active");

    document.querySelector("#descricao").value = "";

    document.querySelector("#valor").value = "";

    document.querySelector("#tipo").value = "Receita";

    document.querySelector("#categoria").value = "Alimentação";
    
    document.querySelector("#data").value = "";

    mostrarSucesso(
        estaEditando
            ? "Transação atualizada com sucesso."
            : "Transação cadastrada com sucesso."
    );

});

modal.querySelectorAll("input, select").forEach(campo => {
    campo.addEventListener("input", limparErroDoModal);
    campo.addEventListener("change", limparErroDoModal);
});

    function aplicarFiltro() {

    const textoPesquisa = pesquisa.value.toLowerCase();
    const tipoSelecionado = filtroTipo.value;
    const mesSelecionado = filtroMes.value;

    const transacoesFiltradas = transacoes.filter(transacao => {

        const correspondePesquisa =
            transacao.descricao
                .toLowerCase()
                .includes(textoPesquisa);

        const correspondeTipo =
            tipoSelecionado === "Todos" ||
            transacao.tipo === tipoSelecionado;

        const correspondeMes =
            mesSelecionado === "" ||
            transacao.data.slice(0, 7) === mesSelecionado;

        return correspondePesquisa &&
               correspondeTipo &&
               correspondeMes;
    });
    mostrarTransacoes(transacoesFiltradas);
}

pesquisa.addEventListener("input", aplicarFiltro);
filtroTipo.addEventListener("change", aplicarFiltro);
filtroMes.addEventListener("change", aplicarFiltro);

// Gráficos

    let chartLinha;

    let chartPizza;

    let chartBarra;

    let chartRelatorio;

    function atualizarGraficos() {

    const receitas = transacoes
        .filter(transacao => transacao && transacao.tipo === "Receita")
        .reduce((total, transacao) => total + transacao.valor, 0);

    const despesas = transacoes
        .filter(transacao => transacao && transacao.tipo === "Despesa")
        .reduce((total, transacao) => total + transacao.valor, 0);




// Gráfico de barras

    if (chartBarra) {
        chartBarra.destroy();
    }

    chartBarra = new Chart(graficoBarra, {

        type: "bar",

        data: {

            labels: ["Receitas", "Despesas"],

            datasets: [{

                label: "Valor",
                responsive: true,
                maintainAspectRatio: false,
                data: [receitas, despesas],

                backgroundColor: ["#45b46a", "#a02f34"]
            }]

        },

        options: {
            responsive: true,
            maintainAspectRatio: true,
            
            scales: {
    y: {
        beginAtZero: true,

        ticks: {
            callback: function(valor) {
                return valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                });
            }
        }
    }
},
            responsive: true,

            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {

                            return context.raw.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            });

                    }
    }
},
                legend: {
                    display: false
                }
            }
        }

    });
   

// Gráfico de linha

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
                backgroundColor: "#a02f35dc",
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
                beginAtZero: true,

                ticks: {
                    callback: function(valor) {

                        return valor.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        });

                    }
                }
            }

        },

        plugins: {

            tooltip: {
                callbacks: {
                    label: function(context) {

                        const valor = context.raw;

                        return `${context.dataset.label}: ${valor.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}`;

                    }
                }
            }

        }

    }

});


// Gráfico de pizza

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

            backgroundColor: [
                "#b4a345",
                "#a02f67",
                "#4556b4",
                "#a02f34",
                "#53a034",
                "#5d34a0",
                "#f1f5f5"
            ]
        }]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {
                display: true,
                position: "top",

                labels: {
                    padding: 20,
                }

            },

            tooltip: {
                callbacks: {
                    label: function(context) {

                        return context.raw.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        });

                    }
                }
            }

        }

    }

});

} 

function calcularResumo(transacoesDoPeriodo) {
    const receitas = transacoesDoPeriodo
        .filter(transacao => transacao.tipo === "Receita")
        .reduce((total, transacao) => total + Number(transacao.valor), 0);

    const despesas = transacoesDoPeriodo
        .filter(transacao => transacao.tipo === "Despesa")
        .reduce((total, transacao) => total + Number(transacao.valor), 0);

    return {
        receitas,
        despesas,
        saldo: receitas - despesas
    };
}

function obterMesAnterior(mesSelecionado) {
    if (!mesSelecionado) return null;

    const [ano, mes] = mesSelecionado.split("-").map(Number);
    const data = new Date(Date.UTC(ano, mes - 2, 1));

    return `${data.getUTCFullYear()}-${String(data.getUTCMonth() + 1).padStart(2, "0")}`;
}

function atualizarComparacao(elemento, valorAtual, valorAnterior, mesAnterior, melhoraComAumento) {
    elemento.className = "comparacao-relatorio";

    if (!mesAnterior || valorAnterior === 0) {
        elemento.textContent = mesAnterior ? "Sem comparação disponível" : "";
        return;
    }

    const variacao = ((valorAtual - valorAnterior) / Math.abs(valorAnterior)) * 100;

    if (variacao === 0) {
        const mesFormatado = new Date(`${mesAnterior}-01T00:00:00Z`)
            .toLocaleDateString("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" });

        elemento.textContent = `Sem variação em relação a ${mesFormatado}`;
        return;
    }

    const variacaoPositiva = variacao >= 0;
    const resultadoPositivo = melhoraComAumento ? variacaoPositiva : !variacaoPositiva;
    const seta = variacaoPositiva ? "↑" : "↓";
    const mesFormatado = new Date(`${mesAnterior}-01T00:00:00Z`)
        .toLocaleDateString("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" });

    elemento.textContent = `${seta} ${Math.abs(variacao).toFixed(1)}% em relação a ${mesFormatado}`;
    elemento.classList.add(resultadoPositivo ? "positiva" : "negativa");
}

function atualizarRelatorios() {
    const mesSelecionado = filtroRelatorioMes.value;
    const transacoesDoPeriodo = transacoes.filter(transacao =>
        mesSelecionado === "" || transacao.data.slice(0, 7) === mesSelecionado
    );
    const mesAnterior = obterMesAnterior(mesSelecionado);
    const transacoesMesAnterior = transacoes.filter(transacao =>
        transacao.data.slice(0, 7) === mesAnterior
    );
    const resumoAtual = calcularResumo(transacoesDoPeriodo);
    const resumoAnterior = calcularResumo(transacoesMesAnterior);

    botaoExportarRelatorio.disabled = transacoesDoPeriodo.length === 0;

    const formatarMoeda = valor => valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    relatorioReceitas.textContent = formatarMoeda(resumoAtual.receitas);
    relatorioDespesas.textContent = formatarMoeda(resumoAtual.despesas);
    relatorioSaldo.textContent = formatarMoeda(resumoAtual.saldo);

    atualizarComparacao(comparacaoReceitas, resumoAtual.receitas, resumoAnterior.receitas, mesAnterior, true);
    atualizarComparacao(comparacaoDespesas, resumoAtual.despesas, resumoAnterior.despesas, mesAnterior, false);
    atualizarComparacao(comparacaoSaldo, resumoAtual.saldo, resumoAnterior.saldo, mesAnterior, true);

    const dadosPorData = [...new Set(transacoesDoPeriodo.map(transacao => transacao.data))]
        .sort()
        .map(data => ({
            data,
            receitas: transacoesDoPeriodo
                .filter(transacao => transacao.data === data && transacao.tipo === "Receita")
                .reduce((total, transacao) => total + Number(transacao.valor), 0),
            despesas: transacoesDoPeriodo
                .filter(transacao => transacao.data === data && transacao.tipo === "Despesa")
                .reduce((total, transacao) => total + Number(transacao.valor), 0)
        }));

    if (chartRelatorio) {
        chartRelatorio.destroy();
    }

    chartRelatorio = new Chart(graficoRelatorio, {
        type: "bar",
        data: {
            labels: dadosPorData.map(item => item.data.split("-").reverse().join("/")),
            datasets: [
                {
                    label: "Receitas",
                    data: dadosPorData.map(item => item.receitas),
                    backgroundColor: "#45b46a"
                },
                {
                    label: "Despesas",
                    data: dadosPorData.map(item => item.despesas),
                    backgroundColor: "#a02f34"
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: valor => formatarMoeda(valor)
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: contexto => `${contexto.dataset.label}: ${formatarMoeda(contexto.raw)}`
                    }
                }
            }
        }
    });
}

function exportarRelatorioPdf() {
    const mesSelecionado = filtroRelatorioMes.value;

    const transacoesDoPeriodo = transacoes.filter(transacao =>
        mesSelecionado === "" || transacao.data.slice(0, 7) === mesSelecionado
    );

    if (transacoesDoPeriodo.length === 0) {
        mostrarNotificacao("Não há transações para exportar neste período.", "erro");
        return;
    }

    const jsPDF = window.jspdf?.jsPDF;

    if (typeof jsPDF !== "function") {
        mostrarNotificacao("Não foi possível carregar o gerador de PDF. Recarregue a página.", "erro");
        return;
    }

    try {
        const documento = new jsPDF();

        if (typeof documento.autoTable !== "function") {
            mostrarNotificacao("Não foi possível carregar a tabela do PDF. Recarregue a página.", "erro");
            return;
        }

        const periodo = mesSelecionado || "Todos os períodos";

        documento.setFontSize(18);
        documento.text("FinTrack - Relatório Financeiro", 14, 18);

        documento.setFontSize(11);
        documento.text(`Período: ${periodo}`, 14, 27);

        documento.autoTable({
            startY: 34,
            head: [["Data", "Descrição", "Tipo", "Categoria", "Valor"]],
            body: transacoesDoPeriodo.map(transacao => [
                transacao.data.split("-").reverse().join("/"),
                transacao.descricao,
                transacao.tipo,
                transacao.categoria,
                Number(transacao.valor).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })
            ]),
            headStyles: {
                fillColor: [22, 199, 132]
            }
        });

        documento.save(`fintrack-relatorio-${mesSelecionado || "todos-os-periodos"}.pdf`);

        mostrarSucesso("Relatório em PDF exportado com sucesso.");
    } catch (erro) {
        console.error("Erro ao exportar relatório em PDF:", erro);
        mostrarNotificacao("Não foi possível exportar o PDF. Tente novamente.", "erro");
    }
}
function atualizarCategorias() {
    const categorias = transacoes.reduce((resumo, transacao) => {
        const nome = transacao.categoria;

        if (!resumo[nome]) {
            resumo[nome] = { quantidade: 0, total: 0 };
        }

        resumo[nome].quantidade += 1;
        resumo[nome].total += Number(transacao.valor);

        return resumo;
    }, {});

    const categoriasOrdenadas = Object.entries(categorias)
        .sort(([, primeira], [, segunda]) => segunda.total - primeira.total);

    listaCategorias.innerHTML = "";

    if (categoriasOrdenadas.length === 0) {
        listaCategorias.textContent = "Nenhuma categoria cadastrada.";
        return;
    }

    categoriasOrdenadas.forEach(([nome, dados]) => {
        const item = document.createElement("div");
        item.className = "categoria-item";

        const informacoes = document.createElement("div");
        const titulo = document.createElement("strong");
        const detalhe = document.createElement("span");
        const total = document.createElement("span");

        titulo.textContent = nome;
        detalhe.textContent = `${dados.quantidade} ${dados.quantidade === 1 ? "lançamento" : "lançamentos"}`;
        total.textContent = dados.total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        informacoes.append(titulo, detalhe);
        item.append(informacoes, total);
        listaCategorias.append(item);
    });
}


// Funções para interagir com a API

async function carregarTransacoesDaApi() {
    try {
        const resposta = await fetch("http://localhost:3000/transacoes");

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        transacoes = dados;
        aplicarFiltro();
        atualizarCards();
        atualizarCategorias();
        atualizarGraficos();
        atualizarRelatorios();
    } catch (erro) {
        console.error("Erro ao carregar transações:", erro);
        lista.textContent = "Não foi possível carregar as transações.";
    }
}

// Função para enviar uma nova transação para a API

async function enviarTransacao(transacao) {
    const resposta = await fetch(
        "http://localhost:3000/transacoes",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transacao)
        }
    );

    if (!resposta.ok) {
        throw new Error("Não foi possível cadastrar a transação");
    }

    const transacaoCadastrada = await resposta.json();

    return transacaoCadastrada;
}

// Função para atualizar uma transação na API

async function atualizarTransacao(id, transacao) {
    const resposta = await fetch(
        `http://localhost:3000/transacoes/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transacao)
        }
    );

    if (!resposta.ok) {
        throw new Error("Não foi possível atualizar a transação");
    }

    const transacaoAtualizada = await resposta.json();

    return transacaoAtualizada;
}

// Função para excluir uma transação na API

async function excluirTransacaoDaApi(id) {
    const resposta = await fetch(
        `http://localhost:3000/transacoes/${id}`,
        {
            method: "DELETE"
        }
    );
    if (!resposta.ok) {
    throw new Error("Não foi possível excluir a transação");
}
    return true;
}

const menuTransacoes = document.querySelector("#menu-transacoes");
const menuCategorias = document.querySelector("#menu-categorias");
const menuDashboard = document.querySelector("#menu-dashboard");
const menuRelatorios = document.querySelector("#menu-relatorios");

menuTransacoes.addEventListener("click", () => {
    document.querySelectorAll(".menu a").forEach(item => {
        item.classList.remove("active");
    });

    menuTransacoes.classList.add("active");
});
menuCategorias.addEventListener("click", () => {
    document.querySelectorAll(".menu a").forEach(item => {
        item.classList.remove("active");
    });

    menuCategorias.classList.add("active");
});
menuDashboard.addEventListener("click", () => {
    document.querySelectorAll(".menu a").forEach(item => {
        item.classList.remove("active");
    });

    menuDashboard.classList.add("active");
});
menuRelatorios.addEventListener("click", () => {
    document.querySelectorAll(".menu a").forEach(item => {
        item.classList.remove("active");
    });

    menuRelatorios.classList.add("active");
});
filtroRelatorioMes.addEventListener("change", atualizarRelatorios);
botaoExportarRelatorio.addEventListener("click", exportarRelatorioPdf);
carregarTransacoesDaApi();
