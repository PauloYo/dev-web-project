import { Router } from 'express';
import { asyncHandler } from '../../middleware/errorHandler';
import { validateRequest } from '../../middleware/validateRequest';
import { CreateListaSchema } from '../../models/lista.model';
import { IdParamSchema } from '../../models/validation.param.model';
import { ListaController } from '../../controllers/lista.controller';

const router = Router();

router.post(
  '/',
  validateRequest({
    body: CreateListaSchema
  }),
  asyncHandler(ListaController.create)
);

router.get(
  '/',
  asyncHandler(ListaController.getAll)
);

router.get(
  '/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(ListaController.getById)
);

router.put(
  '/:id',
  validateRequest({
    params: IdParamSchema,
    body: CreateListaSchema
  }),
  asyncHandler(ListaController.update)
);

router.patch(
  '/:id/nome',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(ListaController.updateNome)
);

router.patch(
  '/:id/status',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(ListaController.updateStatus)
);

router.delete(
  '/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(ListaController.delete)
);

export default router;
