import express from "express";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes.js";

const app = express();

const PORT = 3000;


// MIDDLEWARES
app.use(express.json());

app.use(cors());

app.use(morgan("dev"));


// FRONT-END
app.use(express.static("public"));


// ROTAS
app.use(routes);


// SERVIDOR
app.listen(PORT, () => {

    console.log(`Servidor rodando em http://localhost:${PORT}`);

});