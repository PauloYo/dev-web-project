import { Router } from 'express';
import { asyncHandler } from '../../middleware/errorHandler';
import { validateRequest } from '../../middleware/validateRequest';
import { CreateAvaliacaoSchema } from '../../models/avaliacao.model';
import { IdParamSchema } from '../../models/validation.param.model';
import { NotaSchema } from '../../models/validation.body.model';
import { AvaliacaoController } from '../../controllers/avaliacao.controller';
import { z } from 'zod';


const router = Router();

router.post(
  '/',
  validateRequest({
    body: CreateAvaliacaoSchema
  }), 
  asyncHandler(AvaliacaoController.create)
);

router.get(
  '/usuario/:userId/jogo/:jogoId',
  validateRequest({
    params: z.object({
      userId: z.string().transform(Number),
      jogoId: z.string().transform(Number)
    })
  }),
  asyncHandler(AvaliacaoController.getByUsuarioJogoId)
)

router.get(
  '/', 
  asyncHandler(AvaliacaoController.getAll)
);

router.get(
  '/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(AvaliacaoController.getById)
);

router.put(
  '/:id', 
  validateRequest({
    params: IdParamSchema,
    body: CreateAvaliacaoSchema
  }),
  asyncHandler(AvaliacaoController.update)
);

router.patch(
  '/:id/nota', 
  validateRequest({
    params: IdParamSchema,
    body: NotaSchema
  }),
  asyncHandler(AvaliacaoController.updateNota)
);

router.delete(
  '/:id', 
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(AvaliacaoController.delete)  
);

export default router;
