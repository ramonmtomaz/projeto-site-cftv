function mostrarAba () {
    const abaAdicionar = document.querySelector('.aba-adicionar-pedido');
    const abaSelecionar = document.querySelector('.aba-selecionar-pedido');
    const abaAndamento = document.querySelector('.aba-em-andamento');

    abaAdicionar.addEventListener('click', function() {
        document.querySelector('.container-adicionar-pedido').style.display = 'flex';
        document.querySelector('.container-selecao-pedido').style.display = 'none';
        document.querySelector('.container-pedido-andamento').style.display = 'none';
    });

    abaSelecionar.addEventListener('click', function() {
        document.querySelector('.container-adicionar-pedido').style.display = 'none';
        document.querySelector('.container-selecao-pedido').style.display = 'flex';
        document.querySelector('.container-pedido-andamento').style.display = 'none';
    });

    abaAndamento.addEventListener('click', function() {
        document.querySelector('.container-adicionar-pedido').style.display = 'none';
        document.querySelector('.container-selecao-pedido').style.display = 'none';
        document.querySelector('.container-pedido-andamento').style.display = 'flex';
    });
}


function finalizarPedido() {
    const botaoFinalizarPedido = document.querySelector('.botao-finalizar-pedido');
    const modalConcluirPedido = document.querySelector('.container-informacoes-pedido');
    const botaoFecharModal = document.querySelector('.botao-fechar-modal');
    const conclusaoDoPedido = document.querySelector('#conclusao-pedido');
    const seguiuDevidamente = document.querySelector('.container-seguiu-devidamente');
    const erroOperacional = document.querySelector('.container-erro-operacional');
    const atoInseguro = document.querySelector('.container-ato-inseguro');
    const causaIndeterminada = document.querySelector('.container-causa-indeterminada');

    botaoFinalizarPedido.addEventListener('click', function() {

        modalConcluirPedido.style.display = 'block';
    });

    botaoFecharModal.addEventListener('click', function() {
        modalConcluirPedido.style.display = 'none';
    });
    
    conclusaoDoPedido.addEventListener('change', function() {        

        if (conclusaoDoPedido.value === 'seguiu-devidamente') {
            seguiuDevidamente.style.display = 'flex';
            erroOperacional.style.display = 'none';
            atoInseguro.style.display = 'none';
        } else if (conclusaoDoPedido.value === 'erro-operacional') {
            erroOperacional.style.display = 'flex';
            seguiuDevidamente.style.display = 'none';
            atoInseguro.style.display = 'none';
        } else if (conclusaoDoPedido.value === 'ato-inseguro') {
            atoInseguro.style.display = 'flex';
            seguiuDevidamente.style.display = 'none';
            erroOperacional.style.display = 'none';
        } else if (conclusaoDoPedido.value === 'causa-indeterminada') {
            
            seguiuDevidamente.style.display = 'none';
            erroOperacional.style.display = 'none';
            atoInseguro.style.display = 'none';

        } else if (conclusaoDoPedido.value === '') {
            seguiuDevidamente.style.display = 'none';
            erroOperacional.style.display = 'none';
            atoInseguro.style.display = 'none';
            causaIndeterminada.style.display = 'none';
        }
    });
}


mostrarAba();
finalizarPedido();