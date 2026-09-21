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
import { validate } from "../middlewares/validate.js";
import { gatoBodySchema, gatoParamsAndBodySchema, gatoParamsSchema, gatoQuerySchema } from "../schemas/gatoSchemas.js";
import { authHeadersSchema } from "../schemas/authSchemas.js";

const router = express.Router();

// ======================================
// ROTAS PÚBLICAS
// ======================================

router.get("/gatos", validate(authHeadersSchema), autenticar, validate(gatoQuerySchema), getGatos);

router.get("/gatos/:id", validate(authHeadersSchema), autenticar, validate(gatoParamsSchema), getGato);

// ======================================
// ROTAS PROTEGIDAS
// ======================================

router.post(
  "/gatos",
  validate(authHeadersSchema),
  autenticar,
  exigirAdministrador,
  validate(gatoBodySchema),
  postGato
);

router.put(
  "/gatos/:id",
  validate(authHeadersSchema),
  autenticar,
  exigirAdministrador,
  validate(gatoParamsAndBodySchema),
  putGato
);

router.delete(
  "/gatos/:id",
  validate(authHeadersSchema),
  autenticar,
  exigirAdministrador,
  validate(gatoParamsSchema),
  deleteGato
);

export default router;