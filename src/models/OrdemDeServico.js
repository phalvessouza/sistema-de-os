const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Local = require('./Local');

const OrdemDeServico = sequelize.define('OrdemDeServico', {
    observacao: DataTypes.STRING,
    descricaoDetalhada: DataTypes.TEXT,
    horarioAbertura: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    nomePessoa: DataTypes.STRING,
    status: { type: DataTypes.ENUM('Aberta', 'Em Andamento', 'Encerrada'), defaultValue: 'Aberta' },
    tecnicoResponsavel: DataTypes.STRING,
    dataEncerramento: DataTypes.DATE,
    prioridade: { type: DataTypes.ENUM('Baixa', 'Média', 'Alta'), defaultValue: 'Média' },
    categoria: { type: DataTypes.ENUM('Hardware', 'Software', 'Rede', 'Outros'), defaultValue: 'Outros' },
    historicoStatus: DataTypes.JSONB
});

// Definindo o relacionamento
OrdemDeServico.belongsTo(Local, { foreignKey: 'localId', as: 'local' });

module.exports = OrdemDeServico;