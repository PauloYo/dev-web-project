import { Router } from 'express';
import { asyncHandler } from '../../middleware/errorHandler';
import { validateRequest } from '../../middleware/validateRequest';
import { CreatePlataformaSchema } from '../../models/plataforma.model';
import { IdParamSchema } from '../../models/validation.param.model';
import { PlataformaController } from '../../controllers/plataforma.controller';
import { IdsBodySchema } from '../../models/validation.body.model';

const router = Router();

router.post(
  '/',
  validateRequest({
    body: CreatePlataformaSchema
  }),
  asyncHandler(PlataformaController.create)
);


router.get(
  '/',
  asyncHandler(PlataformaController.getAll)
);

router.get(
  '/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(PlataformaController.getById)
);

router.get(
  '/batch',
  validateRequest({
    body: IdsBodySchema
  }),
  asyncHandler(PlataformaController.getByIds)
)

router.put(
  '/:id',
  validateRequest({
    params: IdParamSchema,
    body: CreatePlataformaSchema
  }),
  asyncHandler(PlataformaController.update)
);

router.delete(
  '/:id',
  validateRequest({
    params: IdParamSchema
  }),
  asyncHandler(PlataformaController.delete)
);

export default router;
