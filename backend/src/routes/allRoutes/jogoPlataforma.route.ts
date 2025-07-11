import { Router } from 'express';
import { asyncHandler } from '../../middleware/errorHandler';
import { validateRequest } from '../../middleware/validateRequest';
import { CreateJogoPlataformaSchema } from '../../models/jogoPlataforma.model';
import { JogoPlataformaController } from '../../controllers/jogoPlataforma.controller';
import { IdParamSchema } from '../../models/validation.param.model';

const router = Router();

router.post(
  '/',
  validateRequest({
    body: CreateJogoPlataformaSchema
  }),
  asyncHandler(JogoPlataformaController.create)
);

router.get(
  '/',
  asyncHandler(JogoPlataformaController.getAll)
);

router.get(
  '/jogo/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(JogoPlataformaController.getByJogoId)
);

router.delete(
  '/',
  validateRequest({
    body: CreateJogoPlataformaSchema
  }),
  asyncHandler(JogoPlataformaController.delete)
);

export default router;
