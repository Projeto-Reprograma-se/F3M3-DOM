(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_clientes')) ?? [];
}

function setLocalStorage(bd_clientes) {
  localStorage.setItem('bd_clientes', JSON.stringify(bd_clientes));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
  limparTabela();
  const bd_clientes = getLocalStorage();
  let index = 0;
  for (cliente of bd_clientes) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${cliente.modelo}</td>
        <td>${cliente.marca}</td>
        <td>${cliente.preco}</td>
        <td>${cliente.quant}</td>
        <td>${cliente.fs}</td>
        <td>${cliente.freq}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

const inputElement = document.getElementById("preco");

function inserir() { // Adaptação da função inserir (10 pontos)
  const cliente = {
    modelo: document.getElementById('modelo').value,
    marca: document.getElementById('marca').value,
    preco: document.getElementById('preco').value,
    quant: document.getElementById('quant').value,
    fs:  document.getElementById('fs').value,
    freq: document.getElementById('freq').value,
    
  }
  const bd_clientes = getLocalStorage();
  bd_clientes.push(cliente);
  setLocalStorage(bd_clientes);
  atualizarTabela();
}

function excluir(index) { // Adaptação da função excluir (5 pontos)
  const bd_clientes = getLocalStorage();
  bd_clientes.splice(index, 1);
  setLocalStorage(bd_clientes);
  atualizarTabela();
}

function validarModelo() { // Adaptação da função validar (10 pontos)
  const bd_clientes = getLocalStorage();
  for (cliente of bd_clientes) {
    if (modelo.value == cliente.modelo) {
      modelo.setCustomValidity("Este modelo já é cadastrado!");
      feedbackModelo.innerText = "Este modelo já é cadastrado!";
      return false;
    } else {
      modelo.setCustomValidity("");
      feedbackModelo.innerText = "Informe o modelo corretamente.";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const modelo = document.getElementById("modelo");
const feedbackCelular = document.getElementById("feedbackModelo");
modelo.addEventListener('input', validarModelo);

