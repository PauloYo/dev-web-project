import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDTO } from '../models/usuario.model';

export class UsuarioController {
    static async create(req: Request, res: Response) {
        const data = res.locals.body as CreateUsuarioDTO;
        const usuario = await UsuarioService.create(data);
        
        if (!usuario) {
            return res.status(400).json({ error: 'Erro ao criar usuário' });
        }

        res.status(201).json(usuario);
    }

    static async getAll(req: Request, res: Response) {
        const usuarios = await UsuarioService.getAll();
        res.json(usuarios);
    }

    static async getById(req: Request, res: Response) {
        const id = Number(res.locals.id);
        const usuario = await UsuarioService.getById(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        
        res.json(usuario);
    }

    static async update(req: Request, res: Response) {
        const id = Number(res.locals.id);
        const data = res.locals.body as CreateUsuarioDTO;
        const usuario = await UsuarioService.update(id, data);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(usuario);
    }

    static async updateImagem(req: Request, res: Response) {
        const id = Number(res.locals.id);
        const { imagem }: { imagem: string } = res.locals.body;
        const usuario = await UsuarioService.updateImagem(id, imagem);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(usuario);
    }

    static async updateDescricao(req: Request, res: Response) {
        const id = Number(res.locals.id);
        const { descricao }: { descricao: string } = res.locals.body;
        const usuario = await UsuarioService.updateDescricao(id, descricao);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(usuario);
    }

    static async updateNome(req: Request, res: Response) {
        const id = Number(res.locals.id);
        const { nome }: { nome: string } = res.locals.body;
        const usuario = await UsuarioService.updateNome(id, nome);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(usuario);
    }

    static async delete(req: Request, res: Response) {
        const id = Number(res.locals.id);
        const deleted = await UsuarioService.delete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json({ message: 'Usuário deletado com sucesso' });
    }
}
