-- SQLBook: Code
/* Lógico: */

CREATE TABLE CATEGORIA (
    id serial PRIMARY KEY,
    descricao varchar(50)
);

CREATE TABLE USUARIO (
    id serial PRIMARY KEY,
    imagem text,
    nome varchar(100),
    senha varchar(100),
    descricao varchar(100),
    email varchar(100),
    ehAdmin boolean
);

CREATE TABLE PLATAFORMA (
    id serial PRIMARY KEY,
    descricao varchar(50)
);

CREATE TABLE JOGO (
    id serial PRIMARY KEY,
    nome varchar(100),
    descricao varchar(500),
    imagem text
);

CREATE TABLE AVALIACAO (
    id serial PRIMARY KEY,
    nota Integer,
    fk_Jogo_id serial,
    fk_Usuario_id serial
);

CREATE TABLE COMENTARIO (
    id serial PRIMARY KEY,
    descricao varchar(200),
    fk_Avaliacao_id serial
);

CREATE TABLE LISTA (
    id serial PRIMARY KEY,
    nome varchar(50),
    ehPublico boolean,
    fk_Usuario_id serial
);

CREATE TABLE JOGO_PLATAFORMA (
    fk_Plataforma_id serial,
    fk_Jogo_id serial
);

CREATE TABLE CATEGORIA_JOGO (
    fk_Categoria_id serial,
    fk_Jogo_id serial
);

CREATE TABLE JOGO_LISTA (
    fk_Jogo_id serial,
    fk_Lista_id serial
);
 
ALTER TABLE AVALIACAO ADD CONSTRAINT FK_AVALIACAO_2
    FOREIGN KEY (fk_Jogo_id)
    REFERENCES JOGO (id)
    ON DELETE CASCADE;
 
ALTER TABLE AVALIACAO ADD CONSTRAINT FK_AVALIACAO_3
    FOREIGN KEY (fk_Usuario_id)
    REFERENCES USUARIO (id)
    ON DELETE CASCADE;
 
ALTER TABLE COMENTARIO ADD CONSTRAINT FK_COMENTARIO_2
    FOREIGN KEY (fk_Avaliacao_id)
    REFERENCES AVALIACAO (id)
    ON DELETE CASCADE;
 
ALTER TABLE LISTA ADD CONSTRAINT FK_LISTA_2
    FOREIGN KEY (fk_Usuario_id)
    REFERENCES USUARIO (id)
    ON DELETE CASCADE;
 
ALTER TABLE JOGO_PLATAFORMA ADD CONSTRAINT FK_JOGO_PLATAFORMA_1
    FOREIGN KEY (fk_Plataforma_id)
    REFERENCES PLATAFORMA (id)
    ON DELETE RESTRICT;
 
ALTER TABLE JOGO_PLATAFORMA ADD CONSTRAINT FK_JOGO_PLATAFORMA_2
    FOREIGN KEY (fk_Jogo_id)
    REFERENCES JOGO (id)
    ON DELETE SET NULL;
 
ALTER TABLE CATEGORIA_JOGO ADD CONSTRAINT FK_CATEGORIA_JOGO_1
    FOREIGN KEY (fk_Categoria_id)
    REFERENCES CATEGORIA (id)
    ON DELETE RESTRICT;
 
ALTER TABLE CATEGORIA_JOGO ADD CONSTRAINT FK_CATEGORIA_JOGO_2
    FOREIGN KEY (fk_Jogo_id)
    REFERENCES JOGO (id)
    ON DELETE SET NULL;
 
ALTER TABLE JOGO_LISTA ADD CONSTRAINT FK_JOGO_LISTA_1
    FOREIGN KEY (fk_Jogo_id)
    REFERENCES JOGO (id)
    ON DELETE SET NULL;
 
ALTER TABLE JOGO_LISTA ADD CONSTRAINT FK_JOGO_LISTA_2
    FOREIGN KEY (fk_Lista_id)
    REFERENCES LISTA (id)
    ON DELETE SET NULL;