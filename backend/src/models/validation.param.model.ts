import { z } from 'zod';

export const IdParamSchema = z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a positive integer').transform(Number)
}).strict();

export type IdParamDTO = z.infer<typeof IdParamSchema>;