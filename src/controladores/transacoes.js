const pool = require('../bancodedados/conexao')
const {existeCategoriaDescricao} = require('../util/funcoes-utilitarias');

const listarTransacoes = async (req, res)=>{

    try {
        const {filtro} = req.query;
        
        let query = "SELECT * FROM transacoes WHERE usuario_id=$1";
        let retorno = await pool.query(query, [req.user.id]);
        
        if(filtro){

            const idCategoria = await existeCategoriaDescricao(filtro);

            if(idCategoria>=0){
                query = "SELECT * FROM transacoes WHERE usuario_id=$1 AND categoria_id=$2";
                retorno = await pool.query(query, [req.user.id, idCategoria]);
            }
            else{
                return res.status(404).json({"mensagem":"Categoria não encontrada!"});
            }
        }

        if(retorno.rowCount<1){
            return res.status(404).json({"mensagem": "Nenhuma transação cadastrada"});
        }
        return res.status(200).json(retorno.rows);

    } catch (error) {
        return res.status(500).json({"Erro do servidor": error.message});
    }
}

const getTransacao = async (req, res)=>{
    const { id } = req.params;

	try {
		const { rows: transacao } = await pool.query(
			'select trans.id, trans.tipo, trans.descricao, trans.valor, trans.data, trans.usuario_id, trans.categoria_id, cat.descricao  as categoria_nome from transacoes AS trans LEFT JOIN categorias AS cat ON trans.categoria_id = cat.id where trans.id = $1 and usuario_id = $2',
			[id, req.user.id]
		)
        
        return res.json(transacao[0]);

} catch (error) {
    return res.status(500).json({"Erro do servidor": error.message});
}
}

const cadastrarTransacao = async (req, res)=>{

    const {descricao, valor, data, categoria_id, tipo} = req.body;
  
    try {
        
        const cadastroQuery = "INSERT INTO transacoes (tipo, descricao, valor, data, categoria_id, usuario_id ) VALUES ($1, $2, $3, $4, $5, $6) returning *"
        const {rows, rowCount} = await pool.query(cadastroQuery, [tipo, descricao, valor, data, categoria_id, req.user.id ]); 
        
        if(rowCount>0){
            return res.status(201).json(rows[0]);  
        }
        
    } catch (error) {
        return res.status(500).json({"Erro do servidor": error.message});
    }
}

const editarTransacao = async (req, res)=>{

    const {id}= req.params;
    const {descricao, valor, data, categoria_id, tipo} = req.body;

    try {
        const update = "UPDATE transacoes SET descricao=$1,valor=$2, data=$3, categoria_id=$4, tipo=$5 WHERE id=$6 returning *;"
        const retornoUpdate = await pool.query(update, [descricao, valor, data, categoria_id, tipo, id]);

        return res.status(200).json();

    } catch (error) {
        
        return res.status(500).json({"Erro do servidor": error.message});
    }
}

const deletarTransacao = async (req, res)=>{

    const {id}= req.params;

    try {
        const deleteQuery = "DELETE FROM transacoes WHERE id=$1;";
        await pool.query(deleteQuery, [id]);

        const checkQuery = "SELECT * FROM transacoes WHERE id=$1"

        const  resposta = await pool.query(checkQuery, [id]);

        if(resposta.rowCount>0){
            return res.status(500).json({"Erro do servidor": "Registro não deletado"});
        }

        return res.status(200).json();
        
    } catch (error) {
        return res.status(500).json({"Erro do servidor": error.message});

    }
}

const imprimirExtrato = async (req, res)=>{

    const usuario_id = req.user.id;

    try {

        const entrada = await pool.query("SELECT SUM(valor) as total FROM transacoes WHERE usuario_id=$1 and tipo='entrada';", [usuario_id]);
        const saida = await pool.query("SELECT SUM(valor) as total FROM transacoes WHERE usuario_id=$1 and tipo='saída';", [usuario_id]);
        
        const extrato = {
            entrada: Number(entrada.rows[0].total),
            saida: Number(saida.rows[0].total)
        }

        if(extrato.entrada === null || extrato.entrada === undefined){
            extrato.entrada = 0
        }
        if(extrato.saida === null || extrato.saida === undefined){
            extrato.saida = 0
        }
        
        return res.status(200).json(extrato);
        
    } catch (error) {
        return res.status(500).json({"Erro do servidor": error.message});
    }
}


module.exports = {
    listarTransacoes,
    getTransacao,
    cadastrarTransacao,
    editarTransacao,
    deletarTransacao,
    imprimirExtrato
}