Para rodar o database use "node server.js" estando na pasta backend

######

Testes Que Fiz (Devem ser feitos no cmd do windows mesmo)

######
CATEGORIA

curl -X POST http://localhost:3001/categorias -H "Content-Type: application/json" -d "{\"descricao\":\"Ação\"}"

curl http://localhost:3001/categorias

curl http://localhost:3001/categorias/1

curl -X PUT http://localhost:3001/categorias/1 -H "Content-Type: application/json" -d "{\"descricao\":\"Aventura\"}"

curl -X DELETE http://localhost:3001/categorias/1

#####

USUARIO

curl -X POST http://localhost:3001/usuarios -H "Content-Type: application/json" -d "{\"imagem\":\"url\",\"nome\":\"João\",\"senha\":\"123\",\"descricao\":\"desc\",\"email\":\"joao@email.com\",\"ehAdmin\":false}"

curl http://localhost:3001/usuarios

curl http://localhost:3001/usuarios/1
curl -X PUT http://localhost:3001/usuarios/1 -H "Content-Type: application/json" -d "{\"nome\":\"João Atualizado\"}"

curl -X DELETE http://localhost:3001/usuarios/1

curl -X PATCH http://localhost:3001/usuarios/1/imagem -H "Content-Type: application/json" -d "{\"imagem\":\"https://novaurl.com/imagem.jpg\"}"

curl -X PATCH http://localhost:3001/usuarios/1/descricao -H "Content-Type: application/json" -d "{\"descricao\":\"Nova descrição\"}"

curl -X PATCH http://localhost:3001/usuarios/1/nome -H "Content-Type: application/json" -d "{\"nome\":\"Novo Nome\"}"

#####

PLATAFORMA

curl -X POST http://localhost:3001/plataformas -H "Content-Type: application/json" -d "{\"descricao\":\"PC\"}"

curl http://localhost:3001/plataformas

curl http://localhost:3001/plataformas/1

curl -X PUT http://localhost:3001/plataformas/1 -H "Content-Type: application/json" -d "{\"descricao\":\"PlayStation\"}"

curl -X DELETE http://localhost:3001/plataformas/1

#####

JOGO

curl -X POST http://localhost:3001/jogos -H "Content-Type: application/json" -d "{\"nome\":\"The Witcher 3\",\"descricao\":\"RPG de mundo aberto.\",\"imagem\":\"https://exemplo.com/witcher3.jpg\"}"

curl http://localhost:3001/jogos

curl http://localhost:3001/jogos/1

curl -X PUT http://localhost:3001/jogos/1 -H "Content-Type: application/json" -d "{\"nome\":\"The Witcher 3 Atualizado\"}"

curl -X DELETE http://localhost:3001/jogos/1

#####

AVALIACAO

curl -X POST http://localhost:3001/avaliacoes -H "Content-Type: application/json" -d "{\"nota\":10,\"fk_Jogo_id\":1,\"fk_Usuario_id\":1}"

curl http://localhost:3001/avaliacoes

curl http://localhost:3001/avaliacoes/1

curl -X PUT http://localhost:3001/avaliacoes/1 -H "Content-Type: application/json" -d "{\"nota\":8,\"fk_Jogo_id\":1,\"fk_Usuario_id\":1}"

curl -X DELETE http://localhost:3001/avaliacoes/1

curl -X PATCH http://localhost:3001/avaliacoes/1/nota -H "Content-Type: application/json" -d "{\"nota\":8}"

#####

COMENTARIO

curl -X POST http://localhost:3001/comentarios -H "Content-Type: application/json" -d "{\"descricao\":\"Ótimo jogo!\",\"fk_Avaliacao_id\":1}"

curl http://localhost:3001/comentarios

curl http://localhost:3001/comentarios/1

curl -X PUT http://localhost:3001/comentarios/1 -H "Content-Type: application/json" -d "{\"descricao\":\"Jogo excelente!\",\"fk_Avaliacao_id\":1}"

curl -X DELETE http://localhost:3001/comentarios/1

#####

LISTA

curl -X POST http://localhost:3001/listas -H "Content-Type: application/json" -d "{\"nome\":\"Favoritos\",\"ehPublico\":true,\"fk_Usuario_id\":1}"

curl http://localhost:3001/listas

curl http://localhost:3001/listas/1

curl -X PUT http://localhost:3001/listas/1 -H "Content-Type: application/json" -d "{\"nome\":\"Favoritos Atualizada\",\"ehPublico\":false,\"fk_Usuario_id\":1}"

curl -X DELETE http://localhost:3001/listas/1

#####

JOGO_PLATAFORMA (relacionamento)

curl -X POST http://localhost:3001/jogo_plataforma -H "Content-Type: application/json" -d "{\"fk_Plataforma_id\":1,\"fk_Jogo_id\":1}"

curl http://localhost:3001/jogo_plataforma

curl -X DELETE http://localhost:3001/jogo_plataforma -H "Content-Type: application/json" -d "{\"fk_Plataforma_id\":1,\"fk_Jogo_id\":1}"

#####

CATEGORIA_JOGO (relacionamento)

curl -X POST http://localhost:3001/categoria_jogo -H "Content-Type: application/json" -d "{\"fk_Categoria_id\":1,\"fk_Jogo_id\":1}"

curl http://localhost:3001/categoria_jogo

curl -X DELETE http://localhost:3001/categoria_jogo -H "Content-Type: application/json" -d "{\"fk_Categoria_id\":1,\"fk_Jogo_id\":1}"

#####

JOGO_LISTA (relacionamento)

curl -X POST http://localhost:3001/jogo_lista -H "Content-Type: application/json" -d "{\"fk_Jogo_id\":1,\"fk_Lista_id\":1}"

curl http://localhost:3001/jogo_lista

curl -X DELETE http://localhost:3001/jogo_lista -H "Content-Type: application/json" -d "{\"fk_Jogo_id\":1,\"fk_Lista_id\":1}"