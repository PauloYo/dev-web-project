import { Request, Response } from 'express';
import { JogoPlataformaService } from '../services/jogoPlataforma.service';
import { CreateJogoPlataformaDTO } from '../models/jogoPlataforma.model';

export class JogoPlataformaController {
    static async create(req: Request, res: Response) {
        const data = res.locals.body as CreateJogoPlataformaDTO;
        const jogoPlataforma = await JogoPlataformaService.create(data);
        res.status(201).json(jogoPlataforma);
    }

    static async getAll(req: Request, res: Response) {
        const jogosPlataformas = await JogoPlataformaService.getAll();
        res.json(jogosPlataformas);
    }

    static async getByJogoId(req: Request, res: Response) {
        const fk_Jogo_id = Number(res.locals.id);
        const jogosPlataformas = await JogoPlataformaService.getByJogoId(fk_Jogo_id);
        
        if (jogosPlataformas.length === 0) {
            return res.status(404).json({ error: 'Nenhuma relação encontrada para o jogo' });
        }
        
        res.json(jogosPlataformas);
    }

    static async delete(req: Request, res: Response) {
        const data = res.locals.body as CreateJogoPlataformaDTO;
        const deleted = await JogoPlataformaService.delete(data);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Relação não encontrada' });
        }
        
        res.json({ message: 'Relação deletada' });
    }
}
