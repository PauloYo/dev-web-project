import { Router } from 'express';
import { asyncHandler } from '../../middleware/errorHandler';
import { validateRequest } from '../../middleware/validateRequest';
import { CreateComentarioSchema } from '../../models/comentario.model';
import { IdParamSchema } from '../../models/validation.param.model';
import { ComentarioController } from '../../controllers/comentario.controller';
import { ComentarioDescricaoSchema } from '../../models/validation.body.model';

const router = Router();

router.post(
  '/',
  validateRequest({
    body: CreateComentarioSchema
  }),
  asyncHandler(ComentarioController.create)
);

router.get(
  '/',
  asyncHandler(ComentarioController.getAll)
);

router.get(
  '/avaliacao/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(ComentarioController.getByAvaliacaoId)
);

router.get(
  '/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(ComentarioController.getById)
);

router.put(
  '/:id',
  validateRequest({
    params: IdParamSchema,
    body: CreateComentarioSchema
  }),
  asyncHandler(ComentarioController.update)
);

router.patch(
  '/:id/descricao',
  validateRequest({
    params: IdParamSchema,
    body: ComentarioDescricaoSchema
  }),
  asyncHandler(ComentarioController.updateDescricao)
)

router.delete(
  '/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(ComentarioController.delete)
);

export default router;
