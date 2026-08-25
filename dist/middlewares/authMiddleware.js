import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não configurado no ambiente.");
}
export function autenticar(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({
                erro: "Token de autenticação não informado."
            });
        }
        const partes = authorization.split(" ");
        if (partes.length !== 2 ||
            partes[0] !== "Bearer") {
            return res.status(401).json({
                erro: "Formato do token inválido."
            });
        }
        const token = partes[1];
        const usuario = jwt.verify(token, JWT_SECRET);
        req.usuario = usuario;
        next();
    }
    catch (erro) {
        return res.status(401).json({
            erro: "Token inválido ou expirado."
        });
    }
}
