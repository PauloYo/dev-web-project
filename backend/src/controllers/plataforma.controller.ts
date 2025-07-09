import { Request, Response } from 'express';
import { PlataformaService } from '../services/plataforma.service';

export class PlataformaController {
    static async create(req: Request, res: Response) {
        const { descricao } = res.locals.body;
        const plataforma = await PlataformaService.create(descricao);
        res.status(201).json(plataforma);
    }

    static async getAll(req: Request, res: Response) {
        const plataformas = await PlataformaService.getAll();
        res.json(plataformas);
    }

    static async getById(req: Request, res: Response) {
        const { id } = res.locals.params;
        const plataforma = await PlataformaService.getById(id);
        
        if (!plataforma) {
            return res.status(404).json({ error: 'Plataforma não encontrada' });
        }
        
        res.json(plataforma);
    }

    static async getByIds(req: Request, res: Response) {
        const { ids } = res.locals.body;
        const plataformas = await PlataformaService.getByIds(ids);

        if (plataformas.length === 0) {
            return res.status(404).json({ error: 'Nenhuma plataforma encontrada para os IDs fornecidos' });
        }

        res.json(plataformas);
    }

    static async update(req: Request, res: Response) {
        const { id } = res.locals.params;
        const { descricao } = res.locals.body;
        const plataforma = await PlataformaService.update(id, descricao);
        
        if (!plataforma) {
            return res.status(404).json({ error: 'Plataforma não encontrada' });
        }
        
        res.json(plataforma);
    }

    static async delete(req: Request, res: Response) {
        const { id } = res.locals.params;
        const deleted = await PlataformaService.delete(id);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Plataforma não encontrada' });
        }
        
        res.json({ message: 'Plataforma deletada' });
    }
}
