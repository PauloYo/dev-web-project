import { Request, Response } from 'express';
import { ComentarioService } from '../services/comentario.service';
import { CreateComentarioDTO } from '../models/comentario.model';

export class ComentarioController {
    static async create(req: Request, res: Response) {
        const data = res.locals.body as CreateComentarioDTO;
        const comentario = await ComentarioService.create(data);
        
        if (!comentario) {
            return res.status(400).json({ error: 'Erro ao criar comentário' });
        }

        res.status(201).json(comentario);
    }

    static async getAll(req: Request, res: Response) {
        const comentarios = await ComentarioService.getAll();
        res.json(comentarios);
    }

    static async getById(req: Request, res: Response) {
        const id = Number(res.locals.id);
        const comentario = await ComentarioService.getById(id);

        if (!comentario) {
            return res.status(404).json({ error: 'Comentário não encontrado' });
        }
        
        res.json(comentario);
    }

    static async update(req: Request, res: Response) {
        const id = Number(res.locals.id);
        const data = res.locals.body as CreateComentarioDTO;
        const comentario = await ComentarioService.update(id, data);

        if (!comentario) {
            return res.status(404).json({ error: 'Comentário não encontrado' });
        }
        res.json(comentario);
    }

    static async delete(req: Request, res: Response) {
        const id = Number(res.locals.id);
        const deleted = await ComentarioService.delete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Comentário não encontrado' });
        }
        res.json({ message: 'Comentário deletado com sucesso' });
    }
}
