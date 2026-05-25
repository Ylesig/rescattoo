// MOSTRAR SEÇÕES
window.mostrar = function(id) {

    document
        .querySelectorAll("section")
        .forEach(secao => {
            secao.classList.remove("active");
        });

    document
        .getElementById(id)
        .classList.add("active");
};


// CADASTRO
document
    .getElementById("formUser")
    .addEventListener("submit", async function(e) {

        e.preventDefault();

        const email = document.querySelector(
            "#formUser input[type='email']"
        ).value;

        const regex =
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (!regex.test(email)) {

            alert("Digite um Gmail válido 😤");

            return;
        }

        alert("Cadastro realizado!");

        mostrar("gatos");

        carregarGatos();
    });


// CARREGAR GATOS
async function carregarGatos() {

    try {

        const resposta = await fetch("/gatos");

        const gatos = await resposta.json();

        const lista =
        document.getElementById("lista");

        lista.innerHTML = "";

        gatos.forEach((gato, index) => {

            lista.innerHTML += `

            <div class="card">

                <img
                src="gato${index + 1}.jpg"
                alt="Gato">

                <h3>${gato.nome_gato}</h3>

                <p>
                    ${gato.idade} • ${gato.sexo}
                </p>

                <p>
                    ${gato.cor}
                </p>

                <button
                onclick="escolherGato(${gato.id_gato}, ${index + 1})">

                    Adotar

                </button>

            </div>

            `;
        });

    } catch (erro) {

        alert("Erro ao carregar gatos 😢");

        console.error(erro);
    }
}


// ESCOLHER GATO
window.escolherGato = async function(id, imagem) {

    try {

        const resposta =
        await fetch(`/gatos/${id}`);

        const gato =
        await resposta.json();

        document
            .getElementById("imgGato")
            .src = `gato${imagem}.jpg`;

        document
            .getElementById("nomeGato")
            .innerText = gato.nome_gato;

        document
            .getElementById("idadeGato")
            .innerText = gato.idade;

        document
            .getElementById("sexoGato")
            .innerText = gato.sexo;

        mostrar("adocao");

    } catch (erro) {

        alert("Erro ao carregar gato 😢");

        console.error(erro);
    }
};


// FORMULÁRIO ADOÇÃO
document
    .getElementById("formAdocao")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        alert("Solicitação enviada 🐱");

        mostrar("gatos");
    });