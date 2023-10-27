-- create database dindin;

CREATE TABLE usuarios(
    id SERIAL NOT NULL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE categorias(
    id SERIAL NOT NULL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE transacoes(
    id SERIAL NOT NULL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    valor INTEGER NOT NULL,
    data DATE NOT NULL,
    categoria_id INTEGER NOT NULL REFERENCES categorias(id),
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    tipo VARCHAR(7) NOT NULL,
  	CONSTRAINT tipo_check CHECK (tipo IN ('entrada','saída'))

);


INSERT INTO categorias (descricao) VALUES
    ('Alimentação'),
    ('Assinaturas e Serviços'),
    ('Casa'),
    ('Mercado'),
    ('Cuidados Pessoais'),
    ('Educação'),
    ('Família'),
    ('Lazer'),
    ('Pets'),
    ('Presentes'),
    ('Roupas'),
    ('Saúde'),
    ('Transporte'),
    ('Salário'),
    ('Vendas'),
    ('Outras receitas'),
    ('Outras despesas');
