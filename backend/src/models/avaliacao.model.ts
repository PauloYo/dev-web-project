import { z } from 'zod';

export const CreateAvaliacaoSchema = z.object({
    nota: z.number().int().min(0).max(5),
    fk_Jogo_id: z.number().int(),
    fk_Usuario_id: z.number().int(),
});

export type CreateAvaliacaoDTO = z.infer<typeof CreateAvaliacaoSchema>;
export type Avaliacao = CreateAvaliacaoDTO & { id: number };