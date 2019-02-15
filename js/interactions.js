var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
      return true;
    }
};

$(document).ready(function(){ 

    //TOOLTIP INICITALIZATION
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
      });

    // CONTROLE DE INPUTS PARA QUE A ENTRADA SEJA DE NUMEROS APENAS
        $("#collected_gift_id").keypress(function (e) {
        
            var maxlengthNumber = parseInt($('#collected_gift_id').attr('maxlength'));
            var inputValueLength = $('#collected_gift_id').val().length + 1;
        
            if (e.which != 6 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                return false;
            }
        
            if(maxlengthNumber < inputValueLength) {
                return false;
            }
        });

        $("#gift_collecter_id").keypress(function (e) {
     
            var maxlengthNumber = parseInt($('#gift_collecter_id').attr('maxlength'));
            var inputValueLength = $('#gift_collecter_id').val().length + 1;

            if (e.which != 6 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                 return false;
            }
            if(maxlengthNumber < inputValueLength) {
                return false;
            }
        });

    $('#btn_submit').click(function(){

        // CONTROLE DE INPUT PARA VERIFICAÇÃO DOS DADOS ENVIADOS
        if($('#collected_gift_id').val() == ''){
            alert('ID do funcionário que terá o brinde coletado não preenchido');
            return false;
        }

        if($('#gift_collecter_id').val() == ''){
            alert('ID do funcionário que coletará o brinde em seu nome não preenchido');
            return false;
        }

        if($('#gift_collecter_id').val() == $('#collected_gift_id').val()){
            alert('ID do funcionário que coletará o brinde em seu nome igual ao ID do funcionário que terá o brinde coletado');
            return false;
        }

        //INCLUSÃO DE DÍGITO VERFIFICADOR MOD11 NO FIM DO CÓDIGO DE BARRA
        var str_final_brcode = $('#collected_gift_id').val().toString() + Mod11($('#collected_gift_id').val());

        function Mod11(num) {
            var soma = 0;
    
            num.split('').reverse().forEach(function(digito, i) {
                soma += parseInt(digito) * (i + 2);
            })
    
            var mod = soma % 11;
    
            return mod > 0 ? (11 - mod) : mod;
    
        };

        // COMPLETAR STRING DE ID + DÍGITO VERIFICADOR COM ZEROS A ESQUERDA
        var str_final_brcode = add_left_zeroes(str_final_brcode,12);

        function add_left_zeroes(string, length) {

            var my_string = string;
            while (my_string.length < length) {
                my_string = '0' + my_string;
            }
        
            return my_string;
        
        }
        
        genPDF(str_final_brcode);
    });

    function genPDF(string_print) {
        
        // VARIÁVEIS DE DADOS PARA GERAR PDF
        var doc = new jsPDF();
        var item_retirado = $("#collected_gift_id").val();
        var retira_item = $("#gift_collecter_id").val();

        // VARIÁVEIS DE HORA PARA GERAR PDF
        var data = new Date();
        var minuto = add_left_zeroes_date(data.getMinutes());
        var hora = add_left_zeroes_date(data.getHours());
        var dia = add_left_zeroes_date(data.getUTCDate());
        var mes = add_left_zeroes_date(data.getMonth()+1);
        var ano = data.getFullYear();
        var str_data = dia + '/' + mes + '/' + ano + ' ' + hora + ':' + minuto;
        $("#hidden_date").html(str_data);

        //PADRONIZADOR DE DATAS
        function add_left_zeroes_date(number) {

            var my_string = number.toString();

            while (my_string.length < 2) {
                my_string = '0' + my_string;
                }
            return my_string;
        }

        // BARCODE GENERATOR
        JsBarcode("#barcode", string_print , {format: "itf", displayValue: false});

        // PDF GENERATOR

        doc.fromHTML($("#form_title").get(0), 35, 40, {
            " width": 500,
            'elementHandlers': specialElementHandlers
        });
        doc.text(60, 70, "Eu, funcionário do ID número: "+ retira_item );
        doc.text(50, 80, "autorizo o funcionário de ID número: " + retira_item);
        doc.text(60, 90, "a realizar a retirada em meu nome.");
        doc.addImage(logo_img, "JPEG", 73.4355828220859, 10, 63.12883435582821, 30);
        doc.setFontSize(8);
        doc.text(140, 100, str_data);
        doc.addImage(barcode, "PNG", 76.45833333333334, 105, 57.08333333333333, 25);
        doc.save("Form ID "+ $("#collected_gift_id").val() + ".pdf");
      }
});


// LOGO BRF GERADO EM BASE64
var logo_img = "data:image/png;base64,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"