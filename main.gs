function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Projeto CFTV')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

const linkPlanilhaDeDados = SpreadsheetApp.openById('1fo9DAotXGTTchqk4OTX-gAaZECclXoYhvKVSAOCFkHk').getSheetByName('Dados');

function adicionarPedido(numeroPedido, setorSolicitante, reclamacaoCliente, prioridadePedido) {
  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
  const plan = linkPlanilhaDeDados;
  const ultimaLinha = plan.getLastRow();

  if (ultimaLinha > 1) {
    const rangePedidos = plan.getRange('E2:E' + ultimaLinha);
    rangePedidos.setNumberFormat('@'); // Formata a coluna inteira para texto
    const colPedidos = rangePedidos.getValues();
    const colPedidosSimplificado = colPedidos.flat();
    const numeroDoPedidoString = String(numeroPedido);

    if (colPedidosSimplificado.includes(numeroDoPedidoString)) {
      const erro = `O pedido ${numeroDoPedidoString} já está na planilha.`
      return erro;
    }
  }

  const numeroDoPedidoString = String(numeroPedido);
  const novaLinha = ultimaLinha + 1;
  const dadosParaInserir = [
    dataFormatada, 
    setorSolicitante, 
    prioridadePedido, 
    reclamacaoCliente, 
    numeroDoPedidoString, 
    'Aguardando Análise'
  ];

  const rangeNovaLinha = plan.getRange(novaLinha, 1, 1, 6);  
  const celulaPedido = plan.getRange(novaLinha, 5);  
  celulaPedido.setNumberFormat('@');
  rangeNovaLinha.setValues([dadosParaInserir]);

  const sucesso = `O Pedido ${numeroDoPedidoString} foi inserido com sucesso`;
  return sucesso;
}

function contadorPedido() {  
  const colunaStatusAnalise = linkPlanilhaDeDados.getRange('F2:F').getValues();

  var contadorAnalises = 0;

  colunaStatusAnalise.forEach (linha => {
    if (linha[0] === 'Aguardando Análise') {
      contadorAnalises++;
    }
  })
  console.log(contadorAnalises);
  return contadorAnalises;  
}


function selecionarPedidoGS(auditor) {
  const dataAtual = new Date();    
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
  const colPrioridade = linkPlanilhaDeDados.getRange('C2:F').getValues(); 

  for(var i = 0; i < colPrioridade.length; i++) {
    if (colPrioridade[i][0] === 'Urgente' && colPrioridade[i][3] === 'Aguardando Análise') {
      var linhaPedido = i + 2;
      linkPlanilhaDeDados.getRange(linhaPedido, 6).setValue('Em Andamento');
      linkPlanilhaDeDados.getRange(linhaPedido, 7).setValue(auditor);
      linkPlanilhaDeDados.getRange(linhaPedido, 8).setValue(dataFormatada);   
      return
    } 
  }

  for(var i = 0; i < colPrioridade.length; i++) {
    if (colPrioridade[i][0] === 'Alta' && colPrioridade[i][3] === 'Aguardando Análise') {
      var linhaPedido = i + 2;
      linkPlanilhaDeDados.getRange(linhaPedido, 6).setValue('Em Andamento');
      linkPlanilhaDeDados.getRange(linhaPedido, 7).setValue(auditor);      
      linkPlanilhaDeDados.getRange(linhaPedido, 8).setValue(dataFormatada);   
      return
    } 
  }

  for(var i = 0; i < colPrioridade.length; i++) {
    if (colPrioridade[i][0] === 'Média' && colPrioridade[i][3] === 'Aguardando Análise') {
      var linhaPedido = i + 2;
      linkPlanilhaDeDados.getRange(linhaPedido, 6).setValue('Em Andamento');
      linkPlanilhaDeDados.getRange(linhaPedido, 7).setValue(auditor);  
      linkPlanilhaDeDados.getRange(linhaPedido, 8).setValue(dataFormatada);       
      return
    } 
  }

  for(var i = 0; i < colPrioridade.length; i++) {
    if (colPrioridade[i][0] === 'Baixa' && colPrioridade[i][3] === 'Aguardando Análise') {
      var linhaPedido = i + 2;
      linkPlanilhaDeDados.getRange(linhaPedido, 6).setValue('Em Andamento');
      linkPlanilhaDeDados.getRange(linhaPedido, 7).setValue(auditor);  
      linkPlanilhaDeDados.getRange(linhaPedido, 8).setValue(dataFormatada);       
      return
    } 
  }
}

function pedidosEmAndamento () {
  const colStatusAnalise = linkPlanilhaDeDados.getRange('F2:F').getValues();

  let pedidos = [];  

  for (var i = 0; i < colStatusAnalise.length; i++) {
    if (colStatusAnalise[i][0] === 'Em Andamento') {
      var linhaPedido = i + 2;
      const numeroDoPedido = linkPlanilhaDeDados.getRange(linhaPedido, 5).getValue();
      const auditor = linkPlanilhaDeDados.getRange(linhaPedido, 7).getValue();
      
      const pedidosObjeto = {
        'numero': numeroDoPedido,
        'auditor': auditor
        }
      pedidos.push(pedidosObjeto);      
    }
  }
  console.log(pedidos);
  return pedidos;
}

