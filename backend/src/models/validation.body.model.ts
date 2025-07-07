import { z } from 'zod';

/**
 * Avaliação
 */

export const NotaSchema = z.number().min(0).max(10);