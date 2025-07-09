import pool from '../config/database';
import { CreatePlataformaDTO, Plataforma } from '../models/plataforma.model';

export class PlataformaService {
  static async create(data: CreatePlataformaDTO): Promise<CreatePlataformaDTO> {
    const result = await pool.query(
      'INSERT INTO PLATAFORMA (descricao) VALUES ($1) RETURNING *',
      [data.descricao]
    );
    return result.rows[0];
  }

  static async getAll(): Promise<Plataforma[]> {
    const result = await pool.query('SELECT * FROM PLATAFORMA');
    return result.rows;
  }

  static async getById(id: number): Promise<Plataforma | null> {
    const result = await pool.query('SELECT * FROM PLATAFORMA WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async getByIds(ids: number[]): Promise<Plataforma[]> {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new Error('IDs inválidos');
    }
    const result = await pool.query(
      'SELECT * FROM PLATAFORMA WHERE id = ANY($1::int[])',
      [ids]
    );
    return result.rows;
  }

  static async update(id: number, descricao: string): Promise<Plataforma | null> {
    const result = await pool.query(
      'UPDATE PLATAFORMA SET descricao=$1 WHERE id=$2 RETURNING *',
      [descricao, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM PLATAFORMA WHERE id=$1 RETURNING *', [id]);
    return result.rows.length > 0;
  }
}
