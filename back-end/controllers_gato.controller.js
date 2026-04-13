import { gatos } from "../data/banco.js";

export function listar(req, res) {
  res.json(gatos);
}

export function buscar(req, res) {
  const gato = gatos.find(g => g.id == req.params.id);

  if (!gato) {
    return res.status(404).json({ erro: "Gato não encontrado" });
  }

  res.json(gato);
}