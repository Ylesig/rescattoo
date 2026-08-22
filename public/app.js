// ======================================
// CONTROLE DE EDIÇÃO
// ======================================

let idEditando = null;


// ======================================
// MOSTRAR SEÇÕES
// ======================================

window.mostrar = function (id) {

    document
        .querySelectorAll("section")
        .forEach(secao => {
            secao.classList.remove("active");
        });

    document
        .getElementById(id)
        .classList.add("active");
};


// ======================================
// CADASTRO DO USUÁRIO
// ======================================

document
    .getElementById("formUser")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.querySelector(
            "#formUser input[type='email']"
        ).value;

        const regex =
            /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (!regex.test(email)) {

            alert("Digite um Gmail válido!");

            return;
        }

        alert("Cadastro realizado com sucesso!");

        mostrar("gatos");

        carregarGatos();

    });


// ======================================
// LOGIN DO ADMINISTRADOR
// ======================================

document
    .getElementById("formAdmin")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Administrador autenticado!");

        mostrar("painelAdmin");

        carregarGatosAdmin();

    });


// ======================================
// CADASTRAR / EDITAR GATO
// ======================================

document
    .getElementById("formGato")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const gato = {

            nome_gato:
                document.getElementById("nomeGato").value,

            idade:
                document.getElementById("idade").value,

            sexo:
                document.getElementById("sexo").value,

            cor:
                document.getElementById("cor").value,

            porte:
                document.getElementById("porte").value,

            temperamento:
                document.getElementById("temperamento").value,

            status:
                document.getElementById("status").value,

            historico_tratamento:
                document.getElementById("historico").value

        };

        try {

            if (idEditando == null) {

                await fetch("/gatos", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(gato)

                });

                alert("Gato cadastrado!");

            }

            else {

                await fetch(`/gatos/${idEditando}`, {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(gato)

                });

                alert("Gato atualizado!");

                idEditando = null;

            }

            this.reset();

            carregarGatosAdmin();

        }

        catch (erro) {

            console.error(erro);

            alert("Erro ao salvar gato.");

        }

    });


// ======================================
// CARREGAR GATOS (ADOÇÃO)
// ======================================

async function carregarGatos() {

    try {

        const resposta = await fetch("/gatos");

        const gatos = await resposta.json();

        const lista =
            document.getElementById("lista");

        lista.innerHTML = "";

        gatos.forEach((gato, index) => {

            const imagem =
                index < 3
                    ? `gato${index + 1}.jpg`
                    : "placeholder.jpg";

            lista.innerHTML += `

                <div class="card">

                    <img
                        src="${imagem}"
                        alt="Gato">

                    <h3>
                        ${gato.nome_gato}
                    </h3>

                    <p>
                        ${gato.idade} • ${gato.sexo}
                    </p>

                    <p>
                        ${gato.cor}
                    </p>

                    <button
                        onclick="escolherGato(${gato.id_gato}, '${imagem}')">

                        Adotar

                    </button>

                </div>

            `;

        });

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao carregar gatos.");

    }

}


// ======================================
// CARREGAR GATOS (ADMINISTRADOR)
// ======================================

async function carregarGatosAdmin() {

    try {

        const resposta = await fetch("/gatos");

        const gatos = await resposta.json();

        const lista =
            document.getElementById("listaAdmin");

        lista.innerHTML = "";

        gatos.forEach((gato, index) => {

            const imagem =
                index < 3
                    ? `gato${index + 1}.jpg`
                    : "placeholder.jpg";

            lista.innerHTML += `

                <div class="card">

                    <img
                        src="${imagem}"
                        alt="Gato">

                    <h3>
                        ${gato.nome_gato}
                    </h3>

                    <p>
                        <strong>Idade:</strong>
                        ${gato.idade}
                    </p>

                    <p>
                        <strong>Sexo:</strong>
                        ${gato.sexo}
                    </p>

                    <p>
                        <strong>Cor:</strong>
                        ${gato.cor}
                    </p>

                    <br>

                    <button
                        onclick="editar(${gato.id_gato})">

                        Editar

                    </button>

                    <button
                        style="background:#d9534f;margin-left:10px"
                        onclick="excluir(${gato.id_gato})">

                        Excluir

                    </button>

                </div>

            `;

        });

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao carregar gatos.");

    }

}


// ======================================
// EDITAR GATO
// ======================================

window.editar = async function (id) {

    try {

        const resposta =
            await fetch(`/gatos/${id}`);

        const gato =
            await resposta.json();

        idEditando = id;

        document.getElementById("editarNome").value =
            gato.nome_gato;

        document.getElementById("editarIdade").value =
            gato.idade;

        document.getElementById("editarSexo").value =
            gato.sexo;

        document.getElementById("editarCor").value =
            gato.cor;

        document.getElementById("editarPorte").value =
            gato.porte;

        document.getElementById("editarTemperamento").value =
            gato.temperamento || "";

        document.getElementById("editarStatus").value =
            gato.status;

        document.getElementById("editarHistorico").value =
            gato.historico_tratamento || "";

        mostrar("editarGato");

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao buscar gato.");

    }

};


// ======================================
// EXCLUIR GATO
// ======================================

window.excluir = async function (id) {

    const confirmar = confirm(
        "Deseja realmente excluir este gato?"
    );

    if (!confirmar) return;

    try {

        await fetch(`/gatos/${id}`, {

            method: "DELETE"

        });

        alert("Gato excluído com sucesso!");

        carregarGatosAdmin();

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao excluir gato.");

    }

};


// ======================================
// ESCOLHER GATO
// ======================================

window.escolherGato = async function (id, imagem) {

    try {

        const resposta =
            await fetch(`/gatos/${id}`);

        const gato =
            await resposta.json();

        document
            .getElementById("imgGato")
            .src = imagem;

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

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao carregar o gato.");

    }

};


// ======================================
// FORMULÁRIO DE ADOÇÃO
// ======================================

document
    .getElementById("formAdocao")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Solicitação enviada com sucesso!");

        mostrar("gatos");

    });


// ======================================
// CARREGAR GATOS AO ABRIR A PÁGINA
// ======================================

window.onload = function () {

    carregarGatos();

};


// ======================================
// FORMULÁRIO DE EDIÇÃO
// ======================================

document
    .getElementById("formEditarGato")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const gato = {

            nome_gato:
                document.getElementById("editarNome").value,

            idade:
                document.getElementById("editarIdade").value,

            sexo:
                document.getElementById("editarSexo").value,

            cor:
                document.getElementById("editarCor").value,

            porte:
                document.getElementById("editarPorte").value,

            temperamento:
                document.getElementById("editarTemperamento").value,

            status:
                document.getElementById("editarStatus").value,

            historico_tratamento:
                document.getElementById("editarHistorico").value

        };

        await fetch(`/gatos/${idEditando}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(gato)

        });

        alert("Gato atualizado com sucesso!");

        idEditando = null;

        this.reset();

        mostrar("painelAdmin");

        carregarGatosAdmin();

        carregarGatos();

    });