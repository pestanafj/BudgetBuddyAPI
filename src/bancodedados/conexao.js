const { Pool } = require('pg');
require('dotenv').config()

const usuarioBanco = process.env.DB_USER;
const senhaBanco = process.env.DB_PASSWORD ;


const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: usuarioBanco,
    password: senhaBanco,
    database: 'dindin'
});

module.exports = pool;