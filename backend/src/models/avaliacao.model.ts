import { z } from 'zod';

export const CreateAvaliacaoSchema = z.object({
    nota: z.number().int().min(0).max(5),
    fk_jogo_id: z.number().int(),
    fk_usuario_id: z.number().int(),
});

export type CreateAvaliacaoDTO = z.infer<typeof CreateAvaliacaoSchema>;
export type Avaliacao = CreateAvaliacaoDTO & { id: number };