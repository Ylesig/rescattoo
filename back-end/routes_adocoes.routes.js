import express from "express";
import * as controller from "../controllers/adocoes.controller.js";

const router = express.Router();

// POST /adocoes
router.post("/", controller.solicitar);

export default router;