import pool from '../config/database';
import { CreateCategoriaJogoDTO } from '../models/categoriaJogo.model';

export class CategoriaJogoService {
    static async create(data: CreateCategoriaJogoDTO) {
        const { fk_Categoria_id, fk_Jogo_id } = data;
        const result = await pool.query(
            'INSERT INTO CATEGORIA_JOGO (fk_Categoria_id, fk_Jogo_id) VALUES ($1, $2) RETURNING *',
            [fk_Categoria_id, fk_Jogo_id]
        );
        return result.rows[0];
    }

    static async getAll() {
        const result = await pool.query('SELECT * FROM CATEGORIA_JOGO');
        return result.rows;
    }

    static async delete(data: CreateCategoriaJogoDTO): Promise<boolean> {
        const { fk_Categoria_id, fk_Jogo_id } = data;
        const result = await pool.query(
            'DELETE FROM CATEGORIA_JOGO WHERE fk_Categoria_id=$1 AND fk_Jogo_id=$2 RETURNING *',
            [fk_Categoria_id, fk_Jogo_id]
        );
        return result.rows.length > 0;
    }
}
