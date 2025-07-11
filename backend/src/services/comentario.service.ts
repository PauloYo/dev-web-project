import pool from '../config/database';
import { Comentario, CreateComentarioDTO } from '../models/comentario.model';

export class ComentarioService {
  static async create(data: CreateComentarioDTO): Promise<Comentario> {
    try {
      const { descricao, fk_avaliacao_id } = data;
      
      // Validar se a avaliação existe
      const avaliacaoExists = await pool.query(
        'SELECT id FROM AVALIACAO WHERE id = $1',
        [fk_avaliacao_id]
      );
      
      if (avaliacaoExists.rows.length === 0) {
        throw new Error('Avaliação não encontrada');
      }
      
      const result = await pool.query(
        'INSERT INTO COMENTARIO (descricao, fk_Avaliacao_id) VALUES ($1, $2) RETURNING *',
        [descricao, fk_avaliacao_id]
      );
      
      return result.rows[0];
    } catch (error: any) {
      console.error('Erro no ComentarioService.create:', error);
      throw new Error(error.message || 'Erro ao criar comentário');
    }
  }

  static async getAll(): Promise<Comentario[]> {
    try {
      const result = await pool.query('SELECT * FROM COMENTARIO');
      return result.rows;
    } catch (error: any) {
      console.error('Erro no ComentarioService.getAll:', error);
      throw new Error('Erro ao buscar comentários');
    }
  }

  static async getById(id: number): Promise<Comentario | null> {
    try {
      const result = await pool.query('SELECT * FROM COMENTARIO WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error: any) {
      console.error('Erro no ComentarioService.getById:', error);
      throw new Error('Erro ao buscar comentário');
    }
  }

  static async getByAvaliacaoId(fk_avaliacao_id: number): Promise<Comentario | null> {
    try {
      const result = await pool.query(
        'SELECT * FROM COMENTARIO WHERE fk_Avaliacao_id = $1',
        [fk_avaliacao_id]
      );
      
      return result.rows[0] || null;
    } catch (error: any) {
      console.error('Erro no ComentarioService.getByAvaliacaoId:', error);
      throw new Error('Erro ao buscar comentário por avaliação');
    }
  }

  static async update(id: number, data: CreateComentarioDTO): Promise<Comentario | null> {
    try {
      const { descricao, fk_avaliacao_id } = data;
      const result = await pool.query(
        'UPDATE COMENTARIO SET descricao=$1, fk_Avaliacao_id=$2 WHERE id=$3 RETURNING *',
        [descricao, fk_avaliacao_id, id]
      );
      return result.rows[0] || null;
    } catch (error: any) {
      console.error('Erro no ComentarioService.update:', error);
      throw new Error('Erro ao atualizar comentário');
    }
  }

  static async updateDescricao(id: number, descricao: string): Promise<Comentario | null> {
    try {
      // Verificar se o comentário existe
      const exists = await pool.query('SELECT id FROM COMENTARIO WHERE id = $1', [id]);
      if (exists.rows.length === 0) {
        throw new Error('Comentário não encontrado');
      }
      
      const result = await pool.query(
        'UPDATE COMENTARIO SET descricao=$1 WHERE id=$2 RETURNING *',
        [descricao, id]
      );
      
      return result.rows[0] || null;
    } catch (error: any) {
      console.error('Erro no ComentarioService.updateDescricao:', error);
      throw new Error(error.message || 'Erro ao atualizar descrição do comentário');
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      const result = await pool.query('DELETE FROM COMENTARIO WHERE id=$1 RETURNING *', [id]);
      return result.rows.length > 0;
    } catch (error: any) {
      console.error('Erro no ComentarioService.delete:', error);
      throw new Error('Erro ao deletar comentário');
    }
  }
}
