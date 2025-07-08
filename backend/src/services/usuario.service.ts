import pool from '../config/database';
import { CreateUsuarioDTO, Usuario } from '../models/usuario.model';

export class UsuarioService {
  static async create(data: CreateUsuarioDTO): Promise<Usuario> {
    try {
      // Verifica se já existe usuário com o mesmo e-mail
      const existe = await pool.query('SELECT id FROM USUARIO WHERE email = $1', [data.email]);
      if (existe.rows.length > 0) {
        throw new Error('E-mail já cadastrado.');
      }
      
      const result = await pool.query(
        'INSERT INTO USUARIO (imagem, nome, senha, descricao, email, ehAdmin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [data.imagem, data.nome, data.senha, data.descricao, data.email, data.ehAdmin]
      );

      return result.rows[0];
    } catch (error: any) {
      // Se for erro do banco, relança com mensagem mais clara
      if (error.code === '23505') {
        throw new Error('E-mail já cadastrado.');
      }
      
      // Relança outros erros
      throw error;
    }
  }

  static async getAll(): Promise<Usuario[]> {
    const result = await pool.query('SELECT * FROM USUARIO');
    return result.rows;
  }

  static async getById(id: number): Promise<Usuario | null> {
    const result = await pool.query('SELECT * FROM USUARIO WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async update(id: number, data: CreateUsuarioDTO): Promise<Usuario | null> {

    const result = await pool.query(
      'UPDATE USUARIO SET imagem=$1, nome=$2, senha=$3, descricao=$4, email=$5, ehAdmin=$6 WHERE id=$7 RETURNING *',
      [data.imagem, data.nome, data.senha, data.descricao, data.email, data.ehAdmin, id]
    );

    return result.rows[0] || null;
  }

  static async updateImagem(id: number, imagem: string): Promise<Usuario | null> {
    
    const result = await pool.query(
      'UPDATE USUARIO SET imagem=$1 WHERE id=$2 RETURNING *',
      [imagem, id]
    );

    return result.rows[0] || null;
  }

  static async updateDescricao(id: number, descricao: string): Promise<Usuario | null> {

    const result = await pool.query(
      'UPDATE USUARIO SET descricao=$1 WHERE id=$2 RETURNING *',
      [descricao, id]
    );

    return result.rows[0] || null;
  }

  static async updateNome(id: number, nome: string): Promise<Usuario | null> {

    const result = await pool.query(
      'UPDATE USUARIO SET nome=$1 WHERE id=$2 RETURNING *',
      [nome, id]
    );

    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM USUARIO WHERE id=$1 RETURNING *', [id]);
    return result.rows.length > 0;
  }
}
