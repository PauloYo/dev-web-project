import type { JogoLista, CreateJogoListaDTO } from "../types/api";

export class JogoListaService {
    private static readonly BASE_URL = 'http://localhost:3001/jogos-listas';

    static async create(jogoLista: CreateJogoListaDTO): Promise<JogoLista> {
        const response = await fetch(this.BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jogoLista),
        });
        if (!response.ok) {
            throw new Error('Failed to create jogo-lista');
        }
        return response.json();
    }
    static async getByListaId(listaId: number): Promise<JogoLista[]> {
        const response = await fetch(`${this.BASE_URL}/lista/${listaId}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar jogos da lista');
        }
        return response.json();
    }
    static async delete(jogoLista: JogoLista): Promise<boolean> {
        const response = await fetch(this.BASE_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jogoLista),
        });
        if (!response.ok) {
            throw new Error('Failed to delete jogo-lista');
        }
        return response.status === 204; // No Content
    }
}