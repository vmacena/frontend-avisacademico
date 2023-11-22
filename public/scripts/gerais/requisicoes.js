// Usuarios
async function cadastrarUsuario(img, nome, email, senha) {
    const dados = new FormData();
    dados.append("foto", img)
    dados.append("nome", nome)
    dados.append("email", email)
    dados.append("senha", senha)
    const resp = await fetch(`${HOST}/usuario/cadastrar`, {
        method: "POST",
        headers: {
            'Accept': 'application/json'
        },
        body: dados
    })

    const data = await resp.json();
    return data;
}

async function perfil() {
    if(!recuperarStorage("token")) {
        return null;
    }
    const resp = await fetch(`${HOST}/usuario/perfil?token=${recuperarStorage("token")}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        },
    })
    const data = await resp.json();
    return data;
}

async function buscarUsuarioId() {
    const resp = await fetch(`${HOST}/usuario/listar?id=2`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        }
    });

    const data = await resp.json();
    console.log(data);
    return data;
}

async function login(email, senha) {
    const resp = await fetch(`${HOST}/usuario/login`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "senha": senha
        })
    });

    const data = await resp.json();
    console.log(data);
    return data;
}