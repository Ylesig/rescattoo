import { conectarBanco } from "./database.js";

async function migration() {

    const db = await conectarBanco();

    await db.exec(`

    CREATE TABLE IF NOT EXISTS Usuario (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,

        nome VARCHAR(200) NOT NULL,

        endereco VARCHAR(200) NOT NULL,

        contato VARCHAR(100) NOT NULL UNIQUE,

        perfil VARCHAR(50) NOT NULL
        CHECK (
            perfil IN (
                'adotante',
                'voluntario',
                'doador',
                'ONG',
                'veterinario',
                'administrador'
            )
        )
    );

    CREATE TABLE IF NOT EXISTS Comunicacao (
        id_comunicacao INTEGER PRIMARY KEY AUTOINCREMENT,

        descricao_comunicacao VARCHAR(1000) NOT NULL,

        data_hora_envio DATETIME NOT NULL,

        tipo_comunicacao VARCHAR(20) NOT NULL
        CHECK (
            tipo_comunicacao IN (
                'mensagem',
                'notificacao',
                'alerta'
            )
        ),

        id_user INTEGER NOT NULL,

        FOREIGN KEY (id_user)
        REFERENCES Usuario(id_usuario)
    );

    CREATE TABLE IF NOT EXISTS Gato (
        id_gato INTEGER PRIMARY KEY AUTOINCREMENT,

        nome_gato VARCHAR(20) NOT NULL,

        idade VARCHAR(10) NOT NULL,

        sexo VARCHAR(10) NOT NULL
        CHECK (sexo IN ('M', 'F')),

        cor VARCHAR(20) NOT NULL,

        porte VARCHAR(10) NOT NULL
        CHECK (
            porte IN (
                'Pequeno',
                'Médio',
                'Grande'
            )
        ),

        temperamento VARCHAR(50),

        status VARCHAR(30) NOT NULL
        CHECK (
            status IN (
                'Disponivel',
                'Adotado',
                'Tratamento',
                'Resgatado',
                'Em Processo de Adocao'
            )
        ),

        historico_tratamento VARCHAR(200)
    );

    CREATE TABLE IF NOT EXISTS Solicitacao_de_adocao (
        id_solicitacao INTEGER PRIMARY KEY AUTOINCREMENT,

        status VARCHAR(10) NOT NULL
        CHECK (
            status IN (
                'Pendente',
                'Aprovado',
                'Recusado'
            )
        ),

        data_solicitacao DATE NOT NULL,

        id_user INTEGER NOT NULL,

        id_cat INTEGER NOT NULL,

        FOREIGN KEY (id_user)
        REFERENCES Usuario(id_usuario),

        FOREIGN KEY (id_cat)
        REFERENCES Gato(id_gato)
    );

    CREATE TABLE IF NOT EXISTS Midia (
        id_midia INTEGER PRIMARY KEY AUTOINCREMENT,

        tipo_midia VARCHAR(10) NOT NULL
        CHECK (
            tipo_midia IN (
                'foto',
                'video'
            )
        ),

        data_upload DATE NOT NULL,

        id_cat INTEGER NOT NULL,

        FOREIGN KEY (id_cat)
        REFERENCES Gato(id_gato)
    );

    CREATE TABLE IF NOT EXISTS Adocao (
        id_adocao INTEGER PRIMARY KEY AUTOINCREMENT,

        data_confirmacao DATE NOT NULL,

        id_user INTEGER NOT NULL,

        id_cat INTEGER NOT NULL,

        FOREIGN KEY (id_user)
        REFERENCES Usuario(id_usuario),

        FOREIGN KEY (id_cat)
        REFERENCES Gato(id_gato)
    );

    CREATE TABLE IF NOT EXISTS Campanha (
        id_campanha INTEGER PRIMARY KEY AUTOINCREMENT,

        nome_campanha VARCHAR(20) NOT NULL,

        meta_arrecadacao DECIMAL(10,2) NOT NULL,

        status_campanha VARCHAR(50) NOT NULL
        CHECK (
            status_campanha IN (
                'Ativa',
                'Encerrada',
                'Atingida'
            )
        ),

        data_inicio DATE NOT NULL,

        data_fim DATE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Doacao (
        id_doacao INTEGER PRIMARY KEY AUTOINCREMENT,

        tipo_doacao VARCHAR(20) NOT NULL
        CHECK (
            tipo_doacao IN (
                'dinheiro',
                'racao',
                'medicamento'
            )
        ),

        valor DECIMAL(10,2),

        data_doacao DATE NOT NULL,

        id_user INTEGER NOT NULL,

        id_camp INTEGER NOT NULL,

        FOREIGN KEY (id_user)
        REFERENCES Usuario(id_usuario),

        FOREIGN KEY (id_camp)
        REFERENCES Campanha(id_campanha)
    );

    `);

    console.log("Banco criado com sucesso!");
}

migration();