window.onload = async () => {
    if(await buscarUsuarioLogado()) {
        window.location = "./src/views/home.html";
    }

    document.querySelector('.validar-formulario').addEventListener('submit', async function (event) {
        event.preventDefault();
        var formIsValid = true;
    
        document.querySelectorAll('.validar-formulario .validar-input .entrada').forEach(function (input) {
            var isValid = input.type === 'email' ? validateEmail(input) : validateNonEmail(input);
            if (!isValid) {
                showValidate(input);
                formIsValid = false;
            }
        });
    
        if(!formIsValid) {
            componentNotificacao.show({
                message: "Corrija os campos",
                cor: "orange"
            });
        } else {
            try {
                let email = document.getElementById("email").value;
                let senha = document.getElementById("senha").value;
                const resp = await login(email, senha);
                if(resp.status == ERRO) {
                    throw new Error(resp.mensagem);
                } else {
                    salvarStorage("token", resp.resultado.token);
                    verificarLogin();
                    componentNotificacao.show({
                        message: LOGADO_SUCESSO+"\nEntrando...",
                        cor: "green"
                    });
                    setTimeout(() => {
                        window.location = "./src/views/home.html";
                    }, 2000)
                }
            } catch (erro) {
                componentNotificacao.show({
                    message: erro.message,
                    cor: "red"
                });
            }
        }
    });
}