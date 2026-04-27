const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
const path = require("path");

app.use(express.static(path.join(__dirname, "../public")));
const PORT = 3000;

// ARRAY TEMPORÁRIO
let gatos = [
 { id:1, nome:"Luna", idade:"3 meses", sexo:"Fêmea", foto:"https://probable-bassoon-9749jjr59rgphwvj-3000.app.github.dev/gato1.jpg"},
 { id:2, nome:"Simba", idade:"5 meses", sexo:"Macho", foto:"https://probable-bassoon-9749jjr59rgphwvj-3000.app.github.dev/gato2.jpg"},
 { id:3, nome:"Mel", idade:"1 ano", sexo:"Fêmea", foto:"https://probable-bassoon-9749jjr59rgphwvj-3000.app.github.dev/gato3.jpg"}
];

// GET TODOS
app.get("/gatos", (req,res)=>{
    res.status(200).json(gatos);
});

// GET POR ID
app.get("/gatos/:id", (req,res)=>{
    const id = Number(req.params.id);
    const gato = gatos.find(g=>g.id===id);

    if(!gato){
        return res.status(404).json({erro:"Gato não encontrado"});
    }

    res.json(gato);
});

// POST
app.post("/gatos",(req,res)=>{
    const {nome,idade,sexo,foto} = req.body;

    if(!nome || !idade || !sexo){
        return res.status(400).json({erro:"Dados obrigatórios"});
    }

    const novo = {
        id: gatos.length + 1,
        nome,
        idade,
        sexo,
        foto
    };

    gatos.push(novo);

    res.status(201).json(novo);
});

// PUT
app.put("/gatos/:id",(req,res)=>{
    const id = Number(req.params.id);
    const gato = gatos.find(g=>g.id===id);

    if(!gato){
        return res.status(404).json({erro:"Gato não encontrado"});
    }

    gato.nome = req.body.nome || gato.nome;
    gato.idade = req.body.idade || gato.idade;
    gato.sexo = req.body.sexo || gato.sexo;
    gato.foto = req.body.foto || gato.foto;

    res.json(gato);
});

// DELETE
app.delete("/gatos/:id",(req,res)=>{
    const id = Number(req.params.id);

    gatos = gatos.filter(g=>g.id !== id);

    res.status(204).send();
});

app.listen(PORT, ()=>{
    console.log(`Servidor rodando http://localhost:${PORT}`);
});