import express from "express";
import { gatos } from "./banco.js";

const router = express.Router();

// listar gatos
router.get("/", (req, res) => {
  res.json(gatos);
});

// buscar por id
router.get("/:id", (req, res) => {
  const gato = gatos.find(g => g.id == req.params.id);

  if (!gato) {
    return res.status(404).json({ erro: "Gato não encontrado" });
  }

  res.json(gato);
});

export default router;