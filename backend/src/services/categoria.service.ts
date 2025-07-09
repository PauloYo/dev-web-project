import pool from '../config/database';
import { Categoria } from '../models/categoria.model';

export class CategoriaService {
  static async create(descricao: string): Promise<Categoria> {
    const result = await pool.query(
      'INSERT INTO CATEGORIA (descricao) VALUES ($1) RETURNING *',
      [descricao]
    );
    return result.rows[0];
  }

  static async getAll(): Promise<Categoria[]> {
    const result = await pool.query('SELECT * FROM CATEGORIA');
    return result.rows;
  }

  static async getById(id: number): Promise<Categoria | null> {
    const result = await pool.query('SELECT * FROM CATEGORIA WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async getByIds(ids: number[]): Promise<Categoria[]> {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new Error('IDs inválidos');
    }
    const result = await pool.query(
      'SELECT * FROM CATEGORIA WHERE id = ANY($1::int[])',
      [ids]
    );
    return result.rows;
  }

  static async update(id: number, descricao: string): Promise<Categoria | null> {
    const result = await pool.query(
      'UPDATE CATEGORIA SET descricao=$1 WHERE id=$2 RETURNING *',
      [descricao, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM CATEGORIA WHERE id=$1 RETURNING *', [id]);
    return result.rows.length > 0;
  }
}
