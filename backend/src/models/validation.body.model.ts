import { z } from 'zod';

// Schema para body da requisição de atualizar nota
export const NotaSchema = z.object({
    nota: z.number().min(0).max(10)
});

// Schema para body da requisição de atualizar imagem
export const ImagemSchema = z.object({
  imagem: z.string()
});

// Schema para body da requisição de atualizar status
export const UpdateStatusSchema = z.object({
  ehPublico: z.boolean()
});

// Schema para body da requisição de atualizar nome
export const NomeSchema = z.object({
  nome: z.string().min(1, 'Nome não pode estar vazio'),
});

// Schema para body da requisição de atualizar descrição
export const DescricaoSchema = z.object({
  descricao: z.string().min(1, 'Descrição não pode estar vazia'),
});

export const IdsBodySchema = z.object({
  ids: z.array(z.number().int().positive())
}).refine(data => data.ids.length > 0, {
  message: 'A lista de IDs não pode estar vazia'
});

export const UpdateDesenvolvedorSchema = z.object({
  desenvolvedor: z.string().min(1, "O nome do desenvolvedor é obrigatório")
});
