import { usuarios } from "../data/banco.js";

export function criar(req, res) {
  const { nome, email } = req.body;

  // validação
  if (!nome || !email) {
    return res.status(400).json({ erro: "Preencha nome e email" });
  }

  const novoUsuario = {
    id: Date.now(),
    nome,
    email
  };

  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
}