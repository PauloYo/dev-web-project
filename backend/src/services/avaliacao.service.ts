import pool from '../config/database';
import { CreateAvaliacaoDTO, Avaliacao } from '../models/avaliacao.model';

export class AvaliacaoService {
  static async create(data: CreateAvaliacaoDTO): Promise<Avaliacao> {
    const { nota, fk_Jogo_id, fk_Usuario_id } = data;
    const result = await pool.query(
      'INSERT INTO AVALIACAO (nota, fk_Jogo_id, fk_Usuario_id) VALUES ($1, $2, $3) RETURNING *',
      [nota, fk_Jogo_id, fk_Usuario_id]
    );
    return result.rows[0];
  }

  static async getAll(): Promise<Avaliacao[]> {
    const result = await pool.query('SELECT * FROM AVALIACAO');
    return result.rows;
  }

  static async getById(id: number): Promise<Avaliacao | null> {
    const result = await pool.query('SELECT * FROM AVALIACAO WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async update(id: number, data: CreateAvaliacaoDTO): Promise<Avaliacao | null> {
    const { nota, fk_Jogo_id, fk_Usuario_id } = data;
    const result = await pool.query(
      'UPDATE AVALIACAO SET nota=$1, fk_Jogo_id=$2, fk_Usuario_id=$3 WHERE id=$4 RETURNING *',
      [nota, fk_Jogo_id, fk_Usuario_id, id]
    );
    return result.rows[0] || null;
  }

  static async updateNota(id: number, nota: number): Promise<Avaliacao | null> {
    const result = await pool.query(
      'UPDATE AVALIACAO SET nota=$1 WHERE id=$2 RETURNING *',
      [nota, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM AVALIACAO WHERE id=$1 RETURNING *', [id]);
    return result.rows.length > 0;
  }
}
