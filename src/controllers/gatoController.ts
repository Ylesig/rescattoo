import * as model from "../models/gatoModel.js";


// GET
export async function getGatos(req, res) {

    try {

        const gatos = await model.listarGatos();

        res.json(gatos);

    } catch (erro) {

        res.status(500).json({
            erro: "Erro ao buscar gatos"
        });
    }
}


// GET ID
export async function getGato(req, res) {

    try {

        const gato = await model.buscarGato(req.params.id);

        if (!gato) {

            return res.status(404).json({
                erro: "Gato não encontrado"
            });
        }

        res.json(gato);

    } catch (erro) {

        res.status(500).json({
            erro: "Erro no servidor"
        });
    }
}


// POST
export async function postGato(req, res) {

    try {

        const {
            nome_gato,
            idade,
            sexo,
            cor,
            porte,
            status
        } = req.body;

        if (
            !nome_gato ||
            !idade ||
            !sexo ||
            !cor ||
            !porte ||
            !status
        ) {

            return res.status(400).json({
                erro: "Dados obrigatórios"
            });
        }

        await model.criarGato(req.body);

        res.status(201).json({
            mensagem: "Gato criado"
        });

    } catch (erro) {

        res.status(500).json({
            erro: "Erro ao criar gato"
        });
    }
}


// PUT
export async function putGato(req, res) {

    try {

        await model.atualizarGato(
            req.params.id,
            req.body
        );

        res.json({
            mensagem: "Gato atualizado"
        });

    } catch (erro) {

        res.status(500).json({
            erro: "Erro ao atualizar"
        });
    }
}


// DELETE
export async function deleteGato(req, res) {

    try {

        await model.deletarGato(req.params.id);

        res.status(204).send();

    } catch (erro) {

        res.status(500).json({
            erro: "Erro ao deletar"
        });
    }
}