import { z } from 'zod';

export const CreateUsuarioSchema = z.object({
    imagem: z.string().optional(),
    nome: z.string().min(1).max(100),
    senha: z.string().min(5).max(100),
    descricao: z.string().max(500).optional(),
    email: z.string().email(),
    ehAdmin: z.boolean().default(false),
})
export type CreateUsuarioDTO = z.infer<typeof CreateUsuarioSchema>;
export type Usuario = CreateUsuarioDTO & { id: number };