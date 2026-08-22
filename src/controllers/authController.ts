import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "rescatto_chave_secreta_2026";

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
      perfil
    } = req.body;

    // Validação dos campos
    if (!nome || !contato || !senha) {
      return res.status(400).json({
        erro: "Nome, e-mail e senha são obrigatórios."
      });
    }

    // Validação mínima da senha
    if (senha.length < 6) {
      return res.status(400).json({
        erro: "A senha deve possuir pelo menos 6 caracteres."
      });
    }

    // Verifica se o e-mail já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        contato
      }
    });

    if (usuarioExistente) {
      return res.status(409).json({
        erro: "Este e-mail já está cadastrado."
      });
    }

    // Cria o HASH da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria usuário no banco
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        endereco: endereco || "",
        contato,
        senha: senhaHash,
        perfil: perfil || "usuario"
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
      senha
    } = req.body;

    if (!contato || !senha) {
      return res.status(400).json({
        erro: "E-mail e senha são obrigatórios."
      });
    }

    // Procura o usuário pelo e-mail
    const usuario = await prisma.usuario.findUnique({
      where: {
        contato
      }
    });

    // Usuário inexistente
    if (!usuario) {
      return res.status(401).json({
        erro: "E-mail ou senha incorretos."
      });
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
        expiresIn: "2h"
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