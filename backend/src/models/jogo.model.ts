import { z } from 'zod';

export const CreateJogoSchema = z.object({
    nome: z.string().min(1).max(100),
    descricao: z.string().max(500).optional(),
    imagem: z.string().optional(),
    desenvolvedor: z.string().min(0).max(50).optional(),
})
export type CreateJogoDTO = z.infer<typeof CreateJogoSchema>;
export type Jogo = CreateJogoDTO & { id: number };