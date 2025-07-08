import { z } from 'zod';

export const CreateJogoListaSchema = z.object({
    fk_Jogo_id: z.number().int(),
    fk_Lista_id: z.number().int(),
})

export type CreateJogoListaDTO = z.infer<typeof CreateJogoListaSchema>;

export type JogoLista = CreateJogoListaDTO;