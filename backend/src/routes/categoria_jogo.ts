import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

interface CategoriaJogo {
  fk_Categoria_id: number;
  fk_Jogo_id: number;
}

router.post('/', async (req: Request, res: Response) => {
  const { fk_Categoria_id, fk_Jogo_id }: CategoriaJogo = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO CATEGORIA_JOGO (fk_Categoria_id, fk_Jogo_id) VALUES ($1, $2) RETURNING *',
      [fk_Categoria_id, fk_Jogo_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM CATEGORIA_JOGO');
    res.json(result.rows);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.delete('/', async (req: Request, res: Response) => {
  const { fk_Categoria_id, fk_Jogo_id }: CategoriaJogo = req.body;
  try {
    const result = await pool.query(
      'DELETE FROM CATEGORIA_JOGO WHERE fk_Categoria_id=$1 AND fk_Jogo_id=$2 RETURNING *',
      [fk_Categoria_id, fk_Jogo_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Relação não encontrada' });
    res.json({ message: 'Relação deletada' });
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

export default router;
