import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

interface Comentario {
  id?: number;
  descricao: string;
  fk_Avaliacao_id: number;
}

router.post('/', async (req: Request, res: Response) => {
  const { descricao, fk_Avaliacao_id }: Comentario = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO COMENTARIO (descricao, fk_Avaliacao_id) VALUES ($1, $2) RETURNING *',
      [descricao, fk_Avaliacao_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM COMENTARIO');
    res.json(result.rows);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM COMENTARIO WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Comentário não encontrado' });
    res.json(result.rows[0]);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { descricao, fk_Avaliacao_id }: Comentario = req.body;
  try {
    const result = await pool.query(
      'UPDATE COMENTARIO SET descricao=$1, fk_Avaliacao_id=$2 WHERE id=$3 RETURNING *',
      [descricao, fk_Avaliacao_id, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Comentário não encontrado' });
    res.json(result.rows[0]);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.patch('/:id/descricao', async (req: Request, res: Response) => {
  const { descricao }: { descricao: string } = req.body;
  try {
    const result = await pool.query(
      'UPDATE COMENTARIO SET descricao=$1 WHERE id=$2 RETURNING *',
      [descricao, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Comentário não encontrado' });
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('DELETE FROM COMENTARIO WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Comentário não encontrado' });
    res.json({ message: 'Comentário deletado' });
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

export default router;
