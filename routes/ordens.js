const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const OrdemDeServico = require('../models/OrdemDeServico');
const Comentario = require('../models/Comentario');
const Local = require('../models/Local');
const authenticateToken = require('../middleware/auth');

// Rota para criar uma nova ordem de serviço
router.post(
    '/',
    authenticateToken,
    [
        body('observacao').notEmpty().withMessage('Observação é obrigatória'),
        body('descricaoDetalhada').notEmpty().withMessage('Descrição detalhada é obrigatória'),
        body('nomePessoa').notEmpty().withMessage('Nome da pessoa é obrigatório'),
        body('localId').isInt().withMessage('ID do local deve ser um número inteiro')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const ordem = await OrdemDeServico.create(req.body);
            res.status(201).json(ordem);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// Rota para listar todas as ordens de serviço
router.get('/', authenticateToken, async (req, res) => {
    try {
        const ordens = await OrdemDeServico.findAll({ include: { model: Local, as: 'local' } });
        res.status(200).json(ordens);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para atualizar o status da Ordem de Serviço (Técnico)
router.patch(
    '/:id',
    authenticateToken,
    [
        body('status').notEmpty().withMessage('Status é obrigatório'),
        body('dataEncerramento').optional().isISO8601().withMessage('Data de encerramento deve ser uma data válida')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
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
    }
);

// Rota para adicionar um comentário a uma Ordem de Serviço (Técnico)
router.post(
    '/:id/comentarios',
    authenticateToken,
    [
        body('autor').notEmpty().withMessage('Autor é obrigatório'),
        body('conteudo').notEmpty().withMessage('Conteúdo é obrigatório')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const { autor, conteudo } = req.body;
        const comentario = new Comentario({ ordemDeServicoId: id, autor, conteudo });
        await comentario.save();
        res.status(201).send(comentario);
    }
);

module.exports = router;