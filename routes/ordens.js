const express = require('express');
const router = express.Router();
const OrdemDeServico = require('../models/OrdemDeServico');
const Comentario = require('../models/Comentario');

// Rota para criar uma nova Ordem de Serviço (Admin)
router.post('/', async (req, res) => {
    const { local, observacao, descricaoDetalhada, nomePessoa, tecnicoResponsavel, prioridade, categoria } = req.body;
    const ordem = new OrdemDeServico({ local, observacao, descricaoDetalhada, nomePessoa, tecnicoResponsavel, prioridade, categoria });
    await ordem.save();
    res.status(201).send(ordem);
});

// Rota para listar todas as Ordens de Serviço
router.get('/', async (req, res) => {
    const ordens = await OrdemDeServico.findAll();
    res.send(ordens);
});

// Rota para atualizar o status da Ordem de Serviço (Técnico)
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { status, dataEncerramento } = req.body;
    const ordem = await OrdemDeServico.findByPk(id);
    if (ordem) {
        ordem.status = status;
        ordem.dataEncerramento = dataEncerramento;
        ordem.historicoStatus = ordem.historicoStatus || [];
        ordem.historicoStatus.push({ status, dataHora: new Date() });
        await ordem.save();
        res.send(ordem);
    } else {
        res.status(404).send({ error: 'Ordem de Serviço não encontrada' });
    }
});

// Rota para adicionar um comentário a uma Ordem de Serviço (Técnico)
router.post('/:id/comentarios', async (req, res) => {
    const { id } = req.params;
    const { autor, conteudo } = req.body;
    const comentario = new Comentario({ ordemDeServicoId: id, autor, conteudo });
    await comentario.save();
    res.status(201).send(comentario);
});

module.exports = router;