const pool = require('../bancodedados/conexao')


const listarCategorias = async (req, res)=>{
    try {
        const query = "SELECT * FROM categorias";
        const {rows, rowCount} = await pool.query(query);

        if(rowCount<1){
            return res.status(404).json({"mensagem": "Nenhuma categoria cadastrada"});
        }

        return res.status(200).json(rows);

    } catch (error) {
        return res.status(500).json({"Erro do servidor": error.message});
    }
}

module.exports = {listarCategorias}