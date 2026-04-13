import express from "express";
import gatosRoutes from "./routes/gatos.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import adocoesRoutes from "./routes/adocoes.routes.js";

const app = express();

// permite JSON
app.use(express.json());

// rotas da API
app.use("/gatos", gatosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/adocoes", adocoesRoutes);

export default app;