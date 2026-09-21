import { z } from "zod";
const textoObrigatorio = z.string().trim().min(1, "O campo é obrigatório.").max(120);
export const gatoBodySchema = z.object({
    body: z.object({
        nome_gato: textoObrigatorio,
        idade: textoObrigatorio,
        sexo: textoObrigatorio,
        cor: textoObrigatorio,
        porte: textoObrigatorio,
        temperamento: z.string().trim().max(500).optional().default(""),
        status: textoObrigatorio,
        historico_tratamento: z.string().trim().max(1000).optional().default("")
    }).strict()
});
export const gatoParamsSchema = z.object({
    params: z.object({
        id: z.coerce.number().int("O ID deve ser um número inteiro.").positive("O ID deve ser positivo.")
    })
});
export const gatoQuerySchema = z.object({
    query: z.object({
        status: z.string().trim().min(1).max(40).optional(),
        pagina: z.coerce.number().int().positive().optional().default(1),
        limite: z.coerce.number().int().positive().max(100).optional().default(20)
    }).strict()
});
export const gatoParamsAndBodySchema = gatoParamsSchema.merge(gatoBodySchema);
