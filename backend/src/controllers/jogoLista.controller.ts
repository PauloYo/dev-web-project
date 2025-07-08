import { Request, Response } from 'express';
import { JogoListaService } from '../services/jogoLista.service';
import { CreateJogoListaDTO } from '../models/jogoLista.model';

export class JogoListaController {
    static async create(req: Request, res: Response) {
        const data = res.locals.body as CreateJogoListaDTO;
        const jogoLista = await JogoListaService.create(data);
        res.status(201).json(jogoLista);
    }

    static async getAll(req: Request, res: Response) {
        const { fk_Lista_id } = req.query;
        const jogosListas = await JogoListaService.getAll(fk_Lista_id as string);
        res.json(jogosListas);
    }

    static async delete(req: Request, res: Response) {
        const data = res.locals.body as CreateJogoListaDTO;
        const deleted = await JogoListaService.delete(data);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Relação não encontrada' });
        }
        
        res.json({ message: 'Jogo removido da lista' });
    }
}
