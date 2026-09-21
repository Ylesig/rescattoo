import dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "env.env") });
process.env.DATABASE_URL ||= "file:./rescatto.db";
export const JWT_SECRET = process.env.JWT_SECRET || "rescatto_chave_secreta_2026";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const SMTP_HOST = process.env.SMTP_HOST || "";
export const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
export const SMTP_USER = process.env.SMTP_USER || "";
export const SMTP_PASS = process.env.SMTP_PASS || "";
export const SMTP_FROM = process.env.SMTP_FROM || "";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const ADMIN_KEY = process.env.ADMIN_KEY || "";
if (JWT_SECRET === "rescatto_chave_secreta_2026") {
    console.warn("JWT_SECRET não definido; use env.env ou .env antes de entrar em produção.");
}
