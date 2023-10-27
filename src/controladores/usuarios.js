const pool = require('../bancodedados/conexao')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const senhajwt = process.env.JWT;


const cadastrarUsuario = async (req, res)=>{

    const {nome, email, senha} = req.body;

    try {
        const senhaEncriptada = await bcrypt.hash(senha, 10);

        const query = "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) returning *"

        const {rows, rowCount} = await pool.query(query,[nome, email, senhaEncriptada]);

        if(rowCount>0){
            return res.status(201).json(rows[0]);  
        }

    } catch (error) {
        return res.status(500).json({"Erro do servidor": error.message});
    }
    

}

const loginUsuario = async(req, res)=>{

    const { email, senha } = req.body;

    try {
        const { rows } = await pool.query("SELECT * FROM usuarios WHERE email=$1", [email]);

        const senhaValida = bcrypt.compare(senha, rows[0].senha);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Usuário e/ou senha inválidos!" });
        }

        const token = jwt.sign({ usuario_id: rows[0].id }, senhajwt, { expiresIn: '8h' });

        const { senha: _, ...usuarioLogado } = rows[0];

        return res.status(200).json({ usuario: usuarioLogado, token });


    } catch (error) {
        return res.status(500).json({"Erro do servidor": error.message});
    }
}

const getUsuario = async (req, res)=>{

    try{
        const{rows : usuario} = await pool.query(
            'SELECT id, nome, email FROM usuarios WHERE id =$1',[req.user.id]
        );

        return res.json(usuario);

    } catch (error){
        return res.status(500).json({"Erro do servidor": error.message});
    }
}

const editarUsuario = async (req, res)=>{

    const {nome,email,senha} = req.body;

    try{
        const{rows:usuario} = await pool.query (

            'SELECT id, email, senha FROM usuarios WHERE id =$1',[req.user.id]

        )
        
        const senhaEncriptada = await bcrypt.hash(senha, 10);

       const queryAtualizarUsuario= 'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4'
        
       await pool.query(queryAtualizarUsuario,[nome,email,senhaEncriptada,req.user.id]);

       return res.status(204).send();

    } catch (error){
        return res.status(500).json({"Erro do servidor": error.message});
    }

}

module.exports = {
    cadastrarUsuario,
    loginUsuario,
    getUsuario,
    editarUsuario
}