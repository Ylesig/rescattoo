import express from "express";
import { cadastrarUsuario, loginUsuario, obterPerfil } from "../controllers/authController.js";
import { autenticar } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { authHeadersSchema, loginSchema, registerSchema } from "../schemas/authSchemas.js";
const router = express.Router();
// Cadastro
router.post("/auth/register", validate(registerSchema), cadastrarUsuario);
// Login
router.post("/auth/login", validate(loginSchema), loginUsuario);
router.get("/auth/perfil", validate(authHeadersSchema), autenticar, obterPerfil);
export default router;
