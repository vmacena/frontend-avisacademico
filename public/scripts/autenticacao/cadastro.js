window.onload = () => {
    document.querySelector("input[id=foto]").addEventListener('change', function(){
        const valorInput = document.querySelector("input[id=foto]").value;
        const mostrarNome = document.querySelector("label[for=foto] p");
        mostrarNome.innerHTML = valorInput;
    });

    document.querySelector("form").addEventListener("submit", async (event) => {
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
            const form = event.target;
            if (form.checkValidity()) {
            // Todas as validações passaram, pode prosseguir com o envio do formulário
                let nome = document.querySelector("input[name=iNome]").value;
                let email = document.querySelector("input[name=iEmail]").value;
                let senha = document.querySelector("input[name=iSenha]").value;
                let foto;
                if(document.getElementById("foto").value) {
                    foto = document.getElementById("foto").files[0];
                    console.log(foto)
                } else {
                    foto = null;
                }
                try {
                    const resp = await cadastrarUsuario(foto, nome, email, senha);
                    if(resp.status == ERRO) {
                        throw new Error(resp.mensagem);
                    } else {
                        componentNotificacao.show({
                            message: USUARIO_CADASTRADO_SUCESSO,
                            cor: "green"
                        });
                        try {
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
                                    window.location = "./home.html";
                                }, 2000)
                            }
                        } catch (erro) {
                            componentNotificacao.show({
                                message: erro.message,
                                cor: "red"
                            });
                        }
                    }
                } catch (erro) {
                    componentNotificacao.show({
                        message: erro.message,
                        cor: "red"
                    });
                }
            } else {
                componentNotificacao.show({
                    message: "Dados incorretos",
                    cor: "red"
                });
            }
        }
    })
}