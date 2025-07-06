import express from 'express';
import cors from 'cors';
import categoriaRouter from './routes/categoria';
import usuarioRouter from './routes/usuario';
import plataformaRouter from './routes/plataforma';
import jogoRouter from './routes/jogo';
import avaliacaoRouter from './routes/avaliacao';
import comentarioRouter from './routes/comentario';
import listaRouter from './routes/lista';
import jogoPlataformaRouter from './routes/jogo_plataforma';
import categoriaJogoRouter from './routes/categoria_jogo';
import jogoListaRouter from './routes/jogo_lista';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/categorias', categoriaRouter);
app.use('/usuarios', usuarioRouter);
app.use('/plataformas', plataformaRouter);
app.use('/jogos', jogoRouter);
app.use('/avaliacoes', avaliacaoRouter);
app.use('/comentarios', comentarioRouter);
app.use('/listas', listaRouter);
app.use('/jogo_plataforma', jogoPlataformaRouter);
app.use('/categoria_jogo', categoriaJogoRouter);
app.use('/jogo_lista', jogoListaRouter);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
