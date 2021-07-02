var escala = 32;
var tipoDeMovimento = 1;
var altura = 0;
var paraCima = true;
var deveBater = false;
var quandoBater = 0;

function Monstro() {
	this.x = Math.round(Math.random() * 13) + 1;
	this.y = Math.round(Math.random() * 12) + 1;

	this.ultimoX = this.x;
	this.ultimoY = this.y;

	this.xVel = 1;
	this.yVel = 1;

	this.vida = 100;
	this.dano = 20;

	this.img = new Image();
	this.img.src = "./imagens/monstro.png";

	this.nascer = function() {
		this.x = Math.round(Math.random() * 13) + 1;
		this.y = Math.round(Math.random() * 12) + 1;

		this.ultimoX = this.x;
		this.ultimoY = this.y;

		this.vida = 100;
	}

	this.mover = function(alvoX, alvoY) {
		if (this.ultimoX != this.x)
			this.ultimoX = this.x;
		if (this.ultimoY != this.y)
			this.ultimoY = this.y;

		switch(tipoDeMovimento) {
			case 1:
				if (alvoX < this.x)
					this.x -= this.xVel;
				else if (alvoY < this.y)
					this.y -= this.yVel;
				else if (alvoX > this.x)
					this.x += this.xVel;
				else if (alvoY > this.y)
					this.y += this.yVel;
				break;
			case -1:
				if (alvoY < this.y)
					this.y -= this.yVel;
				else if (alvoX < this.x)
					this.x -= this.xVel;
				else if (alvoY > this.y)
					this.y += this.yVel;
				else if (alvoX > this.x)
					this.x += this.xVel;
				break;
		}

		if (this.x > 15)
			this.x = 15;
		else if (this.x < 1)
			this.x = 1;

		if (this.y > 14)
			this.y = 14;
		else if (this.y < 1)
			this.y = 1;

		tipoDeMovimento *= -1;
	}

	this.morreu = function() {
		if (this.vida <= 0)
			return true;
		else return false;
	}

	this.verificarPosicao = function(personagem) {
		if (personagem.x == this.x && personagem.y == this.y) {
			this.x = this.ultimoX;
			this.y = this.ultimoY;
		}
	}

	this.mostrar = function(contexto) {
  		contexto.drawImage(this.img, this.x*escala, this.y*escala);
	}
}

function Heroi() {
	this.x = Math.round(Math.random() * 13) + 1;
	this.y = Math.round(Math.random() * 12) + 1;

	this.ultimoX = this.x;
	this.ultimoY = this.y;

	this.vida = 100;

	this.temArma = false;
	this.atacou = false;

	this.dificuldade = 2;

	this.img = new Image();
	this.img.src = "./imagens/heroi.png";

	this.nascer = function() {
		this.x = Math.round(Math.random() * 13) + 1;
		this.y = Math.round(Math.random() * 12) + 1;

		this.ultimoX = this.x;
		this.ultimoY = this.y;

		this.dificuldade = 10;

		this.vida = 100;
		this.temArma = false;
		this.atacou = false;
	}

	this.atacar = function(personagem) {
		if (this.temArma && this.atacou) {
			if (personagem.x-1 == this.x && personagem.y == this.y) {
				personagem.vida -= 50;
				this.atacou = false;
			}
			if (personagem.x+1 == this.x && personagem.y == this.y) {
				personagem.vida -= 50;
				this.atacou = false;
			}
			if (personagem.x == this.x && personagem.y-1 == this.y) {
				personagem.vida -= 50;
				this.atacou = false;
			}
			if (personagem.x == this.x && personagem.y+1  == this.y) {
				personagem.vida -= 50;
				this.atacou = false;
			}
		}
	}

	this.levarDano = function(personagem) {
		if ((personagem.x-1 == this.x && personagem.y == this.y) || (personagem.x+1 == this.x && personagem.y  == this.y) || (personagem.x == this.x && personagem.y-1  == this.y) || (personagem.x == this.x && personagem.y+1 == this.y)) {
			if (deveBater == true) {
				if (personagem.x-1 == this.x && personagem.y  == this.y)
					this.vida -= personagem.dano;
				if (personagem.x+1 == this.x && personagem.y  == this.y)
					this.vida -= personagem.dano;
				if (personagem.x == this.x && personagem.y-1  == this.y)
					this.vida -= personagem.dano;
				if (personagem.x == this.x && personagem.y+1 == this.y)
					this.vida -= personagem.dano;
				deveBater = false;
				quandoBater = 0;
			} else {
				quandoBater++;
				if (quandoBater >= this.dificuldade)
					deveBater = true;
			}
		} else {
			quandoBater = 0;
			deveBater = false;
		}
	}

	this.mover = function(direcao) {
		if (this.ultimoX != this.x)
			this.ultimoX = this.x;
		if (this.ultimoY != this.y)
			this.ultimoY = this.y;

		switch(direcao) {
			case 1:
				this.x -= 1;
				break;
			case 2:
				this.x += 1;
				break;
			case 3:
				this.y -= 1;
				break;
			case 4:
				this.y += 1;
				break;
		}

		if (this.x > 14)
			this.x = 14;
		else if (this.x < 1)
			this.x = 1;

		if (this.y > 13)
			this.y = 13;
		else if (this.y < 1)
			this.y = 1;
	}

	this.verificarPosicao = function(personagem) {
		if (personagem.x == this.x && personagem.y == this.y) {
			this.x = this.ultimoX;
			this.y = this.ultimoY;
		}
	}

	this.estaNoMesmoLugar = function(personagem) {
		if (personagem.x == this.x && personagem.y == this.y)
			return true;
	}

	this.morreu = function() {
		if (this.vida <= 0)
			return true;
		else return false;
	}

	this.mostrar = function(contexto) {
		if (this.temArma == true)
			this.img.src = "./imagens/heroiComArma.png";
		else this.img.src = "./imagens/heroi.png";
  		contexto.drawImage(this.img, this.x*escala, this.y*escala);
	}
}

function Arma() {
	this.x = Math.round(Math.random() * 13) + 1;
	this.y = Math.round(Math.random() * 12) + 1;

	this.img = new Image();
	this.img.src = "./imagens/sword.png";

	this.mudarLocalizacao = function() {
		this.x = Math.round(Math.random() * 13) + 1;
		this.y = Math.round(Math.random() * 12) + 1;
	}

	this.mostrar = function(contexto) {
  	contexto.drawImage(this.img, this.x*escala, (this.y*escala)-altura);
		if (altura > 5)
			paraCima = false;
		else if (altura < 0)
			paraCima = true;
		if (paraCima == true)
			altura = altura + 1.5;
		else
			altura = altura - 1.5;
	}
}

function Moeda() {
	this.x = Math.round(Math.random() * 13) + 1;
	this.y = Math.round(Math.random() * 12) + 1;

	this.img = new Image();
	this.img.src = "./imagens/coin.png";

	this.mudarLocalizacao = function() {
		this.x = Math.round(Math.random() * 13) + 1;
		this.y = Math.round(Math.random() * 12) + 1;
	}

	this.mostrar = function(contexto) {
  	contexto.drawImage(this.img, this.x*escala, (this.y*escala)-altura);
		if (altura > 5)
			paraCima = false;
		else if (altura < 0)
			paraCima = true;
		if (paraCima == true)
			altura = altura + 1.5;
		else
			altura = altura - 1.5;
	}
}
