import { z } from 'zod';

/**
 * Avaliação
 */

export const NotaSchema = z.object({
    nota: z.number().min(0).max(10)
});

export const ImagemSchema = z.object({
  imagem: z.string()
});

// Schema para body da requisição de atualizar status
export const UpdateStatusSchema = z.object({
  ehPublico: z.boolean()
});

// Schema para body da requisição de atualizar nome
export const UpdateNomeSchema = z.object({
  nome: z.string().min(1)
});