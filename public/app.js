// ======================================
// CONTROLE DE EDIÇÃO
// ======================================

let idEditando = null;

const token = () => localStorage.getItem("rescatto_token");

function limparSessao() {
    localStorage.removeItem("rescatto_token");
    localStorage.removeItem("rescatto_usuario");
    atualizarEstadoAutenticacao(null);
}

function cabecalhoAutenticado() {
    return token() ? { Authorization: `Bearer ${token()}` } : {};
}

async function validarSessao() {
    const resposta = await fetch("/auth/perfil", {
        headers: cabecalhoAutenticado(),
        cache: "no-store"
    });

    if (!resposta.ok) {
        throw new Error(await mensagemErro(resposta, "Sessão inválida."));
    }

    return resposta.json();
}

function atualizarEstadoAutenticacao(usuario) {
    document.getElementById("usuarioLogado").textContent = usuario ? `Olá, ${usuario.nome}` : "";
    document.getElementById("usuarioLogado").style.display = usuario ? "block" : "none";
    document.getElementById("linkLogin").style.display = usuario ? "none" : "block";
    document.getElementById("linkLogout").style.display = usuario ? "block" : "none";
}

function mostrarMensagem(id, mensagem) {
    const elemento = document.getElementById(id);
    elemento.textContent = mensagem;
    elemento.hidden = !mensagem;
}

async function mensagemErro(resposta, padrao) {
    try {
        const dados = await resposta.json();
        return dados.erro || padrao;
    } catch {
        return padrao;
    }
}

window.logout = function () {
    limparSessao();
    document.getElementById("formCadastro").reset();
    document.querySelectorAll("[data-formulario]").forEach(item => item.classList.remove("ativa"));
    document.querySelector("[data-formulario='usuario']").classList.add("ativa");
    document.getElementById("campoChaveAdmin").hidden = true;
    document.getElementById("cadastroChave").required = false;
    mostrar("inicio");
};

window.mostrar = function (id) {
    const areasProtegidas = ["gatos", "adocao", "painelAdmin", "editarGato"];
    if (areasProtegidas.includes(id) && !token()) {
        mostrarMensagem("erroLogin", "Cadastre-se e faça login para acessar os gatos e os processos de adoção.");
        id = "login";
    }

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
// CADASTRO DE USUÁRIO OU ADMINISTRADOR
// ======================================

document
    .querySelectorAll("[data-formulario]")
    .forEach(aba => aba.addEventListener("click", function () {
        document.querySelectorAll("[data-formulario]").forEach(item => item.classList.remove("ativa"));
        this.classList.add("ativa");
        const isAdmin = this.dataset.formulario === "admin";
        document.getElementById("campoChaveAdmin").hidden = !isAdmin;
        document.getElementById("cadastroChave").required = isAdmin;
    }));

document
    .getElementById("formCadastro")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        mostrarMensagem("erroCadastro", "");

        const perfil = document.querySelector("[data-formulario].ativa").dataset.formulario;
        const contato = document.getElementById("cadastroContato").value.trim();
        const senha = document.getElementById("cadastroSenha").value;
        const emailValido = /^(?!.*\.\.)[a-z0-9](?:[a-z0-9._%+-]*[a-z0-9])?@gmail\.com$/i.test(contato);
        const senhaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,72}$/.test(senha);

        if (!emailValido) {
            mostrarMensagem("erroCadastro", "Informe um e-mail Gmail válido, como nome@gmail.com.");
            return;
        }
        if (!senhaValida) {
            mostrarMensagem("erroCadastro", "A senha deve ter de 8 a 72 caracteres, com maiúscula, minúscula e número.");
            return;
        }
        const headers = { "Content-Type": "application/json" };
        if (perfil === "admin") {
            headers["X-Admin-Key"] = document.getElementById("cadastroChave").value;
        }

        const resposta = await fetch("/auth/register", {
            method: "POST",
            headers,
            body: JSON.stringify({
                nome: document.getElementById("cadastroNome").value,
                contato,
                senha,
                endereco: document.getElementById("cadastroEndereco").value,
                perfil
            })
        });

        if (!resposta.ok) {
            mostrarMensagem("erroCadastro", await mensagemErro(resposta, "Não foi possível criar a conta."));
            return;
        }

        await resposta.json();
        this.reset();
        document.querySelectorAll("[data-login-perfil]").forEach(item => item.classList.remove("ativa"));
        document.querySelector(`[data-login-perfil='${perfil}']`).classList.add("ativa");
        document.getElementById("loginContato").value = contato;
        mostrarMensagem("erroLogin", `${perfil === "admin" ? "Administrador" : "Usuário"} cadastrado. Faça login para acessar os gatos.`);
        mostrar("login");
    });


