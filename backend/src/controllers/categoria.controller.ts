import { Request, Response } from 'express';
import { CategoriaService } from '../services/categoria.service';

export class CategoriaController {
    static async create(req: Request, res: Response) {
        const { descricao } = res.locals.body;
        const categoria = await CategoriaService.create(descricao);
        res.status(201).json(categoria);
    }

    static async getAll(req: Request, res: Response) {
        const categorias = await CategoriaService.getAll();
        res.json(categorias);
    }

    static async getById(req: Request, res: Response) {
        const { id } = res.locals.params;
        const categoria = await CategoriaService.getById(id);
        
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        
        res.json(categoria);
    }

    static async update(req: Request, res: Response) {
        const { id } = res.locals.params;
        const { descricao } = res.locals.body;
        const categoria = await CategoriaService.update(id, descricao);
        
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        
        res.json(categoria);
    }

    static async delete(req: Request, res: Response) {
        const { id } = res.locals.params;
        const deleted = await CategoriaService.delete(id);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        
        res.json({ message: 'Categoria deletada' });
    }
}
