import { Request, Response } from 'express';
import { JogoService } from '../services/jogo.service';
import { CreateJogoDTO } from '../models/jogo.model';

export class JogoController {
    static async create(req: Request, res: Response) {
        const data = res.locals.body as CreateJogoDTO;
        const jogo = await JogoService.create(data);
        
        if (!jogo) {
            return res.status(400).json({ error: 'Erro ao criar jogo' });
        }

        res.status(201).json(jogo);
    }

    static async getAll(req: Request, res: Response) {
        const jogos = await JogoService.getAll();
        res.json(jogos);
    }

    static async getById(req: Request, res: Response) {
        const id = Number(res.locals.id);
        const jogo = await JogoService.getById(id);

        if (!jogo) {
            return res.status(404).json({ error: 'Jogo não encontrado' });
        }
        
        res.json(jogo);
    }

    static async getByName(req: Request, res: Response) {
        const nome = res.locals.query.nome as string;
        if (!nome) {
            return res.status(400).json({ error: 'Nome do jogo é obrigatório' });
        }
        const jogos = await JogoService.getByName(nome);
        if (jogos.length === 0) {
            return res.status(404).json({ error: 'Nenhum jogo encontrado com esse nome' });
        }
        res.json(jogos);
    }

    static async update(req: Request, res: Response) {
        const id = Number(res.locals.id);
        const data = res.locals.body as CreateJogoDTO;
        const jogo = await JogoService.update(id, data);

        if (!jogo) {
            return res.status(404).json({ error: 'Jogo não encontrado' });
        }
        res.json(jogo);
    }

    static async delete(req: Request, res: Response) {
        const id = Number(res.locals.id);
        const deleted = await JogoService.delete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Jogo não encontrado' });
        }
        res.json({ message: 'Jogo deletado com sucesso' });
    }

    static async getByIds(req: Request, res: Response) {
        const { ids }: { ids: number[] } = req.body;
        const jogos = await JogoService.getByIds(ids);
        res.json(jogos);
    }
}
