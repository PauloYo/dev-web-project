import pool from '../config/database';
import { CreateJogoDTO, Jogo } from '../models/jogo.model';

export class JogoService {
  static async create(data: CreateJogoDTO): Promise<Jogo> {
    const { nome, descricao, imagem } = data;
    const result = await pool.query(
      'INSERT INTO JOGO (nome, descricao, imagem) VALUES ($1, $2, $3) RETURNING *',
      [nome, descricao, imagem]
    );
    return result.rows[0];
  }

  static async getAll(): Promise<Jogo[]> {
    const result = await pool.query(
      'SELECT * FROM JOGO'
    );
    return result.rows;

  }

  static async getByName(nome: string): Promise<Jogo[]> {
    const result = await pool.query(
      'SELECT * FROM JOGO WHERE nome ILIKE $1',
      [`%${nome}%`]
    );
    return result.rows;
  }

  static async getById(id: number): Promise<Jogo | null> {
    const result = await pool.query('SELECT * FROM JOGO WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async getByIds(ids: number[]): Promise<Jogo[]> {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new Error('IDs inválidos');
    }
    const result = await pool.query(
      'SELECT * FROM JOGO WHERE id = ANY($1::int[])',
      [ids]
    );
    return result.rows;
  }

  static async getRatingById(id: number): Promise<number> {
    const result = await pool.query(
      'SELECT AVG(nota) as rating FROM AVALIACAO WHERE fk_Jogo_id = $1',
      [id]
    );
    return parseFloat(result.rows[0].rating) || 0;
  }

  static async getTotalUserRatingsById(id: number): Promise<number> {
    const result = await pool.query(
      'SELECT COUNT(*) as totalUserRatings FROM AVALIACAO WHERE fk_Jogo_id = $1',
      [id]
    );
    return parseInt(result.rows[0].totalUserRatings, 10) || 0;
  }

  static async update(id: number, data: CreateJogoDTO): Promise<Jogo | null> {
    const { nome, descricao, imagem } = data;
    const result = await pool.query(
      'UPDATE JOGO SET nome=$1, descricao=$2, imagem=$3 WHERE id=$4 RETURNING *',
      [nome, descricao, imagem, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM JOGO WHERE id=$1 RETURNING *', [id]);
    return result.rows.length > 0;
  }

  static async updateDesenvolvedor(id: number, desenvolvedor: string) {
    const result = await pool.query(
      'UPDATE JOGO SET desenvolvedor = $1 WHERE id = $2 RETURNING *',
      [desenvolvedor, id]
    );
    return result.rows[0];
  }

}
