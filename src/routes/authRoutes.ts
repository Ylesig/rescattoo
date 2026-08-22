import express from "express";

import {
  cadastrarUsuario,
  loginUsuario
} from "../controllers/authController.js";

const router = express.Router();

// Cadastro
router.post("/auth/register", cadastrarUsuario);

// Login
router.post("/auth/login", loginUsuario);

export default router;