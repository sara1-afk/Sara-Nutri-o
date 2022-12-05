var buscarPaciente = document.querySelector('#buscar-paciente-integracao');
var mensagensErroAJAX = document.querySelector('#mensagens-erro-ajax');

buscarPaciente.addEventListener('click', function(event) {
    var apiLink = 'https://api-pacientes.herokuapp.com/pacientes';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiLink);
    xhr.send();
    xhr.addEventListener('load', function() {
       var status = xhr.status;
       if(status == 200) {
           mensagensErroAJAX.classList.add('invisivel');
           var resposta = xhr.responseText;
           var pacientes = JSON.parse(resposta);
           adicionaListaDePacientesNaTabela(pacientes);
       } else {
           mensagensErroAJAX.classList.remove('invisivel');
       }
    });

    function adicionaListaDePacientesNaTabela(pacientes) {
        for(var i = 0; i < pacientes.length; i++) {
            adicionaPacienteNaTabela(pacientes[i]);
        }
    }
});
var titulo = document.querySelector('.titulo');
titulo.textContent = 'Aparecida Nutricionista';

var pacientes = document.querySelectorAll('.paciente');

for(var i = 0; i < pacientes.length; i++) {
    var paciente = pacientes[i];
    var mensagem = '';

    var dadosPaciente = obtemDadosDoPaciente(paciente);
    var infoImc = paciente.querySelector('.info-imc');

    var pesoEhValido = validaPeso(dadosPaciente.peso);
    var alturaEhValida = validaAltura(dadosPaciente.altura);

    if (!pesoEhValido) {
        mensagem = "Peso inválido";
        console.log(mensagem);
        infoImc.textContent = mensagem;
        destacaErro(paciente);
    }

    if(!alturaEhValida) {
        mensagem = "Altura inválida";
        console.log(mensagem);
        infoImc.textContent = mensagem;
        destacaErro(paciente);
    }

    if(pesoEhValido && alturaEhValida) {
        dadosPaciente.imc = calculaImc(dadosPaciente.peso, dadosPaciente.altura);
        paciente.querySelector('.info-imc').textContent = dadosPaciente.imc;
    }
}

function obtemDadosDoPaciente(paciente) {
    return {
        nome: paciente.querySelector('.info-nome').textContent,
        peso: parseFloat(paciente.querySelector('.info-peso').textContent),
        altura: parseFloat(paciente.querySelector('.info-altura').textContent),
        gordura: paciente.querySelector('.info-gordura').textContent,
    }
}

function calculaImc(peso, altura) {
    return (peso / (altura * altura)).toFixed(2);
}

function validaPeso(peso) {
    if(peso && peso > 0 && peso < 1000) return true;
}

function validaAltura(altura) {
    if(altura && altura > 0 && altura < 3.00) return true;
}

