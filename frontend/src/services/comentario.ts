import type { Comentario, CreateComentarioDTO } from '../types/api';

export class ComentarioService {
    private static BASE_URL = 'http://localhost:3001/comentarios';

    static async create(data: CreateComentarioDTO): Promise<Comentario> {
        // Validar dados antes de enviar
        if (!data.descricao || !data.fk_avaliacao_id) {
            throw new Error('Descrição e ID da avaliação são obrigatórios');
        }
        
        if (data.descricao.length > 500) {
            throw new Error('Descrição deve ter no máximo 500 caracteres');
        }
        
        const response = await fetch(this.BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro na resposta:', response.status, errorText);
            throw new Error(`Failed to create comentario`);
        }
        
        return response.json();
    }

    static async getAll(): Promise<Comentario[]> {
        const response = await fetch(this.BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch comentarios');
        }
        return response.json();
    }

    static async getById(id: number): Promise<Comentario | null> {
        const response = await fetch(`${this.BASE_URL}/${id}`);
        if (response.status === 404) {
            return null;
        }
        if (!response.ok) {
            throw new Error('Failed to fetch comentario');
        }
        return response.json();
    }

    static async getByAvaliacaoId(avaliacaoId: number): Promise<Comentario | null> {
        const response = await fetch(`${this.BASE_URL}/avaliacao/${avaliacaoId}`);
        if (response.status === 404) {
            console.log('Comentário não encontrado para avaliação:', avaliacaoId);
            return null;
        }
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro ao buscar comentário:', response.status, errorText);
            throw new Error('Failed to fetch comentario by avaliacao');
        }
        
        const result = await response.json();
        return result;
    }

    static async update(id: number, data: CreateComentarioDTO): Promise<Comentario> {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to update comentario');
        }
        return response.json();
    }

    static async updateDescricao(id: number, descricao: string): Promise<Comentario> {
        if (!descricao || descricao.trim() === '') {
            throw new Error('Descrição não pode estar vazia');
        }
        
        if (descricao.length > 500) {
            throw new Error('Descrição deve ter no máximo 500 caracteres');
        }
        
        const response = await fetch(`${this.BASE_URL}/${id}/descricao`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descricao: descricao.trim() })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro na resposta:', response.status, errorText);
            throw new Error(`Failed to update comentario`);
        }
        
        return response.json();
    }

    static async delete(id: number): Promise<boolean> {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete comentario');
        }
        return response.status === 200 || response.status === 204;
    }
}