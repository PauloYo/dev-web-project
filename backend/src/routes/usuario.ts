import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

interface Usuario {
  id?: number;
  imagem?: string;
  nome: string;
  senha: string;
  descricao?: string;
  email: string;
  ehAdmin: boolean;
}

router.post('/', async (req: Request, res: Response) => {
  const { imagem, nome, senha, descricao, email, ehAdmin }: Usuario = req.body;
  try {
    // Verifica se já existe usuário com o mesmo e-mail
    const existe = await pool.query('SELECT id FROM USUARIO WHERE email = $1', [email]);
    if (existe.rows.length > 0) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }
    const result = await pool.query(
      'INSERT INTO USUARIO (imagem, nome, senha, descricao, email, ehAdmin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [imagem, nome, senha, descricao, email, ehAdmin]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM USUARIO');
    res.json(result.rows);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM USUARIO WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(result.rows[0]);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { imagem, nome, senha, descricao, email, ehAdmin }: Usuario = req.body;
  try {
    const result = await pool.query(
      'UPDATE USUARIO SET imagem=$1, nome=$2, senha=$3, descricao=$4, email=$5, ehAdmin=$6 WHERE id=$7 RETURNING *',
      [imagem, nome, senha, descricao, email, ehAdmin, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(result.rows[0]);
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('DELETE FROM USUARIO WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ message: 'Usuário deletado' });
  } catch (err: any) { 
    res.status(500).json({ error: err.message }); 
  }
});

router.patch('/:id/imagem', async (req: Request, res: Response) => {
  const { imagem }: { imagem: string } = req.body;
  try {
    const result = await pool.query(
      'UPDATE USUARIO SET imagem=$1 WHERE id=$2 RETURNING *',
      [imagem, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/descricao', async (req: Request, res: Response) => {
  const { descricao }: { descricao: string } = req.body;
  try {
    const result = await pool.query(
      'UPDATE USUARIO SET descricao=$1 WHERE id=$2 RETURNING *',
      [descricao, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id/nome', async (req: Request, res: Response) => {
  const { nome }: { nome: string } = req.body;
  try {
    const result = await pool.query(
      'UPDATE USUARIO SET nome=$1 WHERE id=$2 RETURNING *',
      [nome, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
