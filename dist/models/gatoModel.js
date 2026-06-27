import { conectarBanco } from "../database/database.js";
export async function listarGatos() {
    const db = await conectarBanco();
    return await db.all("SELECT * FROM Gato");
}
export async function buscarGato(id) {
    const db = await conectarBanco();
    return await db.get("SELECT * FROM Gato WHERE id_gato = ?", [id]);
}
export async function criarGato(gato) {
    const db = await conectarBanco();
    return await db.run(`
    INSERT INTO Gato
    (
      nome_gato,
      idade,
      sexo,
      cor,
      porte,
      temperamento,
      status,
      historico_tratamento
    )

    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        gato.nome_gato,
        gato.idade,
        gato.sexo,
        gato.cor,
        gato.porte,
        gato.temperamento,
        gato.status,
        gato.historico_tratamento
    ]);
}
export async function atualizarGato(id, gato) {
    const db = await conectarBanco();
    return await db.run(`
    UPDATE Gato

    SET
      nome_gato = ?,
      idade = ?,
      sexo = ?,
      cor = ?,
      porte = ?,
      temperamento = ?,
      status = ?,
      historico_tratamento = ?

    WHERE id_gato = ?
    `, [
        gato.nome_gato,
        gato.idade,
        gato.sexo,
        gato.cor,
        gato.porte,
        gato.temperamento,
        gato.status,
        gato.historico_tratamento,
        id
    ]);
}
export async function deletarGato(id) {
    const db = await conectarBanco();
    return await db.run("DELETE FROM Gato WHERE id_gato = ?", [id]);
}
