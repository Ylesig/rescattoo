import prisma from "../prisma.js";
export async function listarGatos(query) {
    return await prisma.gato.findMany({
        where: query.status ? { status: query.status } : undefined,
        skip: (query.pagina - 1) * query.limite,
        take: query.limite
    });
}
export async function buscarGato(id) {
    return await prisma.gato.findUnique({
        where: {
            id_gato: Number(id),
        },
    });
}
export async function criarGato(gato) {
    return await prisma.gato.create({
        data: gato,
    });
}
export async function atualizarGato(id, gato) {
    return await prisma.gato.update({
        where: {
            id_gato: Number(id),
        },
        data: gato,
    });
}
export async function deletarGato(id) {
    return await prisma.gato.delete({
        where: {
            id_gato: Number(id),
        },
    });
}
