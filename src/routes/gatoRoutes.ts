import express from "express";

import {
  getGatos,
  getGato,
  postGato,
  putGato,
  deleteGato
} from "../controllers/gatoController.js";

import {
  autenticar,
  exigirAdministrador
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// ======================================
// ROTAS PÚBLICAS
// ======================================

router.get("/gatos", autenticar, getGatos);

router.get("/gatos/:id", autenticar, getGato);

// ======================================
// ROTAS PROTEGIDAS
// ======================================

router.post(
  "/gatos",
  autenticar,
  exigirAdministrador,
  postGato
);

router.put(
  "/gatos/:id",
  autenticar,
  exigirAdministrador,
  putGato
);

router.delete(
  "/gatos/:id",
  autenticar,
  exigirAdministrador,
  deleteGato
);

export default router;