import express from "express";
import { gatos } from "./data.js";

const router = express.Router();


// GET TODOS
router.get("/gatos", (req, res) => {
    res.status(200).json(gatos);
});


// GET POR ID
router.get("/gatos/:id", (req, res) => {

    const id = Number(req.params.id);

    const gato = gatos.find(g => g.id === id);

    if (!gato) {
        return res.status(404).json({
            erro: "Gato não encontrado"
        });
    }

    res.json(gato);
});


// POST
router.post("/gatos", (req, res) => {

    const { nome, idade, sexo, foto } = req.body;

    if (!nome || !idade || !sexo) {
        return res.status(400).json({
            erro: "Dados obrigatórios"
        });
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
router.put("/gatos/:id", (req, res) => {

    const id = Number(req.params.id);

    const gato = gatos.find(g => g.id === id);

    if (!gato) {
        return res.status(404).json({
            erro: "Gato não encontrado"
        });
    }

    gato.nome = req.body.nome || gato.nome;
    gato.idade = req.body.idade || gato.idade;
    gato.sexo = req.body.sexo || gato.sexo;
    gato.foto = req.body.foto || gato.foto;

    res.json(gato);
});


// DELETE
router.delete("/gatos/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = gatos.findIndex(g => g.id === id);

    if (index === -1) {
        return res.status(404).json({
            erro: "Gato não encontrado"
        });
    }

    gatos.splice(index, 1);

    res.status(204).send();
});

export default router;