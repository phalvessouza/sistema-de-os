const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const OrdemDeServico = require('./OrdemDeServico');

const Comentario = sequelize.define('Comentario', {
    ordemDeServicoId: {
        type: DataTypes.INTEGER,
        references: {
            model: OrdemDeServico,
            key: 'id'
        },
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataHora: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    conteudo: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Definir a associação entre Comentario e OrdemDeServico
Comentario.belongsTo(OrdemDeServico, { foreignKey: 'ordemDeServicoId' });

module.exports = Comentario;