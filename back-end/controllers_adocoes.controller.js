import { adocoes, gatos } from "../data/banco.js";

export function solicitar(req, res) {
  const { id_gato, nome } = req.body;

  // verifica se gato existe
  const gato = gatos.find(g => g.id == id_gato);

  if (!gato) {
    return res.status(404).json({ erro: "Gato não encontrado" });
  }

  // REGRA DO PROJETO:
  // muda status automaticamente
  gato.status = "Em processo de adoção";

  const novaAdocao = {
    id: Date.now(),
    id_gato,
    nome,
    status: "Em análise",
    data: new Date()
  };

  adocoes.push(novaAdocao);

  res.status(201).json(novaAdocao);
}