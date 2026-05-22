import { conectarBanco } from "./database.js";

async function seed() {

    const db = await conectarBanco();

    await db.run(`
    
    INSERT INTO gatos
    (nome, idade, sexo, foto, cor, status)
    
    VALUES
    
    ('Luna', '3 meses', 'Fêmea', '/gato1.jpg', 'Branco', 'Disponível'),
    
    ('Simba', '5 meses', 'Macho', '/gato2.jpg', 'Preto', 'Disponível'),
    
    ('Mel', '1 ano', 'Fêmea', '/gato3.jpg', 'Cinza', 'Disponível')
    
    `);

    console.log("Dados inseridos ");
}

seed();