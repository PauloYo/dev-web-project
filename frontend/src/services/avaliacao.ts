import type { CreateAvaliacaoDTO, Avaliacao } from "../types/api";

export class AvaliacaoService {
    private static readonly BASE_URL = 'http://localhost:3001/avaliacoes';

    static async create(avaliacao: CreateAvaliacaoDTO): Promise<Avaliacao> {
        const response = await fetch(this.BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(avaliacao),
        });
        if (!response.ok) {
            throw new Error('Failed to create avaliacao');
        }
        return response.json();
    }

    static async getAll(): Promise<Avaliacao[]> {
        const response = await fetch(this.BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch all avaliacoes');
        }
        return response.json();
    }

    static async getByUsuarioJogoId(fk_Usuario_id: number, fk_Jogo_id: number): Promise<Avaliacao | null> {
        const response = await fetch(`${this.BASE_URL}/usuario/${fk_Usuario_id}/jogo/${fk_Jogo_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch avaliacao by usuario and jogo');
        }
        return response.json();
    }

    static async updateNota(id: number, nota: number): Promise<Avaliacao> {
        const response = await fetch(`${this.BASE_URL}/${id}/nota`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nota }),
        });

        if (!response.ok) {
            throw new Error('Failed to update avaliacao nota');
        }

        return response.json();
    }

    static async delete(id: number): Promise<boolean> {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete avaliacao');
        }
        return response.status === 204;
    }
}