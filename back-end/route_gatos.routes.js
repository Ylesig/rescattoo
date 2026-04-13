import express from "express";
import * as controller from "../controllers/gatos.controller.js";

const router = express.Router();

// GET /gatos
router.get("/", controller.listar);

// GET /gatos/:id
router.get("/:id", controller.buscar);

export default router;