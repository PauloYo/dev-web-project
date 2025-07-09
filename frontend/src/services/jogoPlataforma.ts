import type { JogoPlataforma } from "../types/api";

export class JogoPlataformaService {
    private static readonly BASE_URL = 'http://localhost:3001/jogos-plataformas';

    static async getAll(): Promise<JogoPlataforma[]> {
        const response = await fetch(`${this.BASE_URL}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar jogos e plataformas');
        }
        return response.json();
    }

    static async getByJogoId(fk_Jogo_id: number): Promise<JogoPlataforma[]> {
        const response = await fetch(`${this.BASE_URL}/jogo/${fk_Jogo_id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar plataformas para o jogo');
        }
        return response.json();
    }

    static async create(data: JogoPlataforma): Promise<JogoPlataforma> {
        const response = await fetch(this.BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Erro ao criar relação jogo-plataforma');
        }
        return response.json();
    }

    static async delete(data: JogoPlataforma): Promise<boolean> {
        const response = await fetch(this.BASE_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar relação jogo-plataforma');
        }
        return response.status === 204; // No Content
    }
}