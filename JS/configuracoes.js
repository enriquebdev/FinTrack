const botaoTema = document.querySelector("#alternar-tema");
const formularioConfiguracoes = document.querySelector("#form-configuracoes");
const inputMetaMensal = document.querySelector("#meta-mensal");
const toastSucesso = document.querySelector("#toast-sucesso");
let temporizadorToast;

function atualizarTema() {
    const modoClaroAtivo = document.body.classList.contains("modo-claro");

    botaoTema.setAttribute(
        "aria-label",
        modoClaroAtivo ? "Ativar modo escuro" : "Ativar modo claro"
    );
    botaoTema.setAttribute(
        "title",
        modoClaroAtivo ? "Modo escuro" : "Modo claro"
    );
    botaoTema.innerHTML = `<i data-lucide="${modoClaroAtivo ? "moon" : "sun"}"></i>`;
    lucide.createIcons();
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

async function carregarConfiguracoesDaApi() {
    try {
        const resposta = await fetch("http://localhost:3000/configuracoes");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar a meta mensal");
        }

        const configuracoes = await resposta.json();
        inputMetaMensal.value = Number(configuracoes.metaMensal) || "";
    } catch (erro) {
        console.error("Erro ao carregar configurações:", erro);
        mostrarNotificacao(erro.message, "erro");
    }
}

async function salvarConfiguracoesNaApi(metaMensal) {
    const resposta = await fetch("http://localhost:3000/configuracoes", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ metaMensal })
    });

    if (!resposta.ok) {
        const erro = await resposta.json().catch(() => ({}));
        throw new Error(erro.mensagem || "Não foi possível salvar a meta mensal");
    }

    return resposta.json();
}

if (localStorage.getItem("tema") === "claro") {
    document.body.classList.add("modo-claro");
}

atualizarTema();

botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("modo-claro");
    localStorage.setItem(
        "tema",
        document.body.classList.contains("modo-claro") ? "claro" : "escuro"
    );
    atualizarTema();
});

formularioConfiguracoes.addEventListener("submit", async evento => {
    evento.preventDefault();

    const metaMensal = Number(inputMetaMensal.value);

    if (!Number.isFinite(metaMensal) || metaMensal < 0) {
        mostrarNotificacao("Informe uma meta mensal válida.", "erro");
        return;
    }

    try {
        const configuracoes = await salvarConfiguracoesNaApi(metaMensal);
        inputMetaMensal.value = Number(configuracoes.metaMensal) || "";
        mostrarNotificacao("Meta mensal salva com sucesso.");
    } catch (erro) {
        console.error("Erro ao salvar configurações:", erro);
        mostrarNotificacao(erro.message, "erro");
    }
});

carregarConfiguracoesDaApi();
