import { Router } from 'express';
import { asyncHandler } from '../../middleware/errorHandler';
import { validateRequest } from '../../middleware/validateRequest';
import { CreateComentarioSchema } from '../../models/comentario.model';
import { ComentarioIdParamSchema, IdParamSchema } from '../../models/validation.param.model';
import { ComentarioController } from '../../controllers/comentario.controller';

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
  '/usuario/:userId/:gameId',
  validateRequest({
    params: ComentarioIdParamSchema
  }),
  asyncHandler(ComentarioController.getByUserId)
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

router.delete(
  '/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(ComentarioController.delete)
);

export default router;
