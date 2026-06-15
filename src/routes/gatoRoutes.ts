import express from "express";

import {
  getGatos,
  getGato,
  postGato,
  putGato,
  deleteGato
} from "../controllers/gatoController.js";

const router = express.Router();

router.get("/gatos", getGatos);

router.get("/gatos/:id", getGato);

router.post("/gatos", postGato);

router.put("/gatos/:id", putGato);

router.delete("/gatos/:id", deleteGato);

export default router;