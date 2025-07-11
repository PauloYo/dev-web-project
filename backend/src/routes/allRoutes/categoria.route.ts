import { Router } from 'express';
import { asyncHandler } from '../../middleware/errorHandler';
import { validateRequest } from '../../middleware/validateRequest';
import { CreateCategoriaSchema } from '../../models/categoria.model';
import { IdParamSchema } from '../../models/validation.param.model';
import { IdsBodySchema } from '../../models/validation.body.model';
import { CategoriaController } from '../../controllers/categoria.controller';

const router = Router();

router.post(
  '/',
  validateRequest({
    body: CreateCategoriaSchema
  }),
  asyncHandler(CategoriaController.create)
);

router.get(
  '/',
  asyncHandler(CategoriaController.getAll)
);

router.get(
  '/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(CategoriaController.getById)
);

router.post(
  '/batch',
  validateRequest({
    body: IdsBodySchema
  }),
  asyncHandler(CategoriaController.getByIds)
)

router.put(
  '/:id',
  validateRequest({
    params: IdParamSchema,
    body: CreateCategoriaSchema
  }),
  asyncHandler(CategoriaController.update)
);

router.delete(
  '/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(CategoriaController.delete)
);

export default router;
