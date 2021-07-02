var objCanvas = null;
var objContexto = null;

var colunas = 15;
var linhas = 14;
var escala = 32;
var totalMonstros = 5;
var qtsMonstros = 1;

var heroi = new Heroi();
var monstros = new Array(totalMonstros);

var espada = new Arma();
var moeda = new Moeda();

var frequenciaDoMovimento = 1;
var estaPausado = false;
var direcao = 0;

var pontuacao = 0;
var vidas = 0;

var tempo = 0;

var imgVida = new Image();
imgVida.src = "./imagens/coracao.png";
var imgPause = new Image();
imgPause.src = "./imagens/pause.png";
var imgFundo = new Image();
imgFundo.src = "./imagens/fundo.png";

function testarTecla() {
    var tecla = event.keyCode;

    if (estaPausado != true) {
      if (tecla == 65 || tecla == 37)
          direcao = 1;
      else if (tecla == 68 || tecla == 39)
          direcao = 2;
      else if (tecla == 87 || tecla == 38)
          direcao = 3;
      else if (tecla == 83 || tecla == 40)
          direcao = 4;
      else if (tecla == 32) {
        if (heroi.temArma == true)
          heroi.atacou = true;
      }
    }
    if (tecla == 27)
      pausar();
}

function pausar() {
  if (estaPausado == false)
    estaPausado = true;
  else if (estaPausado == true)
    estaPausado = false;
}

function comecarJogo() {
  heroi.nascer();
  for (var i = 0; i < monstros.length; i++) {
    monstros[i] = new Monstro;
    monstros[i].nascer();
  }

  espada.mudarLocalizacao();
  moeda.mudarLocalizacao();

  qtsMonstros = 1;
  tempo = 0;
  pontuacao = 0;
}

function Timer() {
  if (estaPausado != true) {
    objContexto.font = "30px enigma";
    objContexto.fillStyle = "navy";
    objContexto.fillText(tempo.toPrecision(2), 430, 60);

    tempo += 0.1;

    if (tempo % 20 == 0) {
      if (qtsMonstros < totalMonstros)
        qtsMonstros++;
      if (heroi.dificuldade > 2)
        heroi.dificuldade--;
    }
  }
}

function iniciar() {
  objCanvas = document.getElementById("meuCanvas");
  objContexto = objCanvas.getContext("2d");

  comecarJogo();
  atualizarTela();
}

function atualizarTela() {
  if (estaPausado != true) {
    if (heroi.morreu()) {
      alert("Game Over!");
      pontuacao += Math.round(tempo);
      alert("Sua pontuação foi de " + pontuacao + " pontos");
      comecarJogo();
    }
    objContexto.clearRect(0, 480, 512, 544);
    objContexto.drawImage(imgFundo, 0*escala, 0*escala);

    if (direcao != 0) {
      heroi.mover(direcao);
      for (var i = 0; i < qtsMonstros; i++)
        heroi.verificarPosicao(monstros[i]);
      if (heroi.estaNoMesmoLugar(espada))
        heroi.temArma = true;
      if (heroi.estaNoMesmoLugar(moeda)) {
        moeda.mudarLocalizacao();
        pontuacao++;
      }
      direcao = 0;
    }

    for (var i = 0; i < qtsMonstros; i++) {
      heroi.atacar(monstros[i]);
    }

    if (frequenciaDoMovimento == 1) {
      for (var i = 0; i < qtsMonstros; i++) {
        monstros[i].mover(heroi.x, heroi.y);
        if (i != 0)
          monstros[i-1].verificarPosicao(monstros[i]);
        monstros[i].verificarPosicao(heroi);
        heroi.levarDano(monstros[i]);
      }
    }
    frequenciaDoMovimento *= -1;

    for (var i = 0; i < qtsMonstros; i++) {
      if (monstros[i].morreu()) {
        pontuacao += 5;
        monstros[i].nascer();
        if (qtsMonstros < totalMonstros)
          qtsMonstros++;
        if (heroi.dificuldade > 2)
          heroi.dificuldade--;
      }
    }

    if (heroi.temArma != true)
      espada.mostrar(objContexto);

    for (var i = 0; i < qtsMonstros; i++)
      monstros[i].mostrar(objContexto);
    heroi.mostrar(objContexto);
    moeda.mostrar(objContexto);

    vidas = Math.floor(heroi.vida/20);
    for(var i = 0; i < vidas; i++) {
        objContexto.drawImage(imgVida, i*64, 480);
    }

    document.getElementById("lbPontuacao").innerHTML = "Pontuação: " + pontuacao.toString();
    Timer();
  }
  else {
    objContexto.drawImage(imgPause, 0, 0);
  }
  setTimeout(atualizarTela, 1000/10);
}
