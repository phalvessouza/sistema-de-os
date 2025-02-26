const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Local = require('../models/Local');
const authenticateToken = require('../middleware/auth');

// Rota para criar um novo local
router.post(
    '/',
    authenticateToken,
    [
        body('nome').notEmpty().withMessage('Nome é obrigatório'),
        body('endereco').notEmpty().withMessage('Endereço é obrigatório')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const local = await Local.create(req.body);
            res.status(201).json(local);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

// Rota para listar todos os locais
router.get('/', authenticateToken, async (req, res) => {
    try {
        const locais = await Local.findAll();
        res.status(200).json(locais);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para deletar um local
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const local = await Local.findByPk(id);
        if (!local) {
            return res.status(404).json({ error: 'Local não encontrado' });
        }
        await local.destroy();
        res.status(200).json({ message: 'Local deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para atualizar um local
router.patch(
    '/:id',
    authenticateToken,
    [
        body('nome').optional().notEmpty().withMessage('Nome não pode ser vazio'),
        body('endereco').optional().notEmpty().withMessage('Endereço não pode ser vazio')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const id = req.params.id;
            const local = await Local.findByPk(id);
            if (!local) {
                return res.status(404).json({ error: 'Local não encontrado' });
            }
            await local.update(req.body);
            res.status(200).json(local);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
);

module.exports = router;