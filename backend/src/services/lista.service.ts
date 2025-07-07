import pool from '../config/database';
import { Lista, CreateListaDTO } from '../models/lista.model';

export class ListaService {
  static async create(data: CreateListaDTO): Promise<CreateListaDTO> {
    const { nome, ehPublico, fk_Usuario_id } = data;
    const result = await pool.query(
      'INSERT INTO LISTA (nome, ehPublico, fk_Usuario_id) VALUES ($1, $2, $3) RETURNING *',
      [nome, ehPublico, fk_Usuario_id]
    );
    return result.rows[0];
  }

  static async getAll(fk_Usuario_id?: number): Promise<Lista[]> {
    if (fk_Usuario_id) {
      const result = await pool.query('SELECT * FROM LISTA WHERE fk_Usuario_id = $1', [fk_Usuario_id]);
      return result.rows;
    }
    const result = await pool.query('SELECT * FROM LISTA');
    return result.rows;
  }

  static async getById(id: number): Promise<Lista | null> {
    const result = await pool.query('SELECT * FROM LISTA WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async update(id: number, data: CreateListaDTO): Promise<Lista | null> {
    const { nome, ehPublico, fk_Usuario_id } = data;
    const result = await pool.query(
      'UPDATE LISTA SET nome=$1, ehPublico=$2, fk_Usuario_id=$3 WHERE id=$4 RETURNING *',
      [nome, ehPublico, fk_Usuario_id, id]
    );
    return result.rows[0] || null;
  }

  static async updateNome(id: number, nome: string): Promise<Lista | null> {
    const result = await pool.query(
      'UPDATE LISTA SET nome=$1 WHERE id=$2 RETURNING *',
      [nome, id]
    );
    return result.rows[0] || null;
  }

  static async updateStatus(id: number, ehPublico: boolean): Promise<Lista | null> {
    const result = await pool.query(
      'UPDATE LISTA SET ehPublico=$1 WHERE id=$2 RETURNING *',
      [ehPublico, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    // Remove os jogos associados da tabela intermediária
    await pool.query('DELETE FROM JOGO_LISTA WHERE fk_lista_id = $1', [id]);
    // Remove a lista
    const result = await pool.query('DELETE FROM LISTA WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0;
  }
}
