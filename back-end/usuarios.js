import express from "express";
import { usuarios } from "./banco.js";

const router = express.Router();

// cadastro de usuário
router.post("/", (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: "Preencha nome e email" });
  }

  const novo = {
    id: Date.now(),
    nome,
    email
  };

  usuarios.push(novo);

  res.status(201).json(novo);
});

export default router;