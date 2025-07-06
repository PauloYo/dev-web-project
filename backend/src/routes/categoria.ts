import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

interface Categoria {
  id?: number;
  descricao: string;
}

router.post('/', async (req: Request, res: Response) => {
  const { descricao }: { descricao: string } = req.body;
  try {
    const result = await pool.query('INSERT INTO CATEGORIA (descricao) VALUES ($1) RETURNING *', [descricao]);
    res.status(201).json(result.rows[0]);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM CATEGORIA');
    res.json(result.rows);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM CATEGORIA WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Categoria não encontrada' });
    res.json(result.rows[0]);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { descricao }: { descricao: string } = req.body;
  try {
    const result = await pool.query('UPDATE CATEGORIA SET descricao=$1 WHERE id=$2 RETURNING *', [descricao, req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Categoria não encontrada' });
    res.json(result.rows[0]);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('DELETE FROM CATEGORIA WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Categoria não encontrada' });
    res.json({ message: 'Categoria deletada' });
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

export default router;
