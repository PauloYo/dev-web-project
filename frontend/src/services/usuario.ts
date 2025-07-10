import type { Usuario, CreateUsuarioDTO } from "../types/api";

export class UsuariosService {
    private static readonly BASE_URL = 'http://localhost:3001/usuarios';

    static async getAll(): Promise<Usuario[]> {
        const response = await fetch(this.BASE_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários');
        }
        return response.json();
    }

    static async getById(id: number): Promise<Usuario> {
        const response = await fetch(`${this.BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar usuário');
        }
        return response.json();
    }

    static async create(usuario: CreateUsuarioDTO): Promise<Usuario> {
        const response = await fetch(this.BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        if (!response.ok) {
            throw new Error('Erro ao criar usuário');
        }
        return response.json();
    }

    static async update(id: number, field: 'nome' | 'descricao' | 'imagem', value: string ): Promise<Usuario> {
        if (!['nome', 'descricao', 'imagem'].includes(field)) {
            throw new Error('Campo inválido para atualização');
        }
        const response = await fetch(`${this.BASE_URL}/${id}/${field}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ [field]: value })
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar usuário');
        }
        return response.json();
    }
}