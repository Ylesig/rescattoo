import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "env.env") });

export const JWT_SECRET = process.env.JWT_SECRET || "rescatto_chave_secreta_2026";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (JWT_SECRET === "rescatto_chave_secreta_2026") {
  console.warn("JWT_SECRET não definido; use env.env ou .env antes de entrar em produção.");
}