// ======================================
// LOGIN DE USUÁRIO OU ADMINISTRADOR
// ======================================

document
    .querySelectorAll("[data-login-perfil]")
    .forEach(aba => aba.addEventListener("click", function () {
        document.querySelectorAll("[data-login-perfil]").forEach(item => item.classList.remove("ativa"));
        this.classList.add("ativa");
    }));

document
    .getElementById("formLogin")
    .addEventListener("submit", async function (e) {
        e.preventDefault();

        const perfil = document.querySelector("[data-login-perfil].ativa").dataset.loginPerfil;
        const contato = document.getElementById("loginContato").value.trim();
        const senha = document.getElementById("loginSenha").value;

        mostrarMensagem("erroLogin", "");
        if (!/^(?!.*\.\.)[a-z0-9](?:[a-z0-9._%+-]*[a-z0-9])?@gmail\.com$/i.test(contato)) {
            mostrarMensagem("erroLogin", "Informe um e-mail Gmail válido, como nome@gmail.com.");
            return;
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,72}$/.test(senha)) {
            mostrarMensagem("erroLogin", "A senha deve ter de 8 a 72 caracteres, com maiúscula, minúscula e número.");
            return;
        }

        const resposta = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contato,
                senha,
                perfil
            })
        });

        if (!resposta.ok) {
            mostrarMensagem("erroLogin", await mensagemErro(resposta, "E-mail ou senha incorretos."));
            return;
        }

        const dados = await resposta.json();
        localStorage.setItem("rescatto_token", dados.token);
        localStorage.setItem("rescatto_usuario", JSON.stringify(dados.usuario));
        atualizarEstadoAutenticacao(dados.usuario);
        this.reset();
        try {
            await validarSessao();
            mostrar(dados.usuario.perfil === "admin" ? "painelAdmin" : "gatos");
            await carregarGatos();
        } catch (erro) {
            limparSessao();
            mostrarMensagem("erroLogin", "Login realizado, mas a sessão não foi validada. Reinicie o servidor e tente novamente.");
        }
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

                const resposta = await fetch("/gatos", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        ...cabecalhoAutenticado()
                    },

                    body: JSON.stringify(gato)

                });

                if (!resposta.ok) throw new Error(await mensagemErro(resposta, "Não foi possível cadastrar o gato."));

            }

            else {

                const resposta = await fetch(`/gatos/${idEditando}`, {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        ...cabecalhoAutenticado()
                    },

                    body: JSON.stringify(gato)

                });

                if (!resposta.ok) throw new Error(await mensagemErro(resposta, "Não foi possível atualizar o gato."));

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

    if (!token()) return;

    try {

        const resposta = await fetch("/gatos", {
            headers: cabecalhoAutenticado(),
            cache: "no-store"
        });

        if (resposta.status === 401) {
            limparSessao();
            mostrar("login");
            mostrarMensagem("erroLogin", "Sua sessão expirou. Faça login novamente para acessar os gatos.");
            return;
        }

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

                    <img src="${imagem}" alt="Gato">

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

    if (!token()) return;

    try {

        const resposta = await fetch("/gatos");

        if (resposta.status === 401) {
            logout();
            return;
        }

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
            await fetch(`/gatos/${id}`, { headers: cabecalhoAutenticado() });

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

            method: "DELETE",
            headers: cabecalhoAutenticado()

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
            await fetch(`/gatos/${id}`, {
                headers: cabecalhoAutenticado()
            });

        const gato =
            await resposta.json();

        document
            .getElementById("imgGato")
            .src = imagem;

        document
            .getElementById("nomeGatoAdocao")
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

    const usuario = localStorage.getItem("rescatto_usuario");
    atualizarEstadoAutenticacao(usuario ? JSON.parse(usuario) : null);
    const tokenAtual = token();
    if (!tokenAtual) return;

    fetch("/auth/perfil", { headers: cabecalhoAutenticado() })
        .then(resposta => {
            if (!resposta.ok) throw new Error("Sessão inválida");
            return resposta.json();
        })
        .then(dados => {
            localStorage.setItem("rescatto_usuario", JSON.stringify(dados.usuario));
            atualizarEstadoAutenticacao(dados.usuario);
            carregarGatos();
        })
        .catch(() => {
            limparSessao();
        });

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

        const resposta = await fetch(`/gatos/${idEditando}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",
                ...cabecalhoAutenticado()

            },

            body: JSON.stringify(gato)

        });

        if (!resposta.ok) {
            alert(await mensagemErro(resposta, "Não foi possível atualizar o gato."));
            return;
        }

        alert("Gato atualizado com sucesso!");

        idEditando = null;

        this.reset();

        mostrar("painelAdmin");

        carregarGatosAdmin();

        carregarGatos();

    });