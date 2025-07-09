import { z } from 'zod';

export const IdParamSchema = z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a positive integer').transform(Number)
}).strict();

export type IdParamDTO = z.infer<typeof IdParamSchema>;

export const GameNameSchema = z.object({
    name: z.string().min(1, 'Name must not be empty').max(100, 'Name must not exceed 100 characters')
}).strict();

export type GameNameDTO = z.infer<typeof GameNameSchema>;