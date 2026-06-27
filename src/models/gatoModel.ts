import prisma from "../prisma.js";

interface Gato {
  nome_gato: string;
  idade: string;
  sexo: string;
  cor: string;
  porte: string;
  temperamento?: string;
  status: string;
  historico_tratamento?: string;
}

export async function listarGatos() {
  return await prisma.gato.findMany();
}

export async function buscarGato(id: string) {
  return await prisma.gato.findUnique({
    where: {
      id_gato: Number(id),
    },
  });
}

export async function criarGato(gato: Gato) {
  return await prisma.gato.create({
    data: gato,
  });
}

export async function atualizarGato(
  id: string,
  gato: Gato
) {
  return await prisma.gato.update({
    where: {
      id_gato: Number(id),
    },
    data: gato,
  });
}

export async function deletarGato(id: string) {
  return await prisma.gato.delete({
    where: {
      id_gato: Number(id),
    },
  });
}