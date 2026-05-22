import { conectarBanco } from "./database.js";

async function migration() {

    const db = await conectarBanco();

    await db.exec(`
    
    CREATE TABLE IF NOT EXISTS gatos (
    
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        
        nome TEXT NOT NULL,
        
        idade TEXT NOT NULL,
        
        sexo TEXT NOT NULL,
        
        foto TEXT,
        
        cor TEXT,
        
        status TEXT
        
    )
    
    `);

    console.log("Tabela criada ");
}

migration();