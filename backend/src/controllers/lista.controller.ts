import { Request, Response } from 'express';
import { ListaService } from '../services/lista.service';
import { CreateListaDTO } from '../models/lista.model';

export class ListaController {
    static async create(req: Request, res: Response) {
        const data = res.locals.body as CreateListaDTO;
        const lista = await ListaService.create(data);
        
        if (!lista) {
            return res.status(400).json({ error: 'Erro ao criar lista' });
        }

        res.status(201).json(lista);
    }

    static async getAll(req: Request, res: Response) {
    const { fk_Usuario_id, ehpublico } = req.query;

    const usuarioId = fk_Usuario_id ? Number(fk_Usuario_id) : undefined;
    const isPublic = ehpublico === 'true' ? true : ehpublico === 'false' ? false : undefined;

    const listas = await ListaService.getAll(usuarioId, isPublic);
    res.json(listas);
    }
    
    static async getById(req: Request, res: Response) {
        const id = Number(res.locals.params.id);
        const lista = await ListaService.getById(id);

        if (!lista) {
            return res.status(404).json({ error: 'Lista não encontrada' });
        }
        
        res.json(lista);
    }

    static async update(req: Request, res: Response) {
        const id = Number(res.locals.params.id);
        const data = res.locals.body as CreateListaDTO;
        const lista = await ListaService.update(id, data);

        if (!lista) {
            return res.status(404).json({ error: 'Lista não encontrada' });
        }
        res.json(lista);
    }

    static async updateNome(req: Request, res: Response) {
        const id = Number(res.locals.params.id);
        const { nome }: { nome: string } = res.locals.body;
        const lista = await ListaService.updateNome(id, nome);

        if (!lista) {
            return res.status(404).json({ error: 'Lista não encontrada' });
        }
        res.json(lista);
    }

    static async updateStatus(req: Request, res: Response) {
        const id = Number(res.locals.params.id);
        const { ehPublico }: { ehPublico: boolean } = res.locals.body;
        const lista = await ListaService.updateStatus(id, ehPublico);

        if (!lista) {
            return res.status(404).json({ error: 'Lista não encontrada' });
        }
        res.json(lista);
    }

    static async delete(req: Request, res: Response) {
        const id = Number(res.locals.params.id);
        const deleted = await ListaService.delete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Lista não encontrada' });
        }
        res.json({ message: 'Lista deletada com sucesso' });
    }
}
