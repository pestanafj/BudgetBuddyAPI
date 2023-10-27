const senhajwt = process.env.JWT;
const jwt = require('jsonwebtoken');
const pool = require('../bancodedados/conexao')

const autenticarUsuario = async (req, res, next)=>{
    
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { usuario_id } = jwt.verify(token, senhajwt);
        const { rows, rowCount } = await pool.query('SELECT * FROM usuarios WHERE id=$1', [usuario_id]);

        if (rowCount < 1) {
            return res.status(401).json({ mensagem: 'Não autorizado' });
        }

        const {senha,...usuario} = rows[0];

        req.user = usuario;

        next();

    } catch (error) {
        return res.status(401).json({ 'Erro de servidor': error.message });
    }
}

module.exports = {
    autenticarUsuario
}