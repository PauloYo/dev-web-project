import { Request, Response } from 'express';
import { AvaliacaoService } from '../services/avaliacao.service';
import { CreateAvaliacaoDTO } from '../models/avaliacao.model';

export class AvaliacaoController {
    static async create(req: Request, res: Response) {
        const result = res.locals.body as CreateAvaliacaoDTO;
        const avaliacao = await AvaliacaoService.create(result);
        
        if (!avaliacao) {
            return res.status(400).json({ error: 'Erro ao criar avaliação' });
        }

        res.status(201).json(avaliacao);
    }

    static async getAll(req: Request, res: Response) {
        const avaliacoes = await AvaliacaoService.getAll();
        res.json(avaliacoes);
    }

    static async getById(req: Request, res: Response) {
        const id = Number(res.locals.params.id); 
        const avaliacao = await AvaliacaoService.getById(id);

        if (!avaliacao) {
            return res.status(404).json({ error: 'Avaliação não encontrada' });
        }
        
        res.json(avaliacao);
    }

    static async update(req: Request, res: Response) {
        const id = Number(res.locals.params.id);
        const data = res.locals.body as CreateAvaliacaoDTO;
        const avaliacao = await AvaliacaoService.update(id, data);

        if (!avaliacao) {
            return res.status(404).json({ error: 'Avaliação não encontrada' });
        }
        res.json(avaliacao);
    }

    static async updateNota(req: Request, res: Response) {
        const id = Number(res.locals.params.id);
        const { nota }: { nota: number } = res.locals.body;
        const avaliacao = await AvaliacaoService.updateNota(id, nota);

        if (!avaliacao) {
            return res.status(404).json({ error: 'Avaliação não encontrada' });
        }
        res.json(avaliacao);
    }

    static async delete(req: Request, res: Response) {
        const id = Number(res.locals.params.id);
        const deleted = await AvaliacaoService.delete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Avaliação não encontrada' });
        }
        res.json({ message: 'Avaliação deletada com sucesso' });
    }

}