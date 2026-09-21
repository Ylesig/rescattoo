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

export async function listarGatos(query: { status?: string; pagina: number; limite: number }) {
  return await prisma.gato.findMany({
    where: query.status ? { status: query.status } : undefined,
    skip: (query.pagina - 1) * query.limite,
    take: query.limite
  });
}

export async function buscarGato(id: string | number) {
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
  id: string | number,
  gato: Gato
) {
  return await prisma.gato.update({
    where: {
      id_gato: Number(id),
    },
    data: gato,
  });
}

export async function deletarGato(id: string | number) {
  return await prisma.gato.delete({
    where: {
      id_gato: Number(id),
    },
  });
}