import type { Jogo, CreateJogoDTO } from "../types/api";
import type { JogoDetails } from "../types/internal";
import { PlataformasService } from "./plataformas";
import { CategoriaService } from "./categoria";
import { JogoPlataformaService } from "./jogoPlataforma";
import { JogoCategoriaService } from "./jogoCategoria";
import type { Plataforma, Categoria } from "../types/api";

export class JogosService {
    private static readonly BASE_URL = 'http://localhost:3001/jogos';

    static async getAll(): Promise<Jogo[]> {
        const response = await fetch(this.BASE_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar jogos');
        }
        return response.json();
    }

    static async getById(id: number): Promise<Jogo> {
        const response = await fetch(`${this.BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar jogo');
        }
        return response.json();
    }

    static async getByIds(ids: number[]): Promise<Jogo[]> {
        const response = await fetch(`${this.BASE_URL}/batch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids })
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar jogos por IDs');
        }
        return response.json();
    }

    static async getByName(nome: string): Promise<Jogo[]> {
        const response = await fetch(`${this.BASE_URL}?nome=${encodeURIComponent(nome)}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar jogos por nome');
        }
        return response.json();
    }

    static async getAllWithDetails(): Promise<JogoDetails[]> {
        const allJogos = await this.getAll();
        const jogosWithDetails: JogoDetails[] = [];

        for (const jogo of allJogos) {
            try {
                // Get platform IDs for this game
                const plataformasIds = await JogoPlataformaService.getByJogoId(jogo.id);
                let plataformas: Plataforma[] = [];
                
                // Only fetch platforms if there are IDs
                if (plataformasIds && plataformasIds.length > 0) {
                    const plataformaIds = plataformasIds.map(p => p.fk_Plataforma_id);
                    plataformas = await PlataformasService.getByIds(plataformaIds);
                }

                // Get category IDs for this game
                const categoriasIds = await JogoCategoriaService.getByJogoId(jogo.id);
                let categorias: Categoria[] = [];
                
                // Only fetch categories if there are IDs
                if (categoriasIds && categoriasIds.length > 0) {
                    const categoriaIds = categoriasIds.map(c => c.fk_Categoria_id);
                    categorias = await CategoriaService.getByIds(categoriaIds);
                }

                jogosWithDetails.push({
                    ...jogo,
                    plataformas,
                    categorias
                } as JogoDetails);
            } catch (error) {
                console.error(`Error fetching details for game ${jogo.id}:`, error);
                // Add game without details if there's an error
                jogosWithDetails.push({
                    ...jogo,
                    plataformas: [],
                    categorias: []
                } as JogoDetails);
            }
        }

        return jogosWithDetails;
    }

    static async getByIdWithDetails(id: number): Promise<JogoDetails> {
        const jogo = await this.getById(id);

        const plataformasIds = await JogoPlataformaService.getByJogoId(jogo.id);
        const plataformas = await PlataformasService.getByIds(plataformasIds.map(p => p.fk_Plataforma_id));

        const categoriasIds = await JogoCategoriaService.getByJogoId(jogo.id);
        const categorias = await CategoriaService.getByIds(categoriasIds.map(c => c.fk_Categoria_id));

        return {
            ...jogo,
            plataformas,
            categorias
        } as JogoDetails;
    }


    static async create(jogo: CreateJogoDTO): Promise<Jogo> {
        const response = await fetch(this.BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jogo)
        });
        if (!response.ok) {
            throw new Error('Erro ao criar jogo');
        }
        return response.json();
    }

    static async update(id: number, jogo: CreateJogoDTO): Promise<Jogo> {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jogo)
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar jogo');
        }
        return response.json();
    }

    static async delete(id: number): Promise<boolean> {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar jogo');
        }

        return response.status === 204; // No Content
    }
}
