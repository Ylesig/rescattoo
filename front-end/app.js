const API_URL = "https://glorious-space-succotash-q7gqppj4qrq7cx6vj-3000.app.github.dev";

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

try{
const resposta = await fetch(`${API_URL}/gatos`);

if(!resposta.ok){
throw new Error("Erro ao buscar gatos");
}

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

}catch(erro){
console.error(erro);
alert("Erro ao carregar gatos 😢 (verifique o backend)");
}

}

// ESCOLHER GATO
window.escolherGato = async function(id){

try{
const resposta = await fetch(`${API_URL}/gatos/${id}`);

if(!resposta.ok){
throw new Error("Erro ao buscar gato");
}

const gato = await resposta.json();

document.getElementById("nomeGato").innerText = gato.nome;
document.getElementById("idadeGato").innerText = gato.idade;
document.getElementById("sexoGato").innerText = gato.sexo;
document.getElementById("fotoGato").src = gato.foto;

mostrar("adocao");

}catch(erro){
console.error(erro);
alert("Erro ao carregar dados do gato 😢");
}

};

// FORMULÁRIO ADOÇÃO
document.getElementById("formAdocao").addEventListener("submit", e=>{
e.preventDefault();

alert("Solicitação enviada 🐱");
mostrar("gatos");
});