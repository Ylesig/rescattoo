import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { ADMIN_REGISTRATION_KEYS, JWT_EXPIRES_IN, JWT_SECRET } from "../config.js";

const EMAIL_REGEX = /^(?!.*\.\.)[a-z0-9](?:[a-z0-9._%+-]*[a-z0-9])?@gmail\.com$/i;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,72}$/;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não configurado no ambiente.");
}

// ======================================
// CADASTRO
// ======================================

export async function cadastrarUsuario(
  req: Request,
  res: Response
) {
  try {
    const {
      nome,
      endereco,
      contato,
      senha,
      perfil,
    } = req.body;

    if (perfil !== undefined && perfil !== "usuario" && perfil !== "admin") {
      return res.status(400).json({ erro: "Perfil de cadastro inválido." });
    }

    const nomeNormalizado = typeof nome === "string" ? nome.trim() : "";
    const contatoNormalizado = typeof contato === "string" ? contato.trim().toLowerCase() : "";

    if (!nomeNormalizado || !contatoNormalizado || typeof senha !== "string") {
      return res.status(400).json({
        erro: "Nome, e-mail e senha são obrigatórios."
      });
    }

    if (contatoNormalizado.length > 254 || !EMAIL_REGEX.test(contatoNormalizado)) {
      return res.status(400).json({ erro: "Informe um e-mail Gmail válido, como nome@gmail.com." });
    }

    if (!PASSWORD_REGEX.test(senha)) {
      return res.status(400).json({
        erro: "A senha deve ter de 8 a 72 caracteres, com maiúscula, minúscula e número."
      });
    }

    // Verifica se o e-mail já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        contato: contatoNormalizado
      }
    });

    if (usuarioExistente) {
      return res.status(409).json({
        erro: "Este e-mail já está cadastrado."
      });
    }

    const isAdminRegistration = perfil === "admin";
    const adminKey = req.headers["x-admin-key"];
    if (isAdminRegistration && (typeof adminKey !== "string" || !ADMIN_REGISTRATION_KEYS.includes(adminKey))) {
      return res.status(403).json({ erro: "Chave de cadastro administrativa inválida." });
    }

    // Cria o HASH da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome: nomeNormalizado,
        endereco: endereco || "",
        contato: contatoNormalizado,
        senha: senhaHash,
        perfil: isAdminRegistration ? "admin" : "usuario"
      }
    });

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        contato: usuario.contato,
        perfil: usuario.perfil
      }
    });

  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: "Erro ao cadastrar usuário."
    });
  }
}

// ======================================
// LOGIN
// ======================================

export async function loginUsuario(
  req: Request,
  res: Response
) {
  try {
    const {
      contato,
      senha,
      perfil
    } = req.body;

    const contatoNormalizado = typeof contato === "string" ? contato.trim().toLowerCase() : "";

    if (!contatoNormalizado || typeof senha !== "string" || !senha) {
      return res.status(400).json({
        erro: "E-mail e senha são obrigatórios."
      });
    }

    if (contatoNormalizado.length > 254 || !EMAIL_REGEX.test(contatoNormalizado)) {
      return res.status(400).json({ erro: "Informe um e-mail Gmail válido, como nome@gmail.com." });
    }

    if (!PASSWORD_REGEX.test(senha)) {
      return res.status(400).json({
        erro: "A senha deve ter de 8 a 72 caracteres, com maiúscula, minúscula e número."
      });
    }

    if (perfil !== undefined && perfil !== "usuario" && perfil !== "admin") {
      return res.status(400).json({ erro: "Perfil de login inválido." });
    }

    // Procura o usuário pelo e-mail
    const usuario = await prisma.usuario.findUnique({
      where: {
        contato: contatoNormalizado
      }
    });

    // Usuário inexistente
    if (!usuario) {
      return res.status(401).json({
        erro: "E-mail ou senha incorretos."
      });
    }

    if (perfil && usuario.perfil !== perfil) {
      return res.status(401).json({ erro: "As credenciais não pertencem ao perfil selecionado." });
    }

    // Compara senha digitada com o HASH armazenado
    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaValida) {
      return res.status(401).json({
        erro: "E-mail ou senha incorretos."
      });
    }

    // Cria o JWT
    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        contato: usuario.contato,
        perfil: usuario.perfil
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]
      }
    );

    return res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        contato: usuario.contato,
        perfil: usuario.perfil
      }
    });

  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: "Erro ao realizar login."
    });
  }
}

export function obterPerfil(req: AuthRequest, res: Response) {
  return res.status(200).json({ usuario: req.usuario });
}