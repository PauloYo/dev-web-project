import { Router } from 'express';
import { asyncHandler } from '../../middleware/errorHandler';
import { validateRequest } from '../../middleware/validateRequest';
import { CreateJogoSchema } from '../../models/jogo.model';
import { GameNameSchema, IdParamSchema } from '../../models/validation.param.model';
import { JogoController } from '../../controllers/jogo.controller';

const router = Router();

router.post(
  '/',
  validateRequest({
    body: CreateJogoSchema
  }),
  asyncHandler(JogoController.create)
);

router.get(
  '/',
  asyncHandler(JogoController.getAll)
);

router.get(
  '/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(JogoController.getById)
);

router.get(
  '/:name',
  validateRequest({
    params: GameNameSchema
  }),
  asyncHandler(JogoController.getByName)
);

router.put(
  '/:id',
  validateRequest({
    params: IdParamSchema,
    body: CreateJogoSchema
  }),
  asyncHandler(JogoController.update)
);

router.delete(
  '/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(JogoController.delete)
);

router.post(
  '/batch',
  asyncHandler(JogoController.getByIds)
);

export default router;