function finalizarPedidoSD(numeroDoPedido, conclusao, valor, transportadora) {
  const dataAtual = new Date();  
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR');

  const planilha =  linkPlanilhaDeDados.getRange('E2:E').getValues(); 

  for (var i = 0; i < planilha.length; i++) {
    if (planilha[i][0] == numeroDoPedido ) {
      var linhaPedido = i + 2;
      linkPlanilhaDeDados.getRange(linhaPedido, 6).setValue('Concluído');
      linkPlanilhaDeDados.getRange(linhaPedido, 9).setValue(dataFormatada);
      linkPlanilhaDeDados.getRange(linhaPedido, 10).setValue(valor);
      linkPlanilhaDeDados.getRange(linhaPedido, 11).setValue(conclusao);
      linkPlanilhaDeDados.getRange(linhaPedido, 16).setValue(transportadora);
    }
  }

}

function finalizarPedidoEO(numeroDoPedido, conclusao, valor, setor, erro, colaborador, turno) {
  const dataAtual = new Date();  
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
  const planilha =  linkPlanilhaDeDados.getRange('E2:E').getValues(); 

  for (var i = 0; i < planilha.length; i++) {
    if (planilha[i][0] == numeroDoPedido ) {
      var linhaPedido = i + 2;
      linkPlanilhaDeDados.getRange(linhaPedido, 6).setValue('Concluído');
      linkPlanilhaDeDados.getRange(linhaPedido, 9).setValue(dataFormatada);
      linkPlanilhaDeDados.getRange(linhaPedido, 10).setValue(valor);
      linkPlanilhaDeDados.getRange(linhaPedido, 11).setValue(conclusao);
      linkPlanilhaDeDados.getRange(linhaPedido, 12).setValue(setor);
      linkPlanilhaDeDados.getRange(linhaPedido, 13).setValue(erro);
      linkPlanilhaDeDados.getRange(linhaPedido, 14).setValue(turno);
      linkPlanilhaDeDados.getRange(linhaPedido, 15).setValue(colaborador);
    }    
  }
}

function finalizarPedidoAI(numeroDoPedido, conclusao, setor, colaborador) {
  const dataAtual = new Date();  
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
  const planilha =  linkPlanilhaDeDados.getRange('E2:E').getValues(); 

  for (var i = 0; i < planilha.length; i++) {
    if (planilha[i][0] == numeroDoPedido ) {
      var linhaPedido = i + 2;
      linkPlanilhaDeDados.getRange(linhaPedido, 6).setValue('Concluído');
      linkPlanilhaDeDados.getRange(linhaPedido, 9).setValue(dataFormatada);      
      linkPlanilhaDeDados.getRange(linhaPedido, 11).setValue(conclusao);
      linkPlanilhaDeDados.getRange(linhaPedido, 12).setValue(setor);            
      linkPlanilhaDeDados.getRange(linhaPedido, 15).setValue(colaborador);
    }    
  }
}

function finalizarPedidoCI(numeroDoPedido, conclusao, valor) {
  const dataAtual = new Date();  
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
  const planilha =  linkPlanilhaDeDados.getRange('E2:E').getValues(); 

  for (var i = 0; i < planilha.length; i++) {
    if (planilha[i][0] == numeroDoPedido ) {
      var linhaPedido = i + 2;
      linkPlanilhaDeDados.getRange(linhaPedido, 6).setValue('Concluído');
      linkPlanilhaDeDados.getRange(linhaPedido, 9).setValue(dataFormatada); 
      linkPlanilhaDeDados.getRange(linhaPedido, 10).setValue(valor);     
      linkPlanilhaDeDados.getRange(linhaPedido, 11).setValue(conclusao);      
    }    
  }
}

function finalizarPedidoAISim(numeroDoPedido, conclusao, colaborador, observacao) {
  const dataAtual = new Date();  
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
  const planilha =  linkPlanilhaDeDados.getRange('E2:E').getValues(); 

  for (var i = 0; i < planilha.length; i++) {
    if (planilha[i][0] == numeroDoPedido ) {
      var linhaPedido = i + 2;
      linkPlanilhaDeDados.getRange(linhaPedido, 6).setValue('Concluído');
      linkPlanilhaDeDados.getRange(linhaPedido, 9).setValue(dataFormatada); 
      linkPlanilhaDeDados.getRange(linhaPedido, 11).setValue(conclusao);
      linkPlanilhaDeDados.getRange(linhaPedido, 15).setValue(colaborador);     
      linkPlanilhaDeDados.getRange(linhaPedido, 17).setValue(observacao);      
    }    
  }
}

function finalizarPedidoAINao(numeroDoPedido, conclusao) {
  const dataAtual = new Date();  
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
  const planilha =  linkPlanilhaDeDados.getRange('E2:E').getValues(); 

  for (var i = 0; i < planilha.length; i++) {
    if (planilha[i][0] == numeroDoPedido ) {
      var linhaPedido = i + 2;
      linkPlanilhaDeDados.getRange(linhaPedido, 6).setValue('Concluído');
      linkPlanilhaDeDados.getRange(linhaPedido, 9).setValue(dataFormatada);        
      linkPlanilhaDeDados.getRange(linhaPedido, 11).setValue(conclusao);    
      linkPlanilhaDeDados.getRange(linhaPedido, 17).setValue(`Não ocorreu o que foi informado no email!`);      
    }    
  }
}


function excluirPedidoGS(numeroDoPedido) {
  const planilha = linkPlanilhaDeDados.getRange('E2:E').getValues();

  for ( var i = 0; i < planilha.length; i++) {
    if (planilha[i][0] == numeroDoPedido) {
      var linhaPedido = i + 2;
      linkPlanilhaDeDados.deleteRow(linhaPedido)
    }
  }
}
