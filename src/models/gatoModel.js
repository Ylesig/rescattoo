import { conectarBanco } from "../database/database.js";

export async function listarGatos() {

    const db = await conectarBanco();

    return await db.all("SELECT * FROM gatos");
}


export async function buscarGato(id) {

    const db = await conectarBanco();

    return await db.get(
        "SELECT * FROM gatos WHERE id = ?",
        [id]
    );
}


export async function criarGato(gato) {

    const db = await conectarBanco();

    const { nome, idade, sexo, foto } = gato;

    return await db.run(

        `
        INSERT INTO gatos
        (nome, idade, sexo, foto)

        VALUES (?, ?, ?, ?)
        `,

        [nome, idade, sexo, foto]
    );
}


export async function atualizarGato(id, gato) {

    const db = await conectarBanco();

    const { nome, idade, sexo, foto } = gato;

    return await db.run(

        `
        UPDATE gatos

        SET
        nome = ?,
        idade = ?,
        sexo = ?,
        foto = ?

        WHERE id = ?
        `,

        [nome, idade, sexo, foto, id]
    );
}


export async function deletarGato(id) {

    const db = await conectarBanco();

    return await db.run(
        "DELETE FROM gatos WHERE id = ?",
        [id]
    );
}