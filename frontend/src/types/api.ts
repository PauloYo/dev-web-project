import { z } from 'zod';

export const CreateAvaliacaoSchema = z.object({
    nota: z.number().int().min(0).max(5),
    fk_Jogo_id: z.number().int(),
    fk_Usuario_id: z.number().int(),
});
export type CreateAvaliacaoDTO = z.infer<typeof CreateAvaliacaoSchema>;
export type Avaliacao = CreateAvaliacaoDTO & { id: number };


export const CreateCategoriaSchema = z.object({
    descricao: z.string().min(1).max(100),
})
export type CreateCategoriaDTO = z.infer<typeof CreateCategoriaSchema>;
export type Categoria = CreateCategoriaDTO & { id: number };


export const CreateCategoriaJogoSchema = z.object({
    fk_Categoria_id: z.number().int(),
    fk_Jogo_id: z.number().int(),
})
export type CreateCategoriaJogoDTO = z.infer<typeof CreateCategoriaJogoSchema>;
export type CategoriaJogo = CreateCategoriaJogoDTO;


export const CreateComentarioSchema = z.object({
    descricao: z.string().min(1).max(500),
    fk_Avaliacao_id: z.number().int(),
})
export type CreateComentarioDTO = z.infer<typeof CreateComentarioSchema>;
export type Comentario = CreateComentarioDTO & { id: number };


export const CreateJogoSchema = z.object({
    nome: z.string().min(1).max(100),
    descricao: z.string().max(500).optional(),
    imagem: z.string().optional(),
    desenvolvedor: z.string().min(0).max(50).optional(),
})
export type CreateJogoDTO = z.infer<typeof CreateJogoSchema>;
export type Jogo = CreateJogoDTO & { id: number };


export const CreateJogoListaSchema = z.object({
    fk_Jogo_id: z.number().int(),
    fk_Lista_id: z.number().int(),
})
export type CreateJogoListaDTO = z.infer<typeof CreateJogoListaSchema>;
export type JogoLista = CreateJogoListaDTO;


export const CreateJogoPlataformaSchema = z.object({
    fk_Plataforma_id: z.number().int(),
    fk_Jogo_id: z.number().int(),
})
export type CreateJogoPlataformaDTO = z.infer<typeof CreateJogoPlataformaSchema>;
export type JogoPlataforma = CreateJogoPlataformaDTO;


export const CreateListaSchema = z.object({
    nome: z.string().min(1).max(100),
    ehPublico: z.boolean(),
    fk_Usuario_id: z.number().int(),
})
export type CreateListaDTO = z.infer<typeof CreateListaSchema>;
export type Lista = CreateListaDTO & { id: number };


export const CreatePlataformaSchema = z.object({
    descricao: z.string().min(1).max(100),
})
export type CreatePlataformaDTO = z.infer<typeof CreatePlataformaSchema>;
export type Plataforma = CreatePlataformaDTO & { id: number };


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