import { Router } from 'express';
import { asyncHandler } from '../../middleware/errorHandler';
import { validateRequest } from '../../middleware/validateRequest';
import { CreateJogoSchema } from '../../models/jogo.model';
import { GameNameSchema, IdParamSchema } from '../../models/validation.param.model';
import { JogoController } from '../../controllers/jogo.controller';
import { UpdateDesenvolvedorSchema } from '../../models/validation.body.model'; // certifique-se do caminho correto

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

router.get(
  '/:id/rating',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(JogoController.getRatingById)
);

router.get(
  '/:id/total-user-ratings',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(JogoController.getTotalUserRatingsById)
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

router.patch(
  '/:id/desenvolvedor',
  validateRequest({
    params: IdParamSchema,
    body: UpdateDesenvolvedorSchema
  }),
  asyncHandler(JogoController.updateDesenvolvedor)
);

export default router;
