import express from "express";
import * as controller from "../controllers/usuarios.controller.js";

const router = express.Router();

// POST /usuarios
router.post("/", controller.criar);

export default router;