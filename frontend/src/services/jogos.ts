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

    static async getRatingById(id: number): Promise<number> {
        const response = await fetch(`${this.BASE_URL}/${id}/rating`);
        if (!response.ok) {
            throw new Error('Erro ao buscar rating do jogo');
        }
        const data = await response.json();
        return data.rating;
    }

    static async getTotalUserRatingsById(id: number): Promise<number> {
        const response = await fetch(`${this.BASE_URL}/${id}/total-user-ratings`);
        if (!response.ok) {
            throw new Error('Erro ao buscar total de avaliações do jogo');
        }
        const data = await response.json();
        return data.totalUserRatings;
    }    

    static async getAllWithDetails(): Promise<JogoDetails[]> {
        const allJogos = await this.getAll();
        const jogosWithDetails: JogoDetails[] = [];

        for (const jogo of allJogos) {
            try {
                const plataformasIds = await JogoPlataformaService.getByJogoId(jogo.id);
                console.log(`Raw plataformasIds for game ${jogo.id}:`, plataformasIds);
                let plataformas: Plataforma[] = [];

                if (plataformasIds && plataformasIds.length > 0) {
                    const plataformaIds = plataformasIds.map(p => p.fk_plataforma_id);
                    console.log(`Mapped plataformaIds for game ${jogo.id}:`, plataformaIds);
                    console.log(`Sample object structure:`, plataformasIds[0]);
                    plataformas = await PlataformasService.getByIds(plataformaIds);
                }

                const categoriasIds = await JogoCategoriaService.getByJogoId(jogo.id);
                let categorias: Categoria[] = [];
                
                if (categoriasIds && categoriasIds.length > 0) {
                    const categoriaIds = categoriasIds.map(c => c.fk_categoria_id);
                    categorias = await CategoriaService.getByIds(categoriaIds);
                }

                const rating = await this.getRatingById(jogo.id);
                const totalUserRatings = await this.getTotalUserRatingsById(jogo.id);

                jogosWithDetails.push({
                    ...jogo,
                    plataformas,
                    categorias,
                    rating,
                    totalUserRatings
                } as JogoDetails);
            } catch (error) {
                console.error(`Error fetching details for game ${jogo.id}:`, error);
                jogosWithDetails.push({
                    ...jogo,
                    plataformas: [],
                    categorias: [],
                    rating: 0,
                    totalUserRatings: 0
                } as JogoDetails);
            }
        }

        return jogosWithDetails;
    }

    static async getByIdWithDetails(id: number): Promise<JogoDetails> {
        try {
            const jogo = await this.getById(id);

            // Plataformas
            const plataformasIds = await JogoPlataformaService.getByJogoId(jogo.id);
            let plataformas: Plataforma[] = [];
            if (plataformasIds && plataformasIds.length > 0) {
                const plataformaIds = plataformasIds.map(p => p.fk_plataforma_id);
                plataformas = await PlataformasService.getByIds(plataformaIds);
            }

            // Categorias
            const categoriasIds = await JogoCategoriaService.getByJogoId(jogo.id);
            let categorias: Categoria[] = [];
            if (categoriasIds && categoriasIds.length > 0) {
                const categoriaIds = categoriasIds.map(c => c.fk_categoria_id);
                categorias = await CategoriaService.getByIds(categoriaIds);
            }

            // Ratings
            const rating = await this.getRatingById(jogo.id);
            const totalUserRatings = await this.getTotalUserRatingsById(jogo.id);

            return {
                ...jogo,
                plataformas,
                categorias,
                rating,
                totalUserRatings
            } as JogoDetails;
        } catch (error) {
            console.error(`Error fetching details for game ${id}:`, error);
            // Return a minimal JogoDetails object with empty arrays/defaults
            const jogo = await this.getById(id);
            return {
                ...jogo,
                plataformas: [],
                categorias: [],
                rating: 0,
                totalUserRatings: 0
            } as JogoDetails;
        }
    }

    static async getByIdsWithDetails(ids: number[]): Promise<JogoDetails[]> {
        // Busca todos os jogos básicos pelos IDs
        const jogos = await this.getByIds(ids);

        // Busca detalhes para cada jogo em paralelo
        return Promise.all(jogos.map(jogo => this.getByIdWithDetails(jogo.id)));
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

    static async sortByRating(jogos: JogoDetails[]): Promise<JogoDetails[]> {
        const ratings = await Promise.all(
            jogos.map(async jogo => {
                const r = jogo.rating ?? 0;
                const v = jogo.totalUserRatings ?? 0;
                return { 
                    jogo, 
                    r, 
                    v 
                };
            })
        );

        const allRatings = ratings.map(r => r.r);
        const allVotes = ratings.map(r => r.v);

        const c = allRatings.reduce((sum, val) => sum + val, 0) / (allRatings.length || 1);
        const m = allVotes.reduce((sum, val) => sum + val, 0) / (allVotes.length || 1);

        const jogosWithBayesian = await Promise.all(
            ratings.map(async ({ jogo, r, v }) => {
                const bayesian = await this.calculateBayesianRating(r, v, c, m);
                return { ...jogo, bayesianRating: bayesian };
            })
        );

        return jogosWithBayesian.sort((a, b) => (b.bayesianRating ?? 0) - (a.bayesianRating ?? 0));
    }

    private static async calculateBayesianRating(r: number, v: number, c: number, m: number): Promise<number> {
        return (v / (v + m)) * r + (m / (v + m)) * c; 
    }
}