function destacaErro(item) {
    item.classList.add('paciente-invalido')
}
var inputBusca = document.querySelector('#busca-paciente');
inputBusca.addEventListener('input', function (event) {
    var pacientes = document.querySelectorAll('.paciente');
    var classeInvisivel = 'invisivel';
    if(this.value) {
        for(var i = 0; i < pacientes.length; i++) {
            var paciente = pacientes[i];
            var nome = paciente.querySelector('.info-nome').textContent;
            var regExp = new RegExp(this.value, 'i')

            if(!regExp.test(nome)) {
                paciente.classList.add(classeInvisivel);
            } else {
                paciente.classList.remove(classeInvisivel);
            }
        }
    } else {
        for(var i = 0; i < pacientes.length; i++) {
            var paciente = pacientes[i];
      *{
box-sizing: border-box;
 }

body{
font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
font-size: 14px;
}

header{
background-color: #333;
height: 3em;
color: #FFF;
margin-bottom: 1em;
}

header h1{
font-size: 2em;
display:inline-block;
vertical-align: middle;
}
header h2{
font-size: 2em;
display:inline-block;
vertical-align: middle;
}

header .container:before{
content: '';
display:inline-block;
height: 100%;
vertical-align: middle;
}

.container{
width: 60%;
height: 100%;
margin: 0 auto;
}

section{
margin: 2em 0;
overflow: hidden;
}

section h2{
font-size: 3em;
display: block;
padding-bottom: .5em;
border-bottom: 1px solid #ccc;
margin-bottom: .5em;
}

table{
width: 100%;
margin-bottom : .5em;
    table-layout: fixed;

}

td, th {
padding: .7em;
margin: 0;
border: 1px solid #ccc;
text-align: center;
}

th{
font-weight: bold;
background-color: #EEE;
}

label{
color: #555;
display: block;
margin-bottom: .2em;
}

.campo{
margin: 0;
padding-bottom: 1em;
width: 100%;
border: 1px solid #ccc;
padding: .7em;
width: 100%;
}

.campo-medio{
display: inline-block;
padding-right: .5em;
}

.grupo{
width: 32%;
display: inline-block;
padding: 10px 0px;
}

button{
padding: .5em 2em;
border: 0;
border-bottom: 3px solid;
font-size: 1.2em;
cursor: pointer;
margin: 0;
margin-top: -3px;
color: #fff;
background-color:#0c8cd3;
border-color: #04324c;
width: 20%;
    display: block;
    clear: both;
    margin: 10px 0px;

}

button:active{
margin-top:0px;
border: 0;
}

button[disabled=disabled], button:disabled {
    background-color: gray;
border-color: darkgray;

}

.adicionar-paciente{
    margin-top: 30px;
}

.campo-invalido{
border: 1px solid red;
}

.paciente-invalido {
color: white;
background-color: lightcoral;
}

#mensagens-erro {
color: red;
margin: 10px 0;
}

#mensagens-erro li {
margin-bottom: 5px;
}

.fadeOut {
opacity: 0<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Sara Nutrição</title>
<link rel="icon" href="favicon.ico" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="css/reset.css">
<link rel="stylesheet" type="text/css" href="css/index.css">

</head>
<body>
<header>
<div class="container">
<h1 class="titulo">Sara Nutrição</h1>
</div>
</header>
<main>
<section class="container">
<h2>Meus pacientes</h2>
<div class="busca">
<label class="rotulo">Buscar:</label>
<input id="busca-paciente" placeholder="Digite o nome do paciente" />
</div>
<table>
<thead>
<tr>
<th>Nome</th>
<th>Peso(kg)</th>
<th>Altura(m)</th>
<th>Gordura Corporal(%)</th>
<th>IMC</th>
</tr>
</thead>
<tbody id="tabela-pacientes">
<tr class="paciente" id="primeiro-paciente">
<td class="info-nome">Victor</td>
<td class="info-peso">60</td>
<td class="info-altura">2.00</td>
<td class="info-gordura">10</td>
<td class="info-imc">0</td>
</tr>

<tr class="paciente" >
<td class="info-nome">João</td>
<td class="info-peso">80</td>
<td class="info-altura">1.72</td>
<td class="info-gordura">40</td>
<td class="info-imc">0</td>
</tr>

<tr class="paciente" >
<td class="info-nome">Katlin</td>
<td class="info-peso">54</td>
<td class="info-altura">1.22</td>
<td class="info-gordura">14</td>
<td class="info-imc">0</td>
</tr>

<tr class="paciente">
<td class="info-nome">Thiago</td>
<td class="info-peso">75</td>
<td class="info-altura">1.73</td>
<td class="info-gordura">24</td>
<td class="info-imc">0</td>
</tr>
<tr class="paciente" >
<td class="info-nome">Tatiana</td>
<td class="info-peso">46</td>
<td class="info-altura">1.55</td>
<td class="info-gordura">19</td>
<td class="info-imc">0</td>
</tr>
</tbody>
</table>
<span id="mensagens-erro-ajax" class="invisivel">
Erro ao buscar pacientes
</span>
<button id="buscar-paciente-integracao" class="botao bto-principal">Buscar Paciente</button>
</section>

<section class="container">
<h2 id="titulo-form">Novo paciente</h2>
<ul id="mensagens-erro"></ul>
<form id="form-adiciona">
<div class="">
<label for="nome">Nome:</label>
<input id="nome" name="nome" type="text" placeholder="digite o nome do seu paciente" class="campo">
</div>
<div class="grupo">
<label for="peso">Peso:</label>
<input id="peso" name="peso" type="text" placeholder="digite o peso do seu paciente" class="campo campo-medio">
</div>
<div class="grupo">
<label for="altura">Altura:</label>
<input id="altura" name="altura" type="text" placeholder="digite a altura do seu paciente" class="campo campo-medio">
</div>
<div class="grupo">
<label for="gordura">% de Gordura:</label>
<input id="gordura" type="text" placeholder="digite a porcentagem de gordura do seu paciente" class="campo campo-medio">
</div>

<button id="adicionar-paciente" class="botao bto-principal">Adicionar</button>
</form>
</section>
</main>

<script src="js/calcula-imc.js"></script>
<script src="js/form.js"></script>
        <script src="js/remover-paciente.js"></script>
<script src="js/filtra.js"></script>
<script src="js/buscar-pacientes.js"></script>
</body>
</html>

;
transition: 0.5s;
}

.busca {
float: right;
padding: 15px 0;
}

.busca .rotulo {
display: inline;
}

.busca #busca-paciente {
padding: 5px;
}

.invisivel {
display: none;
}

#mensagens-erro-ajax {
color: red;
margin: 10px 0;
}

