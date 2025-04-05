document.getElementById("bora-jogar").addEventListener("click", iniciarJogo);

function iniciarJogo() {
  const botaoBoraJogar = document.getElementById("bora-jogar");
  const conteudoDiv = document.getElementById("conteudo");

  // Oculta o botão "Bora Jogar!"
  botaoBoraJogar.classList.add("hidden");

  // Exibe a pergunta sobre a idade
  conteudoDiv.innerHTML = `
    <p>Quantos anos você tem?</p>
    <input type="number" id="idade" placeholder="Digite sua idade">
    <button id="confirmar-idade">Confirmar</button>
  `;

  const inputIdade = document.getElementById("idade");
  const botaoConfirmar = document.getElementById("confirmar-idade");

  // Adicionar evento para o botão "confirmar"
  botaoConfirmar.addEventListener("click", confirmarIdade);

  // Permitir confirmar com a tecla Enter
  inputIdade.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      confirmarIdade();
    }
  });

function confirmarIdade() {
  const idade = parseInt(inputIdade.value);

  if (isNaN(idade) || idade <= 0) {
    conteudoDiv.innerHTML = `<p>⚠️ Por favor, insira uma idade válida.</p>`;
    return;
  }

  if (idade < 18) {
    conteudoDiv.innerHTML = `<p>⚠️ Você não tem permissão para jogar Jokenpo.</p>
    <button id="voltar-inicio">Voltar ao início</button>`;

    // Reexibe o totão "Bora Jogar!" ao clicar no botão "Voltar ao início"
    document.getElementById("voltar-inicio").addEventListener("click", reiniciarJogo);
    return;
  }

  //Prosegue para a escolha do jogador
  exibirEscolhaJogador();

  }
}


function exibirEscolhaJogador() {
  const conteudoDiv = document.getElementById("conteudo");

  conteudoDiv.innerHTML = `
    <p>Escolha:</p>
    <button data-escolha="1">Pedra 🪨</button>
    <button data-escolha="2">Papel 📄</button>
    <button data-escolha="3">Tesoura ✂️</button>
  `;

  document.querySelectorAll("#conteudo button").forEach((button) => {
    button.addEventListener("click", () => {
      const escolhaJogador = parseInt(button.getAttribute("data-escolha"));
      jogarJokenpo(escolhaJogador);
    });
  });
}

function jogarJokenpo(escolhaJogador) {
  const conteudoDiv = document.getElementById("conteudo");

  // Gera a escolha do computador
  const escolhaComputador = Math.floor(Math.random() * 3) + 1;

  // Mapeia as escolhas para texto e emojis
  const escolhas = {
    1: "Pedra 🪨",
    2: "Papel 📄",
    3: "Tesoura ✂️"
  };

  // Exibe as escolhas do jogador e do computador
  const escolhaJogadorTexto = escolhas[escolhaJogador];
  const escolhaComputadorTexto = escolhas[escolhaComputador];

  // Determina o resultado do jogo
  let mensagemResultado = "";
  if (escolhaJogador === escolhaComputador) {
    mensagemResultado = "🤝 Empate!";
  } else if (
    (escolhaJogador === 1 && escolhaComputador === 3) || // Pedra vence Tesoura
    (escolhaJogador === 2 && escolhaComputador === 1) || // Papel vence Pedra
    (escolhaJogador === 3 && escolhaComputador === 2)    // Tesoura vence Papel
   ) {
    mensagemResultado = "🎉 Você venceu!";
  } else {
    mensagemResultado = "💻 O computador venceu!";
  }

  // Exibe o resultado
  conteudoDiv.innerHTML = `
    <p>Você escolheu: <strong>${escolhaJogadorTexto}</strong></p>
    <p>O computador escolheu: <strong>${escolhaComputadorTexto}</strong></p>
    <p><strong>${mensagemResultado}</strong></p>
    <button id="reiniciar-jogo">Jogar novamente</button>
  `;
  document.getElementById("reiniciar-jogo").addEventListener("click", reiniciarJogo);
}

function reiniciarJogo() {
  const botaoBoraJogar = document.getElementById("bora-jogar");
  const conteudoDiv = document.getElementById("conteudo");

  //Limpa o conteúdo e exive o botão "bora jogar!" novamente
  conteudoDiv.innerHTML = "";
  botaoBoraJogar.classList.remove("hidden");

};