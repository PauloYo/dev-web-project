import { Request, Response } from 'express';
import { JogoCategoriaService } from '../services/jogoCategoria.service';
import { CreateCategoriaJogoDTO } from '../models/categoriaJogo.model';

export class JogoCategoriaController {
    static async create(req: Request, res: Response) {
        const data = res.locals.body as CreateCategoriaJogoDTO;
        const categoriaJogo = await JogoCategoriaService.create(data);
        res.status(201).json(categoriaJogo);
    }

    static async getAll(req: Request, res: Response) {
        const categoriasJogos = await JogoCategoriaService.getAll();
        res.json(categoriasJogos);
    }

    static async getByJogoId(req: Request, res: Response) {
        const fk_Jogo_id = Number(res.locals.params.id);
        const categoriasJogos = await JogoCategoriaService.getByJogoId(fk_Jogo_id);

        res.json(categoriasJogos);
    }

    static async delete(req: Request, res: Response) {
        const data = res.locals.body as CreateCategoriaJogoDTO;
        const deleted = await JogoCategoriaService.delete(data);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Relação não encontrada' });
        }
        
        res.json({ message: 'Relação deletada' });
    }
}
