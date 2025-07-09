import type { Plataforma, CreatePlataformaDTO } from "../types/api";

export class PlataformasService {
    private static readonly BASE_URL = 'http://localhost:3001/plataformas';

    static async getAll(): Promise<Plataforma[]> {
        const response = await fetch(this.BASE_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar plataformas');
        }
        return response.json();
    }

    static async getById(id: number): Promise<Plataforma> {
        const response = await fetch(`${this.BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar plataforma');
        }
        return response.json();
    }

    static async getByIds(ids: number[]): Promise<Plataforma[]> {
        const response = await fetch(`${this.BASE_URL}/batch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids })
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar plataformas por IDs');
        }
        return response.json();
    }

    static async create(plataforma: CreatePlataformaDTO): Promise<Plataforma> {
        const response = await fetch(this.BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plataforma)
        });
        if (!response.ok) {
            throw new Error('Erro ao criar plataforma');
        }
        return response.json();
    }

    static async update(id: number, plataforma: CreatePlataformaDTO): Promise<Plataforma> {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plataforma)
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar plataforma');
        }
        return response.json();
    }

    static async delete(id: number): Promise<boolean> {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar plataforma');
        }
        return response.status === 204; // No Content
    }
}