// CARREGAR GATOS
async function carregarGatos(){
    try{
        const resposta = await fetch("https://probable-bassoon-9749jjr59rgphwvj-3000.app.github.dev/gatos");
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

    } catch(erro){
        alert("Erro ao carregar gatos 😢");
    }
}

// ESCOLHER GATO
window.escolherGato = async function(id){
    try{
        const resposta = await fetch(`https://probable-bassoon-9749jjr59rgphwvj-3000.app.github.dev/gatos/${id}`);
        const gato = await resposta.json();

        document.getElementById("fotoGato").src = gato.foto;
        document.getElementById("nomeGato").innerText = gato.nome;
        document.getElementById("idadeGato").innerText = gato.idade;
        document.getElementById("sexoGato").innerText = gato.sexo;

        mostrar("adocao");

    } catch(erro){
        alert("Erro ao carregar gato 😢");
    }
};