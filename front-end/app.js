import { gatos } from "./dados.js";

window.mostrar = function(id){
document.querySelectorAll("section").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
};

document.getElementById("formUser").addEventListener("submit", e=>{
e.preventDefault();

const email = document.querySelector("#formUser input[type='email']").value;
const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

if(!regex.test(email)){
alert("Digite um Gmail válido 😤");
return;
}

alert("Cadastro realizado!");
mostrar("gatos");
carregarGatos();
});

function carregarGatos(){
const lista = document.getElementById("lista");
lista.innerHTML="";

gatos.forEach(g=>{
lista.innerHTML+=`
<div class="card">
<img src="${g.foto}">
<h3>${g.nome}</h3>
<p>${g.idade} • ${g.sexo}</p>
<button onclick="escolherGato(${g.id})">Adotar</button>
</div>`;
});
}

window.escolherGato = function(id){
const gato = gatos.find(g=>g.id===id);

document.getElementById("imgGato").src = gato.foto;
document.getElementById("nomeGato").innerText = gato.nome;
document.getElementById("idadeGato").innerText = gato.idade;
document.getElementById("sexoGato").innerText = gato.sexo;

mostrar("adocao");
};

document.getElementById("formAdocao").addEventListener("submit", e=>{
e.preventDefault();
alert("Solicitação enviada 🐱");
mostrar("gatos");
});