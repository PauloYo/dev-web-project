import type { CategoriaJogo } from "../types/api";

export class JogoCategoriaService {
    private static readonly BASE_URL = 'http://localhost:3001/jogos-categorias';

    static async getByJogoId(fk_Jogo_id: number): Promise<CategoriaJogo[]> {
        const response = await fetch(`${this.BASE_URL}/jogo/${fk_Jogo_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch categorias for jogo');
        }
        return response.json();
    }

    static async create(data: CategoriaJogo): Promise<CategoriaJogo> {
        const response = await fetch(this.BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to create categoria for jogo');
        }
        return response.json();
    }

    static async delete(data: CategoriaJogo): Promise<boolean> {
        const response = await fetch(this.BASE_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.ok;
    }
}