import express from "express";

import {
  cadastrarUsuario,
  loginUsuario,
  obterPerfil
} from "../controllers/authController.js";
import { autenticar } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Cadastro
router.post("/auth/register", cadastrarUsuario);

// Login
router.post("/auth/login", loginUsuario);

router.get("/auth/perfil", autenticar, obterPerfil);

export default router;