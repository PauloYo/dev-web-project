import { z } from 'zod';

export const CreateCategoriaJogoSchema = z.object({
    fk_Categoria_id: z.number().int(),
    fk_Jogo_id: z.number().int(),
})
export type CreateCategoriaJogoDTO = z.infer<typeof CreateCategoriaJogoSchema>;
export type CategoriaJogo = CreateCategoriaJogoDTO;