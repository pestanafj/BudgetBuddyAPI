const pool = require('../bancodedados/conexao');
const {existeCategoriaDescricao, existeCategoriaId} = require('../util/funcoes-utilitarias');

const checarCamposCadastro = (req, res, next) =>{

    const {nome, email, senha} = req.body;

    if(!nome||!email||!senha){
        return res.status(400).json({"mensagem":"Todos os campos devem ser informados"});
    }

    next();
}

const checarCamposLogin = (req, res, next) =>{

    const {email, senha} = req.body;

    if(!email||!senha){
        return res.status(400).json({"mensagem":"Todos os campos devem ser informados"});
    }

    next();
}

const checarDuplicidadeEmail = async (req, res, next) =>{

    const {email} = req.body;

    try {
        const {rowCount} = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

        if(rowCount>0){
            if(!req.user||rows[0].id!=req.user.id){
                    return res.status(400).json({"mensagem":"Já existe usuário cadastrado com o e-mail informado."})
            }
        }
    
        next();
        
    } catch (error) {
        return res.status(500).json({"Erro do servidor": error.message});
    }

}

const checarCamposTransacao = async (req, res, next)=>{


    const {id}= req.params;
    const {descricao, valor, data, categoria_id, tipo} = req.body;

    if(!id||!descricao||!valor||!data||!categoria_id||!tipo){
        return res.status(400).json({"mensagem":"Todos os campos devem ser informados!"});
    }

    if(existeCategoriaId(categoria_id)){
        return res.status(404).json({"mensagem":"Categoria não encontrada!"});
    }

    if(!(tipo=="entrada"||tipo=="saída")){
        return res.status(400).json({"mensagem":"Tipo de transação inválido. Valor deve ser 'entrada' ou 'saída'"});
    }

    next();

}

const checarTransacaoUsuario = async (req, res, next)=>{

    const {id} = req.params;
    const usuario_id = req.user.id;

    try {
        const transacaoExistente = await pool.query("SELECT * FROM transacoes WHERE id=$1",[id]);

        if(transacaoExistente.rowCount<1){
            return res.status(404).json({"mensagem":"Transação não encontrada."});
        }

        const {rowCount} = await pool.query("SELECT * FROM transacoes WHERE id=$1 and usuario_id=$2", [id, usuario_id]);

        if(rowCount<1){
            return res.status(403).json({"mensagem":"Transação não pertence ao usuário logado."});
        }

        next();
        
    } catch (error) {
        return res.status(500).json({"Erro do servidor": error.message});
    }
}

module.exports = {
    checarCamposCadastro,
    checarCamposLogin,
    checarCamposTransacao,
    checarDuplicidadeEmail,
    checarTransacaoUsuario
}