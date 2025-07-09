import type { Lista, CreateListaDTO } from '../types/api';

export class ListasService {
    private static readonly BASE_URL = 'http://localhost:3001/listas';

    static async getAll(): Promise<Lista[]> {
        const response = await fetch(this.BASE_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar listas');
        }
        return response.json();
    }

    static async getById(id: number): Promise<Lista> {
        const response = await fetch(`${this.BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar lista');
        }
        return response.json();
    }

    static async create(lista: CreateListaDTO): Promise<Lista> {
        const response = await fetch(this.BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lista)
        });
        if (!response.ok) {
            throw new Error('Erro ao criar lista');
        }
        return response.json();
    }

    static async update(id: number, lista: CreateListaDTO): Promise<Lista> {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lista)
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar lista');
        }
        return response.json();
    }

    static async delete(id: number): Promise<boolean> {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar lista');
        }
        return response.status === 204; 
    }
}