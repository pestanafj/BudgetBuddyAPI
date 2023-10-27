const express = require('express');

const roteador = express();

const {
    cadastrarUsuario,
    loginUsuario,
    getUsuario,
    editarUsuario
} = require('./controladores/usuarios')

const {
    listarTransacoes,
    getTransacao,
    cadastrarTransacao,
    editarTransacao,
    deletarTransacao,
    imprimirExtrato } = require('./controladores/transacoes');

const { 
    checarCamposCadastro,
    checarCamposLogin,
    checarDuplicidadeEmail,  
    checarTransacaoUsuario,
    checarCamposTransacao} = require('./intermediarios/validacao');

    
const { listarCategorias } = require('./controladores/categorias');
    
const { autenticarUsuario } = require('./intermediarios/autenticacao');

roteador.post('/usuario', checarCamposCadastro, checarDuplicidadeEmail, cadastrarUsuario);
roteador.post('/login', checarCamposLogin, loginUsuario);

roteador.use(autenticarUsuario);

roteador.get('/usuario', getUsuario);
roteador.put('/usuario', checarCamposCadastro, checarDuplicidadeEmail, editarUsuario);

roteador.get('/categoria', listarCategorias);

roteador.get('/transacao', listarTransacoes);
roteador.get('/transacao/extrato', imprimirExtrato);
roteador.get('/transacao/:id', checarTransacaoUsuario, getTransacao);
roteador.post('/transacao', checarCamposTransacao, cadastrarTransacao);
roteador.put('/transacao/:id', checarCamposTransacao, checarTransacaoUsuario, editarTransacao);
roteador.delete('/transacao/:id', checarTransacaoUsuario, deletarTransacao);

module.exports = roteador;