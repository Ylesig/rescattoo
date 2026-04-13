import express from "express";
import gatosRoutes from "./gatos.js";
import usuariosRoutes from "./usuarios.js";
import adocoesRoutes from "./adocoes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// rotas
app.use("/gatos", gatosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/adocoes", adocoesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});