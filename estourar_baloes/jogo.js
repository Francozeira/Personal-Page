var timerId = null;

function iniciaJogo(){
	var url = window.location.search;
	var nivelDoJogo = url.replace("?","");
	var tempoDoJogo;

	switch (nivelDoJogo){

		case '1':
			tempoDoJogo = 120;
			break;

		case '2':
			tempoDoJogo = 60;
			break;

		case '3':
			tempoDoJogo = 30;
			break;
	}

	document.getElementById('cronometro').innerHTML = tempoDoJogo;

	var qtddBaloes = 80;

	criarBaloes(qtddBaloes);

	document.getElementById('baloesInteiros').innerHTML = qtddBaloes;
	document.getElementById('baloesEstourados').innerHTML = 0;

	contagemTempo(tempoDoJogo + 1)
}

	function contagemTempo(segundos){
		segundos = segundos - 1;
		if(segundos == -1){
			clearTimeout(timerId);
			gameOver();
			return false;
		}
		document.getElementById('cronometro').innerHTML = segundos;
		timerId = setTimeout("contagemTempo("+segundos+")", 1000);
	}

function criarBaloes(qtddBaloes){

	for (var i = 1; i <= qtddBaloes; i++) {
		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b' + i;
		balao.onclick = function(){estourar(this);};

		document.getElementById('cenario').appendChild(balao);
	}
}

function gameOver(){
	alert('VOCÊ MORREU! \nEstoure todos os balões da próxima vez!')
}

function estourar(e){
	var idBalao = e.id;
	document.getElementById(idBalao).setAttribute("onclick","");
	document.getElementById(idBalao).src = 'imagens/balao_azul_pequeno_estourado.png';
	pontuacao(-1);
}

function pontuacao(acao){
	var baloesInteiros = document.getElementById('baloesInteiros').innerHTML;
	var baloesEstourados = document.getElementById('baloesEstourados').innerHTML;

	baloesInteiros = parseInt(baloesInteiros);
	baloesEstourados = parseInt(baloesEstourados);

	baloesInteiros = baloesInteiros + acao;
	baloesEstourados = baloesEstourados - acao;

	document.getElementById('baloesInteiros').innerHTML = baloesInteiros;
	document.getElementById('baloesEstourados').innerHTML = baloesEstourados;

	situacaoJogo(baloesInteiros,baloesEstourados);

}

function situacaoJogo(baloesInteiros,baloesEstourados){
if (baloesInteiros == 0) {
	alert('Parabéns, você ganhou!');
	pararJogo();
}
}

function pararJogo(){
	clearTimeout(timerId);
}
