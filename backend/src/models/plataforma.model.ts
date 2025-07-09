import { z } from 'zod';

export const CreatePlataformaSchema = z.object({
    descricao: z.string().min(1).max(100),
})
export type CreatePlataformaDTO = z.infer<typeof CreatePlataformaSchema>;
export type Plataforma = CreatePlataformaDTO & { id: number };