.item-deletado {
background-color: red;
color: white;
}      paciente.classList.remove(classeInvisivel);
        }
    }


});
Footer
var botaoAdicionar = document.querySelector('#adicionar-paciente');

botaoAdicionar.addEventListener('click', function(event) {
    event.preventDefault();
    var form = document.querySelector('#form-adiciona');
    var paciente = obtemPacienteDoFormulario(form);
    var erros = validaPaciente(paciente);

    if(erros.length) {
        exibeMensagensDeErros(erros);
        return;
    }

    adicionaPacienteNaTabela(paciente);
    form.reset();
    document.querySelector('#mensagens-erro').innerHTML = '';
});

function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector('#tabela-pacientes');
    tabela.appendChild(pacienteTr);
    adicionaFuncaoRemove(tabela);
}

function obtemPacienteDoFormulario(form) {
    return {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    };
}

function montaTr(paciente) {
    var tr = document.createElement('tr');
    tr.classList.add('paciente');
    tr.appendChild(montaTd(paciente.nome, 'nome'));
    tr.appendChild(montaTd(paciente.peso, 'peso'));
    tr.appendChild(montaTd(paciente.altura, 'altura'));
    tr.appendChild(montaTd(paciente.gordura, 'gordura'));
    tr.appendChild(montaTd(paciente.imc, 'imc'));
    return tr;
}

function montaTd(dado, sufixoDaClasse) {
    var td = document.createElement('td');
    td.textContent = dado;
    td.classList.add('info-' + sufixoDaClasse);
    return td;
}

function validaPaciente(paciente) {
    var erros = [];
    if(!paciente.nome) erros.push('Nome não pode estar em branco');
    if(!validaPeso(paciente.peso)) erros.push('Peso inválido');
    if(!validaAltura(paciente.altura)) erros.push('Altura inválida');
    if(!paciente.gordura || paciente.gordura < 1) erros.push('Gordura em branco ou inválida');
    return erros;
}

function exibeMensagensDeErros(erros) {
    var ul = document.querySelector('#mensagens-erro');
    ul.innerHTML = '';
    for(var i = 0; i < erros.length; i++) {
        var li = document.createElement('li');
        li.textContent = erros[i];
        ul.appendChild(li);
    }
}

function adicionaFuncaoRemove(tabela) {
    tabela.addEventListener('dblclick', function(event) {
        // Eventos quando disparados vão subindo aos pais até chegar no body
        // Criado método que adiciona o evento de remoção por duplo clique no
        // pai(table) e setado o alvo filho que será removido
        var alvoDoEvento = event.target; // td
        var paiDoAlvoDoEvento = alvoDoEvento.parentNode; //tr
        paiDoAlvoDoEvento.classList.add('fadeOut'); // adicionando efeito fadeOut na tr
        paiDoAlvoDoEvento.classList.add('item-deletado');
        setTimeout(function() {
            paiDoAlvoDoEvento.remove();
        }, 500);


    });
}
var tabela = document.querySelector('#tabela-pacientes');
adicionaFuncaoRemove(tabela);
/*
for(var i = 0; i < listaDePacientes.length; i++) {
    adicionaFuncaoRemove(listaDePacientes[i]);
}*/
Footer
