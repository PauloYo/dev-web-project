import { z } from 'zod';

export const CreateJogoPlataformaSchema = z.object({
    fk_plataforma_id: z.number().int(),
    fk_jogo_id: z.number().int(),
})
export type CreateJogoPlataformaDTO = z.infer<typeof CreateJogoPlataformaSchema>;
export type JogoPlataforma = CreateJogoPlataformaDTO;