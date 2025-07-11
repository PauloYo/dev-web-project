import { Request, Response } from 'express';
import { ComentarioService } from '../services/comentario.service';
import { CreateComentarioDTO } from '../models/comentario.model';

export class ComentarioController {
    static async create(req: Request, res: Response) {
        try {
            const data = res.locals.body as CreateComentarioDTO;
            
            if (!data.descricao || !data.fk_avaliacao_id) {
                return res.status(400).json({ error: 'Descrição e ID da avaliação são obrigatórios' });
            }
            
            const comentario = await ComentarioService.create(data);
            
            if (!comentario) {
                return res.status(400).json({ error: 'Erro ao criar comentário' });
            }

            res.status(201).json(comentario);
        } catch (error: any) {
            console.error('Erro ao criar comentário:', error);
            res.status(500).json({ error: error.message || 'Erro interno do servidor' });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const comentarios = await ComentarioService.getAll();
            res.json(comentarios);
        } catch (error: any) {
            console.error('Erro ao buscar comentários:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = Number(res.locals.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID inválido' });
            }
            
            const comentario = await ComentarioService.getById(id);

            if (!comentario) {
                return res.status(404).json({ error: 'Comentário não encontrado' });
            }
            
            res.json(comentario);
        } catch (error: any) {
            console.error('Erro ao buscar comentário:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    static async getByAvaliacaoId(req: Request, res: Response) {
        try {
            const avaliacaoId = Number(res.locals.params.id);
            
            if (isNaN(avaliacaoId)) {
                return res.status(400).json({ error: 'ID da avaliação inválido' });
            }
            
            const comentario = await ComentarioService.getByAvaliacaoId(avaliacaoId);

            if (!comentario) {
                return res.status(404).json({ error: 'Comentário não encontrado' });
            }

            res.json(comentario);
        } catch (error: any) {
            console.error('Erro ao buscar comentário por avaliação:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = Number(res.locals.params.id);
            const data = res.locals.body as CreateComentarioDTO;
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID inválido' });
            }
            
            const comentario = await ComentarioService.update(id, data);

            if (!comentario) {
                return res.status(404).json({ error: 'Comentário não encontrado' });
            }
            res.json(comentario);
        } catch (error: any) {
            console.error('Erro ao atualizar comentário:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    static async updateDescricao(req: Request, res: Response) {
        try {
            const id = Number(res.locals.params.id);
            const { descricao } = res.locals.body;
            
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID inválido' });
            }
            
            if (!descricao || typeof descricao !== 'string' || descricao.trim() === '') {
                return res.status(400).json({ error: 'Descrição é obrigatória' });
            }
            
            if (descricao.length > 500) {
                return res.status(400).json({ error: 'Descrição deve ter no máximo 500 caracteres' });
            }
            
            const comentario = await ComentarioService.updateDescricao(id, descricao.trim());

            if (!comentario) {
                return res.status(404).json({ error: 'Comentário não encontrado' });
            }
            
            res.json(comentario);
        } catch (error: any) {
            console.error('Erro ao atualizar descrição do comentário:', error);
            res.status(500).json({ error: error.message || 'Erro interno do servidor' });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = Number(res.locals.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID inválido' });
            }
            
            const deleted = await ComentarioService.delete(id);

            if (!deleted) {
                return res.status(404).json({ error: 'Comentário não encontrado' });
            }
            res.json({ message: 'Comentário deletado com sucesso' });
        } catch (error: any) {
            console.error('Erro ao deletar comentário:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}
