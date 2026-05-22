import express from "express";
import cors from "cors";
import morgan from "morgan";

import gatoRoutes from "./routes/gatoRoutes.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use(express.static("public"));

app.use(gatoRoutes);

app.listen(3000, () => {

    console.log("Servidor rodando 🚀");
});