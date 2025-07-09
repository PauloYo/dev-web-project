import { z } from 'zod';

export const CreateCategoriaSchema = z.object({
    descricao: z.string().min(1).max(100),
})
export type CreateCategoriaDTO = z.infer<typeof CreateCategoriaSchema>;
export type Categoria = CreateCategoriaDTO & { id: number };
