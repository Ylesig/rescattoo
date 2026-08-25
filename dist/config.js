import dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "env.env") });
export const JWT_SECRET = process.env.JWT_SECRET || "rescatto_chave_secreta_2026";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const numberedAdminKeys = Object.entries(process.env)
    .filter(([name, value]) => /^ADMIN_REGISTRATION_KEY_\d+$/.test(name) && value)
    .sort(([first], [second]) => Number(first.split("_").pop()) - Number(second.split("_").pop()))
    .map(([, value]) => value);
export const ADMIN_REGISTRATION_KEYS = numberedAdminKeys.length > 0
    ? numberedAdminKeys
    : (process.env.ADMIN_REGISTRATION_KEYS || process.env.ADMIN_REGISTRATION_KEY || "rescatto_admin_dev")
        .split(",").map((key) => key.trim()).filter(Boolean);
if (JWT_SECRET === "rescatto_chave_secreta_2026") {
    console.warn("JWT_SECRET não definido; use env.env ou .env antes de entrar em produção.");
}
