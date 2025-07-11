import pool from '../config/database';
import { CreateJogoPlataformaDTO, JogoPlataforma } from '../models/jogoPlataforma.model';

export class JogoPlataformaService {
    static async create(data: CreateJogoPlataformaDTO) {
        const { fk_plataforma_id, fk_jogo_id } = data;
        const result = await pool.query(
            'INSERT INTO JOGO_PLATAFORMA (fk_Plataforma_id, fk_Jogo_id) VALUES ($1, $2) RETURNING *',
            [fk_plataforma_id, fk_jogo_id]
        );
        return result.rows[0];
    }

    static async getAll() {
        const result = await pool.query('SELECT * FROM JOGO_PLATAFORMA');
        return result.rows;
    }

    static async getByJogoId(fk_Jogo_id: number) : Promise<JogoPlataforma[]> {
        const result = await pool.query(
            'SELECT * FROM JOGO_PLATAFORMA WHERE fk_Jogo_id = $1',
            [fk_Jogo_id]
        );
        return result.rows;
    }

    static async delete(data: CreateJogoPlataformaDTO): Promise<boolean> {
        const { fk_plataforma_id, fk_jogo_id } = data;
        const result = await pool.query(
            'DELETE FROM JOGO_PLATAFORMA WHERE fk_Plataforma_id=$1 AND fk_Jogo_id=$2 RETURNING *',
            [fk_plataforma_id, fk_jogo_id]
        );
        return result.rows.length > 0;
    }
}
