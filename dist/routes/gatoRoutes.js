import express from "express";
import { getGatos, getGato, postGato, putGato, deleteGato } from "../controllers/gatoController.js";
import { autenticar } from "../middlewares/authMiddleware.js";
const router = express.Router();
// ======================================
// ROTAS PÚBLICAS
// ======================================
router.get("/gatos", getGatos);
router.get("/gatos/:id", getGato);
// ======================================
// ROTAS PROTEGIDAS
// ======================================
router.post("/gatos", autenticar, postGato);
router.put("/gatos/:id", autenticar, putGato);
router.delete("/gatos/:id", autenticar, deleteGato);
export default router;
