import express from "express";
import cors from "cors";
import morgan from "morgan";

import gatoRoutes from "./routes/gatoRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use(express.static("public"));

// Rotas de autenticação
app.use(authRoutes);

// Rotas de gatos
app.use(gatoRoutes);

const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});