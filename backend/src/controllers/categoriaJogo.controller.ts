import { Request, Response } from 'express';
import { CategoriaJogoService } from '../services/categoriaJogo.service';
import { CreateCategoriaJogoDTO } from '../models/categoriaJogo.model';

export class CategoriaJogoController {
    static async create(req: Request, res: Response) {
        const data = res.locals.body as CreateCategoriaJogoDTO;
        const categoriaJogo = await CategoriaJogoService.create(data);
        res.status(201).json(categoriaJogo);
    }

    static async getAll(req: Request, res: Response) {
        const categoriasJogos = await CategoriaJogoService.getAll();
        res.json(categoriasJogos);
    }

    static async delete(req: Request, res: Response) {
        const data = res.locals.body as CreateCategoriaJogoDTO;
        const deleted = await CategoriaJogoService.delete(data);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Relação não encontrada' });
        }
        
        res.json({ message: 'Relação deletada' });
    }
}
