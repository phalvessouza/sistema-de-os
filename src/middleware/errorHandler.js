const { ValidationError } = require('express-validator');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof ValidationError) {
        return res.status(400).json({ error: 'Erro de validação', details: err.array() });
    }

    res.status(500).json({ error: 'Ocorreu um erro interno no servidor', message: err.message });
};

module.exports = errorHandler;