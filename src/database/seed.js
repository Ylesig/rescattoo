import { conectarBanco } from "./database.js";

async function seed() {

    const db = await conectarBanco();

    await db.exec(`

    DELETE FROM Gato;

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

    VALUES

    (
        'Luna',
        '3 meses',
        'F',
        'Branco',
        'Pequeno',
        'Calma',
        'Disponivel',
        'Vacinada'
    ),

    (
        'Simba',
        '5 meses',
        'M',
        'Laranja',
        'Médio',
        'Brincalhão',
        'Disponivel',
        'Saudável'
    ),

    (
        'Mimi',
        '2 meses',
        'F',
        'Cinza',
        'Pequeno',
        'Carinhosa',
        'Disponivel',
        'Vermifugada'
    );

    `);

    console.log("Dados inseridos!");
}

seed();