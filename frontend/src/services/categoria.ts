import type { Categoria, CreateCategoriaDTO } from "../types/api";

export class CategoriaService {
    private static readonly BASE_URL = 'http://localhost:3001/categorias';

    static async getAll(): Promise<Categoria[]> {
        const response = await fetch(this.BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch categorias');
        }
        return response.json();
    }

    static async getById(id: number): Promise<Categoria> {
        const response = await fetch(`${this.BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch categoria');
        }
        return response.json();
    }

    static async getByIds(ids: number[]): Promise<Categoria[]> {
        const response = await fetch(`${this.BASE_URL}/batch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids }),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch categorias by IDs');
        }
        return response.json();
    }

    static async create(categoria: CreateCategoriaDTO): Promise<Categoria> {
        const response = await fetch(this.BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoria),
        });
        if (!response.ok) {
            throw new Error('Failed to create categoria');
        }
        return response.json();
    }
}