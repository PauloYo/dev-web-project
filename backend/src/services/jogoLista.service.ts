import pool from '../config/database';
import { CreateJogoListaDTO } from '../models/jogoLista.model';

export class JogoListaService {
    static async create(data: CreateJogoListaDTO) {
        const { fk_Jogo_id, fk_Lista_id } = data;
        const result = await pool.query(
            'INSERT INTO JOGO_LISTA (fk_Jogo_id, fk_Lista_id) VALUES ($1, $2) RETURNING *',
            [fk_Jogo_id, fk_Lista_id]
        );
        return result.rows[0];
    }

    static async getAll(fk_Lista_id?: string) {
        if (fk_Lista_id) {
            const result = await pool.query('SELECT * FROM JOGO_LISTA WHERE fk_Lista_id = $1', [fk_Lista_id]);
            return result.rows;
        }
        const result = await pool.query('SELECT * FROM JOGO_LISTA');
        return result.rows;
    }

    static async delete(data: CreateJogoListaDTO): Promise<boolean> {
        const { fk_Jogo_id, fk_Lista_id } = data;
        const result = await pool.query(
            'DELETE FROM JOGO_LISTA WHERE fk_Jogo_id=$1 AND fk_Lista_id=$2 RETURNING *',
            [fk_Jogo_id, fk_Lista_id]
        );
        return result.rows.length > 0;
    }
}
