import pool from '../config/database';
import { Comentario, CreateComentarioDTO } from '../models/comentario.model';

export class ComentarioService {
  static async create(data: CreateComentarioDTO): Promise<Comentario> {
    const { descricao, fk_Avaliacao_id } = data;
    const result = await pool.query(
      'INSERT INTO COMENTARIO (descricao, fk_Avaliacao_id) VALUES ($1, $2) RETURNING *',
      [descricao, fk_Avaliacao_id]
    );
    return result.rows[0];
  }

  static async getAll(): Promise<Comentario[]> {
    const result = await pool.query('SELECT * FROM COMENTARIO');
    return result.rows;
  }

  static async getById(id: number): Promise<Comentario | null> {
    const result = await pool.query('SELECT * FROM COMENTARIO WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async update(id: number, data: CreateComentarioDTO): Promise<Comentario | null> {
    const { descricao, fk_Avaliacao_id } = data;
    const result = await pool.query(
      'UPDATE COMENTARIO SET descricao=$1, fk_Avaliacao_id=$2 WHERE id=$3 RETURNING *',
      [descricao, fk_Avaliacao_id, id]
    );
    return result.rows[0] || null;
  }

  static async updateDescricao(id: number, descricao: string): Promise<Comentario | null> {
    const result = await pool.query(
      'UPDATE COMENTARIO SET descricao=$1 WHERE id=$2 RETURNING *',
      [descricao, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM COMENTARIO WHERE id=$1 RETURNING *', [id]);
    return result.rows.length > 0;
  }
}
