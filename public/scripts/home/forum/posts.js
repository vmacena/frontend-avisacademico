var botaoTweet = document.getElementById("botao-tweet");
var textoTweet = document.getElementById("texto-tweet");
var linhaTempo = document.querySelector(".linha_tempo");

var tweets = [];

botaoTweet.addEventListener("click", function () {
    var conteudoTweet = textoTweet.value;
    if (conteudoTweet.trim() !== "") {
        var elementoAutor = document.querySelector("#nomeUsuarioLogado");
        var autor = elementoAutor.textContent; // nome do autor .autor
        var horaAtual = new Date().toLocaleTimeString(); // hora atual
        var dataAtual = new Date().toLocaleDateString(); // data atual
        criarTweet(conteudoTweet, autor, horaAtual, dataAtual);
        textoTweet.value = "";
    }
});

function criarTweet(conteudo, autor, hora, data) {
    var tweet = document.createElement("div");
    tweet.className = "tweet";
    tweet.innerHTML = `
        <div class="autor">${autor}</div>
        <div class="horario">${hora} ${data} </div> <!-- Adiciona a hora aqui -->
        <p>${conteudo}</p>
    `;
    tweets.push(tweet);
    atualizarLinhaTempo();
}

function atualizarLinhaTempo() {
    var linhaTempo = document.querySelector(".linha_tempo");
    linhaTempo.innerHTML = ""; 

    for (var i = tweets.length - 1; i >= 0; i--) {
        linhaTempo.appendChild(tweets[i]);
    }
}
