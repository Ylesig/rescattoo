import express from "express";
import { adocoes, gatos } from "./banco.js";

const router = express.Router();

// solicitar adoção
router.post("/", (req, res) => {
  const { id_gato, nome } = req.body;

  const gato = gatos.find(g => g.id == id_gato);

  if (!gato) {
    return res.status(404).json({ erro: "Gato não encontrado" });
  }

  // regra do projeto
  gato.status = "Em processo de adoção";

  const nova = {
    id: Date.now(),
    id_gato,
    nome,
    status: "Em análise",
    data: new Date()
  };

  adocoes.push(nova);

  res.status(201).json(nova);
});

export default router;