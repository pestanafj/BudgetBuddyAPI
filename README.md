## 🖥️ DESCRIÇÃO

API de controle financeiro através do cadastramento de transações de entrada e saída.

## 🛠️ FERRAMENTAS

<br>
Neste projeto foram utilizadas as seguintes ferramentas:
<br><br>

|                                                        Javascript                                                         |                                                      Node.js                                                      |                                                       Express                                                       |                                                     Git                                                     |                                                      GitHub                                                       | PostgreSQL                                                                                                                |
| :-----------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------- |
| <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"/> | <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"/> |

<br><br>

## 🔧 FUNCIONALIDADES

<br>
[x] Cadastrar Usuário<br>
[x] Fazer Login<br>
[x] Detalhar Perfil do Usuário Logado<br>
[x] Editar Perfil do Usuário Logado<br>
[x] Listar categorias<br>
[x] Listar transações<br>
[x] Detalhar transação<br>
[x] Cadastrar transação<br>
[x] Editar transação<br>
[x] Remover transação<br>
[x] Obter extrato de transações<br>
[x] [Extra] Filtrar transações por categoria<br>

#### 🔧 Cadastrar Usuário

Funcionalidade acessada através do endpoint:

`POST /usuario`

É necessário fornecer no body da requisição as seguintes informações:

    {
        "nome":
        "email":
        "senha":
    }

A resposta retornará as informações de cadastramento no banco.

Obs: O e-mail só pode ser cadastrado uma vez no sistema. Se tentar cadastrar o mesmo email novamente, vai retornar um erro.

#### 🔧 Fazer Login

Funcionalidade acessada através do endpoint:

`POST /login`

É necessário fornecer no body da requisição as seguintes informações:

    {
        "email":
        "senha":
    }

Será retornado um token de autenticação que deve ser informado no Header Auth Bearer das próximas requisições.

Obs: A senha informada deve ser compatível com a usada no ato do cadastramento.

#### 🔧 Detalhar Perfil do Usuário Logado

Funcionalidade acessada através do endpoint:

`GET /usuario`

Deve ser informado um token de autenticação no Header Auth Bearer da requisição.

A resposta retornará as informações de perfil do usuário logado.

#### 🔧 Editar Perfil do Usuário Logado

Funcionalidade acessada através do endpoint:

`PUT /usuario`

Deve ser informado um token de autenticação no Header Auth Bearer da requisição.

É necessário fornecer no body da requisição as seguintes informações:

    {
        "nome":
        "email":
        "senha":
    }

A resposta retornará vazia.

#### 🔧 Listar categorias

Funcionalidade acessada através do endpoint:

`GET /categoria`

Deve ser informado um token de autenticação no Header Auth Bearer da requisição.

Não é necessário envio de informações pelo body.

A resposta retornará a lista de todas as categorias de transações cadastradas no banco de dados.

#### 🔧 Listar transações

Funcionalidade acessada através do endpoint:

`GET /transacao`

Não é necessário envio de informações pelo body.

A resposta retornará a lista de todas as transações do usuário logado cadastradas no banco de dados.

#### 🔧 Detalhar transação

Funcionalidade acessada através do endpoint:

`GET /transacao/:id`

Deve ser informado o :id da transação que deseja detalhar através do query params.

A resposta retornará as informações detalhadas da transação, se ela pertecencer ao usuário logado.

#### 🔧 Cadastrar transação

Funcionalidade acessada através do endpoint:

`GET /transacao`

É necessário fornecer no body da requisição as seguintes informações:

    {
        descricao:
        valor:
        data:
        categoria_id:
        tipo:
    }

Será necessário informar todos os campos.

O id da categoria deve corresponder a uma categoria cadastrada no banco de dados.

O valor deve estar em centavos.

O tipo possui apenas dois valores permitidos: "entrada" ou "saída".

Será retornado um objeto com as informações de cadastramento da transação no banco de dados.

#### 🔧 Editar transação

Funcionalidade acessada através do endpoint:

`PUT /transacao/:id`

É necessário fornecer o id da transacao através do query params, e no body da requisição as seguintes informações:

    {
        descricao:
        valor:
        data:
        categoria_id:
        tipo:
    }

Será necessário informar todos os campos.

O id da categoria deve corresponder a uma categoria cadastrada no banco de dados.

O valor deve estar em centavos.

O tipo possui apenas dois valores permitidos: "entrada" ou "saída".

A resposta retornará vazia.

#### 🔧 Remover transação

Funcionalidade acessada através do endpoint:

`DELETE /transacao/:id`

É necessário fornecer o id da transacao através do query params.

O id da transação deve corresponder a uma transação do usuário logado.

A resposta retornará vazia.

#### 🔧 Obter extrato de transações

Funcionalidade acessada através do endpoint:

`GET /transacao/extrato`

Será retornado objeto com a soma de todas as transações de entrada e de saída do usuário logado.

    {
        entrada: (soma entradas)
        saída: (soma saídas)
    }

O valor retornado estará em centavos.

#### 🔧 [Extra] Filtrar transações por categoria

Funcionalidade acessada através do endpoint:

`GET /transacao?filtro="categoria"`

Não é necessário envio de informações pelo body.

A resposta retornará a lista de todas as transações da categoria solicitada do usuário logado cadastradas no banco de dados.

## 👩🏻‍💻 AUTOR

<br>
Fernanda Pestana [pestanafj]<br>
Samy Celes [samyceles]<br><br>

Projeto criado durante desafio do Módulo 3 do Curso Desenvolvimento de Software BackEnd da Cubos Academy

Setembro 2023.
