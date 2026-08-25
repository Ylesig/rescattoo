import { PrismaClient } from "@prisma/client";
import "./config.js";

const prisma = new PrismaClient();

export default prisma;