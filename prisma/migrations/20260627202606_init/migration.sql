-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "perfil" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Gato" (
    "id_gato" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_gato" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "porte" TEXT NOT NULL,
    "temperamento" TEXT,
    "status" TEXT NOT NULL,
    "historico_tratamento" TEXT
);

-- CreateTable
CREATE TABLE "Comunicacao" (
    "id_comunicacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao_comunicacao" TEXT NOT NULL,
    "data_hora_envio" DATETIME NOT NULL,
    "tipo_comunicacao" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,
    CONSTRAINT "Comunicacao_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Solicitacao_de_adocao" (
    "id_solicitacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "data_solicitacao" DATETIME NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_cat" INTEGER NOT NULL,
    CONSTRAINT "Solicitacao_de_adocao_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Solicitacao_de_adocao_id_cat_fkey" FOREIGN KEY ("id_cat") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Midia" (
    "id_midia" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo_midia" TEXT NOT NULL,
    "data_upload" DATETIME NOT NULL,
    "id_cat" INTEGER NOT NULL,
    CONSTRAINT "Midia_id_cat_fkey" FOREIGN KEY ("id_cat") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Adocao" (
    "id_adocao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data_confirmacao" DATETIME NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_cat" INTEGER NOT NULL,
    CONSTRAINT "Adocao_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Adocao_id_cat_fkey" FOREIGN KEY ("id_cat") REFERENCES "Gato" ("id_gato") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Campanha" (
    "id_campanha" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_campanha" TEXT NOT NULL,
    "meta_arrecadacao" REAL NOT NULL,
    "status_campanha" TEXT NOT NULL,
    "data_inicio" DATETIME NOT NULL,
    "data_fim" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Doacao" (
    "id_doacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo_doacao" TEXT NOT NULL,
    "valor" REAL,
    "data_doacao" DATETIME NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_camp" INTEGER NOT NULL,
    CONSTRAINT "Doacao_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Doacao_id_camp_fkey" FOREIGN KEY ("id_camp") REFERENCES "Campanha" ("id_campanha") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_contato_key" ON "Usuario"("contato");
