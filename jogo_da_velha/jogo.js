var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;


$(document).ready(function(){ 

    //INCIALIZAÇÃO DO JOGO
    $('#btn_start').click(function(){
        if($('#info_player_1').val() == ''){
            alert('Apelido do jogador 1 não foi preenchido');
            return false;
        };

        if($('#info_player_2').val() == ''){
            alert('Apelido do jogador 2 não foi preenchido');
            return false;
        };

        $('.transform').toggleClass('transform-active');

        $('#nome_jogador_1').html($('#info_player_1').val());
        $('#nome_jogador_2').html($('#info_player_2').val());

        $('#palco_do_jogo').delay(1999).fadeIn(1000);
        $('#painel_do_jogo').delay(1000).fadeOut(1000);
        $('#nome_jogador_1').addClass("player_turn");
        $('#restart_btn').hide();

    });

    //REGRAS DA JOGADA
    $('.jogada').click(function(){
        var coordenada = this.id;
        $('#'+coordenada).off();
        var ponto = 0;

        if((rodada % 2) == 1){
            $('#'+(coordenada)).addClass("mark_red");
            $('#nome_jogador_1').removeClass("player_turn");
            $('#nome_jogador_2').addClass("player_turn");
            ponto = -1;
        }else{
  
            $('#'+(coordenada)).addClass("mark_blue");
            $('#nome_jogador_2').removeClass("player_turn");
            $('#nome_jogador_1').addClass("player_turn");
            ponto = 1;
        }
        rodada ++;

        var linha_coluna = coordenada.split('-');
        matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

        verificacao_jogada();
    });    
    
    function verificacao_jogada(){

        //VERIFICAÇÃO HORIZONTAL
        var pontos = 0;
        for(var i = 1; i <= 3; i++){
            pontos = pontos + matriz_jogo['a'][i];
        };
        ganhador(pontos);

        var pontos = 0;
        for(var i = 1; i <= 3; i++){
            pontos = pontos + matriz_jogo['b'][i];
        };
        ganhador(pontos);

        var pontos = 0;
        for(var i = 1; i <= 3; i++){
            pontos = pontos + matriz_jogo['c'][i];
        };
        ganhador(pontos);

        //VERIFICAÇÃO VERTICAL
        for(var i = 1; i <= 3; i++){
            var pontos = 0;
            pontos = pontos + matriz_jogo['a'][i];
            pontos = pontos + matriz_jogo['b'][i];
            pontos = pontos + matriz_jogo['c'][i];
            ganhador(pontos);
        };
        
        //VERIFICAÇÃO VERTICAL
        var pontos = 0;
        pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
        ganhador(pontos);

        var pontos = 0;
        pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
        ganhador(pontos);
    };

    //DECLARAÇÃO DE VENCEDOR
    function ganhador(pontos){
        if(pontos == -3){
            setTimeout(function() {alert("Jogador 1: " + $('#info_player_1').val() + " ganhou");}, 500);
            $('.jogada').off();
            $('#restart_btn').show();

        }else if(pontos == 3){
            setTimeout(function() {alert("Jogador 2: " + $('#info_player_2').val() + " ganhou");}, 500);
            $('.jogada').off();
            $('#restart_btn').show();

        }

    };
});
