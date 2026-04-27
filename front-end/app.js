window.escolherGato = async function(id){

    try{
        const resposta = await fetch(`http://localhost:3000/gatos/${id}`);
        const gato = await resposta.json();

        document.getElementById("fotoGato").src = gato.foto;
        document.getElementById("nomeGato").innerText = gato.nome;
        document.getElementById("idadeGato").innerText = gato.idade;
        document.getElementById("sexoGato").innerText = gato.sexo;

        mostrar("adocao");

    } catch(erro){
        alert("Erro ao carregar gato 😢");
        console.error(erro);
    }
};