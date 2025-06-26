const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/categorias', require('./routes/categoria.js'));
app.use('/usuarios', require('./routes/usuario.js'));
app.use('/plataformas', require('./routes/plataforma.js'));
app.use('/jogos', require('./routes/jogo.js'));
app.use('/avaliacoes', require('./routes/avaliacao.js'));
app.use('/comentarios', require('./routes/comentario.js'));
app.use('/listas', require('./routes/lista.js'));
app.use('/jogo_plataforma', require('./routes/jogo_plataforma.js'));
app.use('/categoria_jogo', require('./routes/categoria_jogo.js'));
app.use('/jogo_lista', require('./routes/jogo_lista.js'));

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});