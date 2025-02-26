const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Local = require('./Local');

const OrdemDeServico = sequelize.define('OrdemDeServico', {
    observacao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descricaoDetalhada: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'A descrição detalhada não pode estar vazia'
            }
        }
    },
    horarioAbertura: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    nomePessoa: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O nome da pessoa não pode estar vazio'
            }
        }
    },
    status: {
        type: DataTypes.ENUM('Aberta', 'Em Andamento', 'Encerrada'),
        defaultValue: 'Aberta'
    },
    tecnicoResponsavel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dataEncerramento: {
        type: DataTypes.DATE,
        allowNull: true
    },
    prioridade: {
        type: DataTypes.ENUM('Baixa', 'Média', 'Alta'),
        defaultValue: 'Média'
    },
    categoria: {
        type: DataTypes.ENUM('Hardware', 'Software', 'Rede', 'Outros'),
        defaultValue: 'Outros'
    },
    historicoStatus: {
        type: DataTypes.JSONB,
        allowNull: true
    }
}, {
    timestamps: true,
    paranoid: true,
    tableName: 'ordens_de_servico'
});

// Definindo o relacionamento
OrdemDeServico.belongsTo(Local, { foreignKey: 'localId', as: 'local' });

module.exports = OrdemDeServico;