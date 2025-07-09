import { z } from 'zod';

export const CreateListaSchema = z.object({
    nome: z.string().min(1).max(100),
    ehPublico: z.boolean(),
    fk_Usuario_id: z.number().int(),
})
export type CreateListaDTO = z.infer<typeof CreateListaSchema>;
export type Lista = CreateListaDTO & { id: number };