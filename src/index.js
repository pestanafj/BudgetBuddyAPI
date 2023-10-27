const express = require('express');
require('dotenv').config()
const app = express();

const roteador = require('./roteador');

const PORTA = 3000;

app.use(express.json());
app.use(roteador);

app.listen(PORTA, ()=>console.log(`🚀 Servidor em execução em http://localhost:${PORTA}`));
