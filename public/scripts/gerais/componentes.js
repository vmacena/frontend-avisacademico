const Confirm = {
    open(options) {
        options = Object.assign({}, {
            mensagem: "",
            textoOK: "Confirmar",
            textoCancelar: "Cancelar",
            onok: function () { },
            oncancel: function () { }
        }, options);

        const template = this._createTemplate(options);
        const confirmEl = template.content.querySelector(".containerComponent");
        const bttFechar = template.content.querySelector(".fecharJanelaConfirmar");
        const bttOk = template.content.querySelector(".confirmar");
        const bttCancelar = template.content.querySelector(".cancelar");

        this._setupButtonClickListeners(confirmEl, bttOk, bttCancelar, bttFechar, options);
        document.body.appendChild(template.content);
    },
    _createTemplate(options) {
        const html = `
            <div class="containerComponent">
                <div class="janelaConfirmar">
                    <button class="fecharJanelaConfirmar">&times;</button>
                    <p>${options.mensagem}</p>
                    <div class="janelaConfirmarAcoes">
                        <button class="cancelar"><p>${options.textoCancelar}</p></button>
                        <button class="confirmar"><p>${options.textoOK}</p></button>
                    </div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;
        return template;
    },
    _setupButtonClickListeners(confirmEl, bttOk, bttCancelar, bttFechar, options) {
        // Considerar clique fora do container como cancelar
        // confirmEl.addEventListener("click", e => {
        //     if(e.target === confirmEl) {
        //         options.oncancel();
        //         this._close(confirmEl);
        //     }
        // });

        bttOk.addEventListener("click", () => {
            options.onok();
            this._close(confirmEl);
        });

        [bttCancelar, bttFechar].forEach(el => {
            el.addEventListener("click", () => {
                options.oncancel();
                this._close(confirmEl);
            })
        });
    },
    _close(confirmEl) {
        confirmEl.classList.add("fecharConfirmar")

        confirmEl.addEventListener("animationend", () => {
            document.body.removeChild(confirmEl);
        })
    }
}

const componentNotificacao = {
    show(options) {
        options = Object.assign({}, {
            message: "",
            cor: "black",
        }, options);
        const notification = document.createElement("div");
        notification.classList.add("notificacao");

        const p = document.createElement("p");
        p.style.color = options.cor;
        p.innerHTML = options.message.replace("\n", "<br>");

        notification.appendChild(p);
        document.body.appendChild(notification);

        notification.style.transition = "transform 0.5s ease-out";

        Array.from(document.querySelectorAll(".notificacao")).forEach((notificacao, index) => {
            notificacao.style.transform = `translateY(-${index * (notificacao.offsetHeight + 10)}px)`;
        });

        setTimeout(() => {
            notification.remove();

            Array.from(document.querySelectorAll(".notificacao")).forEach((notificacao, index) => {
                notificacao.style.transform = `translateY(-${index * (notificacao.offsetHeight + 10)}px)`;
            });
        }, 5000);
    }
}