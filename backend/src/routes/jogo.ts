import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

interface Jogo {
  id?: number;
  nome: string;
  descricao?: string;
  imagem?: string;
}

router.post('/', async (req: Request, res: Response) => {
  const { nome, descricao, imagem }: Jogo = req.body;
  try {
    const result = await pool.query('INSERT INTO JOGO (nome, descricao, imagem) VALUES ($1, $2, $3) RETURNING *', [nome, descricao, imagem]);
    res.status(201).json(result.rows[0]);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const { nome } = req.query;
    let result;
    if (nome) {
      result = await pool.query(
        'SELECT * FROM JOGO WHERE LTRIM(nome) ILIKE $1',
        [`${nome}%`]
      );
    } else {
      result = await pool.query(`
        SELECT 
          j.id AS jogo_id,
          j.nome AS jogo_nome,
          j.descricao,
          j.imagem,
          json_agg(
            DISTINCT jsonb_build_object('id', c.id, 'descricao', c.descricao)
          ) FILTER (WHERE c.id IS NOT NULL) AS categorias,
          json_agg(
            DISTINCT jsonb_build_object('id', p.id, 'descricao', p.descricao)
          ) FILTER (WHERE p.id IS NOT NULL) AS plataformas
        FROM JOGO j
        LEFT JOIN CATEGORIA_JOGO cj ON cj.fk_jogo_id = j.id
        LEFT JOIN CATEGORIA c ON c.id = cj.fk_categoria_id
        LEFT JOIN JOGO_PLATAFORMA pj ON pj.fk_jogo_id = j.id
        LEFT JOIN PLATAFORMA p ON p.id = pj.fk_plataforma_id
        GROUP BY j.id;
      `);
    }
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM JOGO WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json(result.rows[0]);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { nome, descricao, imagem }: Jogo = req.body;
  try {
    const result = await pool.query('UPDATE JOGO SET nome=$1, descricao=$2, imagem=$3 WHERE id=$4 RETURNING *', [nome, descricao, imagem, req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json(result.rows[0]);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('DELETE FROM JOGO WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json({ message: 'Jogo deletado' });
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

// Rota POST /jogos/batch
router.post('/batch', async (req: Request, res: Response) => {
  const { ids }: { ids: number[] } = req.body; // espera { ids: [1,2,3] }
  try {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'IDs inválidos' });
    }
    const result = await pool.query(
      'SELECT * FROM JOGO WHERE id = ANY($1::int[])',
      [ids]
    );
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
