import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

interface JogoLista {
  fk_Jogo_id: number;
  fk_Lista_id: number;
}

// Adicionar jogo à lista
router.post('/', async (req: Request, res: Response) => {
  const { fk_Jogo_id, fk_Lista_id }: JogoLista = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO JOGO_LISTA (fk_Jogo_id, fk_Lista_id) VALUES ($1, $2) RETURNING *',
      [fk_Jogo_id, fk_Lista_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Listar relações
router.get('/', async (req: Request, res: Response) => {
  const { fk_Lista_id } = req.query;
  let result;
  if (fk_Lista_id) {
    result = await pool.query('SELECT * FROM JOGO_LISTA WHERE fk_Lista_id = $1', [fk_Lista_id]);
  } else {
    result = await pool.query('SELECT * FROM JOGO_LISTA');
  }
  res.json(result.rows);
});

// DELETE /listas/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const listaId = req.params.id;

  try {
    // 1. Remove os jogos associados da tabela intermediária
    await pool.query('DELETE FROM JOGO_LISTA WHERE fk_lista_id = $1', [listaId]);

    // 2. Agora pode remover a lista com segurança
    await pool.query('DELETE FROM LISTA WHERE id = $1', [listaId]);

    res.status(204).send(); // Sucesso, sem conteúdo
  } catch (error: any) {
    console.error('Erro ao deletar lista:', error);
    res.status(500).json({ erro: 'Erro ao deletar lista' });
  }
});

export default router;
