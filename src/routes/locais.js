const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Local = require('../models/Local');
const authenticateToken = require('../middleware/auth');

// Middleware para tratamento de erros
const handleErrors = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Função para buscar um local por ID
const findLocalById = async (id) => {
    const local = await Local.findByPk(id);
    if (!local) {
        const error = new Error('Local não encontrado');
        error.status = 404;
        throw error;
    }
    return local;
};

// Rota para criar um novo local
router.post(
    '/',
    authenticateToken,
    [
        body('nome').notEmpty().withMessage('Nome é obrigatório'),
        body('endereco').notEmpty().withMessage('Endereço é obrigatório')
    ],
    handleErrors(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const local = await Local.create(req.body);
        res.status(201).json(local);
    })
);

// Rota para listar todos os locais
router.get('/', authenticateToken, handleErrors(async (req, res) => {
    const locais = await Local.findAll();
    res.status(200).json(locais);
}));

// Rota para deletar um local
router.delete('/:id', authenticateToken, handleErrors(async (req, res) => {
    const local = await findLocalById(req.params.id);
    await local.destroy();
    res.status(200).json({ message: 'Local deletado com sucesso' });
}));

// Rota para atualizar um local
router.patch(
    '/:id',
    authenticateToken,
    [
        body('nome').optional().notEmpty().withMessage('Nome não pode ser vazio'),
        body('endereco').optional().notEmpty().withMessage('Endereço não pode ser vazio')
    ],
    handleErrors(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const local = await findLocalById(req.params.id);
        await local.update(req.body);
        res.status(200).json(local);
    })
);

module.exports = router;