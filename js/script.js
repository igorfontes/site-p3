window.HideIt=function(IdHide) {
  var x = document.getElementById(IdHide);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
};

window.HideExcept=function(current_func){
  var botoes = ["formProd","compra","edicao","remove","tableProd","tableVendas"];
  for (let i = 0; i < botoes.length; i++) {
    if(botoes[i] !== current_func){
      var x = document.getElementById(botoes[i]);
      x.style.display = "none";
    } 
  } 
 };

function cadastraDados() {
    var id = document.getElementById("cId").value;
    var nome = document.getElementById("cNome").value;
    var precounit = document.getElementById("cPreco").value;
    var estoque = document.getElementById("cEstoque").value;
  
    var produto = new Object();
    produto.id = id;
    produto.nome = nome;
    produto.precounit = precounit;
    produto.estoque = estoque;
    produto.vendas = parseFloat(0);

    if(window.localStorage.getItem(id)===null){
      if (typeof Storage !== "undefined") {
        window.localStorage.setItem(id, JSON.stringify(produto));
        alert(
          " O produto " +
            nome +
            " com preco unitário de R$ " +
            precounit +
            " tem " +
            estoque +
            " unidades disponíveis! Lista de produtos com " +
            localStorage.length + " itens!"
        );
      } else {
        alert("No support for local storage!");
      }
    
    } else {
      alert("ID já cadastrado! Tente outro id!");
    }
  }
  
  function selectInfo(c, r) {
    switch (c) {
      case 0:
        return JSON.parse(window.localStorage.getItem(window.localStorage.key(r)))
          .id;
      case 1:
        return JSON.parse(window.localStorage.getItem(window.localStorage.key(r)))
          .nome;
      case 2:
        return JSON.parse(window.localStorage.getItem(window.localStorage.key(r)))
          .precounit;
      case 3:
        return JSON.parse(window.localStorage.getItem(window.localStorage.key(r)))
          .estoque;
      case 4:
          return JSON.parse(window.localStorage.getItem(window.localStorage.key(r)))
          .vendas;
      default:
        break;
    }
  }
  
  function listaProdutos() {
    var tbl = document.getElementById("tableProd");
    tbl.innerHTML = "";
    var header = tbl.createTHead();
    var rowhead = header.insertRow(0);
    var cellhead = rowhead.insertCell(0);
    cellhead.innerHTML = "<b>ID</b>";
    cellhead = rowhead.insertCell(1);
    cellhead.innerHTML = "<b>Nome</b>";
    cellhead = rowhead.insertCell(2);
    cellhead.innerHTML = "<b>Preço Unitário</b>";
    cellhead = rowhead.insertCell(3);
    cellhead.innerHTML = "<b>Estoque</b>";
    var numrows = localStorage.length;
    var numcols = 4;
    for (let r = 0; r < numrows; r++) {
      var row = tbl.insertRow();
      for (let c = 0; c < numcols; c++) {
        var cell = row.insertCell();
        cell.innerHTML = selectInfo(c, r);
      }
    }
    if (tbl.style.display === "none") {
      tbl.style.display = "block";
    } else {
      tbl.style.display = "none";
    }
  }

  function listaVendas() {
    var tbl = document.getElementById("tableVendas");
    tbl.innerHTML = "";
    var header = tbl.createTHead();
    var rowhead = header.insertRow(0);
    var cellhead = rowhead.insertCell(0);
    cellhead.innerHTML = "<b>ID</b>";
    cellhead = rowhead.insertCell(1);
    cellhead.innerHTML = "<b>Nome</b>";
    cellhead = rowhead.insertCell(2);
    cellhead.innerHTML = "<b>Total de vendas</b>";
    var numrows = localStorage.length;
    var numcols = 3;
    for (let r = 0; r < numrows; r++) {
      var row = tbl.insertRow();
      for (let c = 0; c < numcols; c++) {
        var cell = row.insertCell();
        if(c == 2){
          cell.innerHTML = selectInfo(c+2, r);
        } else {
          cell.innerHTML = selectInfo(c, r);
        }
      }
    }
    if (tbl.style.display === "none") {
      tbl.style.display = "block";
    } else {
      tbl.style.display = "none";
    }
  }
  
  function removeProd() {
    var idout = document.getElementById("cIdOut").value;
    if(window.localStorage.getItem(idout)===null){
      alert("ID inexistente! Tente novamente!");
    } else {
      window.localStorage.removeItem(idout);
      alert(
        " O produto com id " +
          idout +
          " foi removido com sucesso! Lista de produtos com " +
          localStorage.length +
          " itens!"
      );
    }
  }
  
  function editProd() {
    var idEdit = document.getElementById("cIdEdit").value;
    var nomeEdit = document.getElementById("cNomeEdit").value;
    var precounitEdit = document.getElementById("cPrecoEdit").value;
    var estoqueEdit = document.getElementById("cEstoqueEdit").value;
  
    var produto = new Object();
    produto.id = idEdit;
    produto.nome = nomeEdit;
    produto.precounit = precounitEdit;
    produto.estoque = estoqueEdit; 
  
    if (typeof Storage !== "undefined") {
      if(window.localStorage.getItem(idEdit)===null){
        alert("ID inexistente! Tente novamente!");
      } else {
      produto.vendas = JSON.parse(window.localStorage.getItem(idEdit)).vendas;
      window.localStorage.removeItem(idEdit);
      window.localStorage.setItem(idEdit, JSON.stringify(produto));
      alert(
        " O produto com id " +
          idEdit +
          " foi editado com sucesso! Lista de produtos com " +
          localStorage.length +
          " itens!"
      );
      }
    } else {
      alert("No support for local storage!");
    }
  }
  
  function efetuaCompra() {
    var idComp = document.getElementById("cIdComp").value;
    if(window.localStorage.getItem(idComp)===null){
      alert("Produto com ID inexistente! Verifique a lista de produtos!");
    } else {
    var qtde = document.getElementById("cQtde").value;
    var produto = new Object();
    produto = JSON.parse(window.localStorage.getItem(idComp));
    var aux = JSON.parse(window.localStorage.getItem(idComp)).estoque;
    if (parseInt(aux) < parseInt(qtde)) {
      alert("Desculpe! Estoque insuficiente! Temos apenas " + aux + " unidades disponíveis!");
    } else {
      if (typeof Storage !== "undefined") {
        produto.estoque = parseInt(aux) - parseInt(qtde);
        produto.vendas = (parseFloat(JSON.parse(window.localStorage.getItem(idComp)).vendas) + parseFloat(qtde)*JSON.parse(window.localStorage.getItem(idComp)).precounit).toFixed(2);
        window.localStorage.setItem(idComp, JSON.stringify(produto));
        alert("Compra finalizada com sucesso! Obrigado pela preferência!");
      } else {
        alert("No support for local storage!");
      }
    }
  }
}

  function calc_preco(){
    var idComp = document.getElementById("cIdComp").value;
    var qtde = document.getElementById("cQtde").value;
    var aux = JSON.parse(window.localStorage.getItem(idComp)).precounit;
    tot = parseFloat(qtde) * parseFloat(aux);
    document.getElementById("cTot").value = 
    parseFloat(tot).toFixed(2);
  }