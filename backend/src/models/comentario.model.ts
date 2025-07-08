import { z } from 'zod';

export const CreateComentarioSchema = z.object({
    descricao: z.string().min(1).max(500),
    fk_Avaliacao_id: z.number().int(),
})

export type CreateComentarioDTO = z.infer<typeof CreateComentarioSchema>;

export type Comentario = CreateComentarioDTO & { id: number };