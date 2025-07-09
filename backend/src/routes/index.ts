import { Express } from 'express';
import categoriaRouter from './allRoutes/categoria.route';
import usuarioRouter from './allRoutes/usuario.route';
import plataformaRouter from './allRoutes/plataforma.route';
import jogoRouter from './allRoutes/jogo.route';
import avaliacaoRouter from './allRoutes/avaliacao.route';
import comentarioRouter from './allRoutes/comentario.route';
import listaRouter from './allRoutes/lista.route';
import jogoPlataformaRouter from './allRoutes/jogoPlataforma.route';
import jogoCategoriaRouter from './allRoutes/jogoCategoria.route';
import jogoListaRouter from './allRoutes/jogoLista.route';

export default function setupRoutes(app: Express) {
  app.use('/categorias', categoriaRouter);
  app.use('/usuarios', usuarioRouter);
  app.use('/plataformas', plataformaRouter);
  app.use('/jogos', jogoRouter);
  app.use('/avaliacoes', avaliacaoRouter);
  app.use('/comentarios', comentarioRouter);
  app.use('/listas', listaRouter);
  app.use('/jogos-plataformas', jogoPlataformaRouter);
  app.use('/jogos-categorias', jogoCategoriaRouter);
  app.use('/jogos-listas', jogoListaRouter);
}