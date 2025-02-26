const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const OrdemDeServico = require('./OrdemDeServico');

// Definição do modelo Comentario
const Comentario = sequelize.define('Comentario', {
    ordemDeServicoId: {
        type: DataTypes.INTEGER,
        references: {
            model: OrdemDeServico,
            key: 'id'
        },
        allowNull: false,
        comment: 'ID da ordem de serviço associada'
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        comment: 'Nome do autor do comentário'
    },
    dataHora: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: 'Data e hora do comentário'
    },
    conteudo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        comment: 'Conteúdo do comentário'
    }
}, {
    timestamps: true, // Adiciona createdAt e updatedAt
    tableName: 'comentarios', // Nome da tabela no banco de dados
    comment: 'Tabela de comentários para ordens de serviço'
});

// Definir a associação entre Comentario e OrdemDeServico
Comentario.belongsTo(OrdemDeServico, { foreignKey: 'ordemDeServicoId' });

module.exports = Comentario;