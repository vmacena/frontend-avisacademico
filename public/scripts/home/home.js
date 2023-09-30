window.onload = async () => {
    if(!await buscarUsuarioLogado()) {
        window.location = "./../../";
    }

    var usuario = await perfil();
    if(usuario?.status != ERRO) setarValoresUsuario(usuario);

    
}

function setarValoresUsuario(usuario) {
    foto = document.getElementById("fotoUsuarioLogado");
    nome = document.getElementById("nomeUsuarioLogado");
    foto.src = usuario?.resultado?.foto;
    nome.innerHTML = usuario?.resultado?.nome;
}