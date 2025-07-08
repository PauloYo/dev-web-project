import pool from '../config/database';
import { Categoria } from '../models/categoria.model';
import { CreateJogoDTO, Jogo } from '../models/jogo.model';
import { Plataforma } from '../models/plataforma.model';

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

  // Mudei a consulta para algo um pouco mais fácil de ler e separei do getAll
  static async getAllWithDetails(): Promise<Jogo[]> {
    // const result = await pool.query(`
    //   SELECT 
    //     j.id AS jogo_id,
    //     j.nome AS jogo_nome,
    //     j.descricao,
    //     j.imagem,
    //     json_agg(
    //       DISTINCT jsonb_build_object('id', c.id, 'descricao', c.descricao)
    //     ) FILTER (WHERE c.id IS NOT NULL) AS categorias,
    //     json_agg(
    //       DISTINCT jsonb_build_object('id', p.id, 'descricao', p.descricao)
    //     ) FILTER (WHERE p.id IS NOT NULL) AS plataformas
    //   FROM JOGO j
    //   LEFT JOIN CATEGORIA_JOGO cj ON cj.fk_jogo_id = j.id
    //   LEFT JOIN CATEGORIA c ON c.id = cj.fk_categoria_id
    //   LEFT JOIN JOGO_PLATAFORMA pj ON pj.fk_jogo_id = j.id
    //   LEFT JOIN PLATAFORMA p ON p.id = pj.fk_plataforma_id
    //   GROUP BY j.id;
    // `);

    const jogos = await this.getAll();
    const categorias = await pool.query(`
      SELECT 
        j.id AS jogo_id,
        json_agg(jsonb_build_object('id', c.id, 'descricao', c.descricao)) AS categorias
      FROM JOGO j
      LEFT JOIN CATEGORIA_JOGO cj ON cj.fk_jogo_id = j.id
      LEFT JOIN CATEGORIA c ON c.id = cj.fk_categoria_id
      GROUP BY j.id;
    `);
    const plataformas = await pool.query(`
      SELECT 
        j.id AS jogo_id,
        json_agg(jsonb_build_object('id', p.id, 'descricao', p.descricao)) AS plataformas
      FROM JOGO j
      LEFT JOIN JOGO_PLATAFORMA jp ON jp.fk_jogo_id = j.id
      LEFT JOIN PLATAFORMA p ON p.id = jp.fk_plataforma_id
      GROUP BY j.id;
    `);

    const categoriasMap = new Map<number, Categoria[]>(categorias.rows.map(row => [row.jogo_id, row.categorias]));
    const plataformasMap = new Map<number, Plataforma[]>(plataformas.rows.map(row => [row.jogo_id, row.plataformas]));
    const result = jogos.map(jogo => ({
      ...jogo,
      categorias: categoriasMap.get(jogo.id) || [],
      plataformas: plataformasMap.get(jogo.id) || []
    }));

    return result;
  }

  // Ao invés de um parâmetro opicional no getAll, criei um método separado para obter por nome.
  static async getByName(nome: string): Promise<Jogo | null> {
    const result = await pool.query('SELECT * FROM JOGO WHERE nome = $1', [nome]);
    return result.rows[0] || null;
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
}
