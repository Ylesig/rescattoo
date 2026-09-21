import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(public readonly statusCode: number, message: string) {
    super(message);
    this.name = "AppError";
  }
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      erro: "Dados de entrada inválidos.",
      issues: error.issues.map(issue => ({
        path: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ erro: error.message });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    return res.status(409).json({
      erro: "Este e-mail já está cadastrado.",
      issues: [{ path: "body.contato", message: "Este e-mail já está cadastrado." }]
    });
  }

  if (error instanceof SyntaxError && "status" in error && error.status === 400) {
    return res.status(400).json({
      erro: "JSON inválido.",
      issues: [{ path: "body", message: "O corpo deve ser um JSON válido." }]
    });
  }

  console.error(error);
  return res.status(500).json({ erro: "Erro interno do servidor." });
}
