const pool = require('../bancodedados/conexao');

const existeCategoriaDescricao = async (descricao) =>{

    const queryCategoria = "SELECT * FROM categorias WHERE lower(descricao) LIKE lower($1)";
    const retornoCategoria = await pool.query(queryCategoria, [descricao]);
    
    if(retornoCategoria.rowCount<1){
        return -1;
    }

    return retornoCategoria.rows[0].id;
}

const existeCategoriaId= async (id) =>{

    const query = "SELECT * FROM categorias WHERE id=$1";
    const retorno = await pool.query(query, [id]);
    
    if(retorno.rowCount<1){
        return false;
    }

    return true;

}

module.exports = {
    existeCategoriaDescricao,
    existeCategoriaId
}