window.mostrar = function(id){
document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
document.getElementById(id).classList.add("active");
};

// CADASTRO USUÁRIO
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

// CARREGAR GATOS DA API
async function carregarGatos(){

const resposta = await fetch("http://localhost:3000/gatos");

const gatos = await resposta.json();

const lista = document.getElementById("lista");

lista.innerHTML = "";

gatos.forEach(g => {

lista.innerHTML += `
<div class="card">
<img src="${g.foto}">
<h3>${g.nome}</h3>
<p>${g.idade} • ${g.sexo}</p>
<button onclick="escolherGato(${g.id})">Adotar</button>
</div>
`;

});

}

// ESCOLHER GATO
window.escolherGato = async function(id){

const resposta = await fetch(`http://localhost:3000/gatos/${id}`);

const gato = await resposta.json();

document.getElementById("nomeGato").innerText = gato.nome;
document.getElementById("idadeGato").innerText = gato.idade;
document.getElementById("sexoGato").innerText = gato.sexo;

mostrar("adocao");

};

// FORMULÁRIO ADOÇÃO
document.getElementById("formAdocao").addEventListener("submit", e=>{
e.preventDefault();

alert("Solicitação enviada 🐱");

mostrar("gatos");
});