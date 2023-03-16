$(function() {
    

    $("input[type=radio]").checkboxradio();
    $("input[type=text]").datepicker();

    $("#dialogDefault").dialog({
        modal: true,
        autoOpen: false,
        buttons: {
            Ok: function() {
                $(this).dialog("close");
            }
        }
    });

    //função para verificar se é a data de retorno é anterior que a de ida
    $('#volta').on('change', function(){

        let valorIda = $(this).datepicker("getDate");
        let valorVolta = $('#ida').datepicker("getDate");

        console.log(valorIda,valorVolta)
        //verifica se o retorno é anterior a data de ida
        if(valorIda < valorVolta){
            $("#dialog").text("A data de retorno não pode ser anterior à data de ida.").dialog();
            $(this).val("");
        }

        //verificando se diferença é maior que 30
        if(valorIda && valorVolta){ 
            const diferenca = (valorVolta - valorIda) / (1000 * 3600 * 24)
            console.log(diferenca);
            if(diferenca < -30){

                $("#dialog").text("A diferença entre as datas de ida e retorno não pode ser maior que 30 dias.").dialog();
                $('#ida').val("");
                $(this).val("");

            }
        }

    })

    //dispara ao evento 'submit' do formulario
    $('form').submit(function( event ) {

        //evitar refresh
        event.preventDefault()
        //pega valores do formualrio 
        let diaria = parseFloat($('#diaria').val()); 
        let valorIda = $('#volta').datepicker("getDate");
        let valorVolta = $('#ida').datepicker("getDate");

        let diferencaForm = (valorVolta - valorIda) / (1000 * 3600 * 24);
        
        console.log(diferencaForm);

        let resultado = (valorIda.getTime() !== valorVolta.getTime()) ? ((diferencaForm - 1) * diaria) + (diaria / 2) : diaria / 2;

        return $("#dialog").text(`Sua diaria ficara em : ${Math.abs(resultado.toFixed(2))}`).dialog();


    });


});