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


// Schema para body da requisição de atualizar nome
export const NomeSchema = z.object({
  nome: z.string().min(1, 'Nome não pode estar vazio'),
});

// Schema para body da requisição de atualizar descrição
export const DescricaoSchema = z.object({
  descricao: z.string().min(1, 'Descrição não pode estar vazia'),
});