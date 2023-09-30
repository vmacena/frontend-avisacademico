// Salvar informacoes em localStorage
function salvarStorage(nome, dados) {
    localStorage.setItem(nome, JSON.stringify(dados));
}

function recuperarStorage(nome) {
    const dados = localStorage.getItem(nome);
    if (dados) {
        return JSON.parse(dados);
    } else {
        return null;
    }
}

async function buscarUsuarioLogado() {
    try {
        const resp = await perfil();
        if(resp.status == ERRO) return false;
        salvarStorage("userCompleto", resp);
        return true;
    } catch (error) {
        return false;
    }
}

async function verificarLogin() {
    if(!await buscarUsuarioLogado()) {
        componentNotificacao.show({
            message: "Voce foi desconectado",
            cor: "red"
        });
        setTimeout(() => {
            window.location = "/avisacademico-frontend/";
        }, 2000)
    }
}

function deslogar() {
    salvarStorage("userCompleto", "");
    salvarStorage("token", "");
}
